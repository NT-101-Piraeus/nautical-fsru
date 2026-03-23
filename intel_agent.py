import feedparser
import requests
import time
from supabase import create_client

# --- CONFIGURATION ---
SUPABASE_URL = "https://omdarjncczohpffunfy.supabase.co"
SUPABASE_KEY = "YOUR_SERVICE_ROLE_KEY"
TELEGRAM_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"
# Keywords για αναζήτηση επισκευών
KEYWORDS = ["REPAIR", "DOCKING", "SYROS", "PERAMA", "PIRAEUS", "ΕΠΙΣΚΕΥΗ", "ΔΕΞΑΜΕΝΙΣΜΟΣ"]
# Target Vessel
TARGET_IMO = "7355349" 

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def send_alert(msg):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": f"🛰️ INTEL ALERT: {msg}"})

def scan_news():
    # Πηγές ειδήσεων (RSS Feeds)
    feeds = [
        "https://www.hellenicshippingnews.com/category/shipping-news/feed/",
        "https://www.naftikachronika.gr/feed/"
    ]
    
    for url in feeds:
        feed = feedparser.parse(url)
        for entry in feed.entries:
            # Έλεγχος αν ο τίτλος περιέχει keywords
            if any(key.upper() in entry.title.upper() for key in KEYWORDS):
                # Έλεγχος αν υπάρχει ήδη στη βάση
                exists = supabase.table("ntg_intel_leads").select("*").eq("link", entry.link).execute()
                if not exists.data:
                    data = {
                        "source": "Shipping News",
                        "title": entry.title,
                        "link": entry.link,
                        "intel_type": "REPAIR",
                        "priority": "HIGH"
                    }
                    supabase.table("ntg_intel_leads").insert(data).execute()
                    send_alert(f"Νέα ευκαιρία επισκευής: {entry.title}\n{entry.link}")

def track_ais():
    # Εδώ θα έμπαινε το API call στο MarineTraffic ή στο Spire
    # Για τη δοκιμή, ας υποθέσουμε ότι ελέγχουμε το στίγμα του Naftocement
    print(f"📡 Tracking AIS for IMO {TARGET_IMO}...")
    # response = requests.get(f"MARINETRAFFIC_API_URL").json()
    # Logic: If position changed or speed > 1kn -> Alert

def main():
    print("🚀 Intelligence Agent Started...")
    while True:
        try:
            scan_news()
            track_ais()
        except Exception as e:
            print(f"Error: {e}")
        
        # Περιμένουμε 30 λεπτά πριν το επόμενο σκανάρισμα
        time.sleep(1800)

if __name__ == "__main__":
    main()
