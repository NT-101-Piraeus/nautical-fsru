import requests
import time

# Ρυθμίσεις API (MarineTraffic)
API_KEY = "YOUR_MARINETRAFFIC_API_KEY"
VESSEL_IMO = "9123456"  # Παράδειγμα IMO

def check_vessel_location():
    url = f"https://services.marinetraffic.com/api/exportvessel/v:5/{API_KEY}/imo:{VESSEL_IMO}/protocol:json"
    response = requests.get(url)
    data = response.json()
    
    if data:
        status = data[0]['STATUS']
        port = data[0]['PORT_NAME']
        print(f"STATUS REPORT: Vessel {VESSEL_IMO} is currently {status} at {port}")
        
        # Αν το πλοίο δέσει, στείλε ειδοποίηση στο App
        if status == "moored" or "anchored":
            send_to_ntg_command(f"Vessel {VESSEL_IMO} reached {port}. Ready for inspection?")

def send_to_ntg_command(msg):
    # Εδώ συνδέεται με το Supabase/Database σου
    print(f"ALERT SENT TO HUB: {msg}")

# Έλεγχος κάθε 1 ώρα
while True:
    check_vessel_location()
    time.sleep(3600)