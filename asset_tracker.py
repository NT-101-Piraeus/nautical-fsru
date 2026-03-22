import requests
import time
from datetime import datetime, timedelta
from supabase import create_client

# CONFIGURATION
SUPABASE_URL = "https://omdarjncczohpffunfy.supabase.co"
SUPABASE_KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY"
TELEGRAM_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"
AIS_API_KEY = "YOUR_AIS_DATA_PROVIDER_KEY"

# TARGET INFO
TARGET_IMO = "7355349"
TARGET_NAME = "NAFTOCEMENT IV"
GEOFENCE = {"lat_min": 8.0, "lat_max": 23.0, "lon_min": 102.0, "lon_max": 110.0} # Vietnam/SE Asia

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def send_telegram_alert(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": f"🚨 ALERT: {message}"})

def log_event(event_type, description, details):
    data = {
        "imo": TARGET_IMO,
        "vessel_name": TARGET_NAME,
        "event_type": event_type,
        "description": description,
        "details": details
    }
    supabase.table("ntg_legal_logs").insert(data).execute()

def track_vessel():
    last_signal_time = datetime.now()
    
    while True:
        try:
            # 1. Fetch AIS Data
            # Υποθετικό API Call - Προσαρμόζεται ανάλογα με τον πάροχο (Spire, VesselFinder, κλπ)
            response = requests.get(f"https://api.vessel-data.com/v1/imo/{TARGET_IMO}?key={AIS_API_KEY}").json()
            
            curr_lat = response['lat']
            curr_lon = response['lon']
            curr_flag = response['flag']
            curr_name = response['name']
            curr_owner = response['owner']
            timestamp = datetime.fromtimestamp(response['timestamp'])

            # 2. Check AIS Signal Loss (6-hour threshold)
            time_diff = datetime.now() - timestamp
            if time_diff > timedelta(hours=6):
                msg = f"AIS DARK for {TARGET_NAME} (IMO: {TARGET_IMO}). Last seen: {timestamp}"
                send_telegram_alert(msg)
                log_event("AIS_DARK", msg, response)

            # 3. Geofencing Logic (Vietnam/SE Asia)
            if not (GEOFENCE["lat_min"] <= curr_lat <= GEOFENCE["lat_max"] and 
                    GEOFENCE["lon_min"] <= curr_lon <= GEOFENCE["lon_max"]):
                msg = f"{TARGET_NAME} has EXITED the SE Asia Geofence! Current Pos: {curr_lat}, {curr_lon}"
                send_telegram_alert(msg)
                log_event("MOVEMENT", msg, {"pos": [curr_lat, curr_lon]})

            # 4. Entity Monitoring (Flag, Name, Owner)
            # Έλεγχος αν οι τιμές διαφέρουν από την τελευταία εγγραφή στη βάση
            last_log = supabase.table("ntg_legal_logs").select("*").eq("imo", TARGET_IMO).order("created_at", desc=True).limit(1).execute()
            
            if last_log.data:
                prev_details = last_log.data[0]['details']
                if curr_flag != prev_details.get('flag') or curr_name != prev_details.get('name'):
                    msg = f"ENTITY CHANGE detected for {TARGET_IMO}. New Flag: {curr_flag}, New Name: {curr_name}"
                    send_telegram_alert(msg)
                    log_event("ENTITY_CHANGE", msg, response)

        except Exception as e:
            print(f"Error in tracking loop: {e}")
        
        # Check every 30 minutes to stay within API limits
        time.sleep(1800)

if __name__ == "__main__":
    track_vessel()
