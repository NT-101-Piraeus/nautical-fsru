import os
import feedparser
import requests
from supabase import create_client

# --- CONFIGURATION (Ανάγνωση από GitHub Secrets) ---
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")

# Keywords για αναζήτηση
KEYWORDS = ["REPAIR", "DOCKING", "SYROS", "PERAMA", "PIRAEUS", "ΕΠΙΣΚΕΥΗ", "ΔΕΞΑΜΕΝΙΣΜΟΣ", "HAI PHONG"]
TARGET_IMO = "7355349" 

# Σύνδεση με Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def send_alert(msg):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    try:
        requests.post(url, data={"chat_id": TELEGRAM_CHAT_ID, "text": f"🛰️ NTG INTEL: {msg}"})
    except Exception as e:
        print(f"Telegram Error: {e}")

def scan_news():
    print("🔍 Scanning shipping news feeds...")
    feeds = [
        "https://www.hellenicshippingnews.com/category/shipping-news/feed/",
        "https://www.naftikachronika.gr/feed/",
        "https://shippingherald.com/feed/"
    ]
    
    for url in feeds:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                if any(key.upper() in entry.title.upper() for key in KEYWORDS):
                    # Έλεγχος αν υπάρχει ήδη στη βάση ntg_intel_leads
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
                        send_alert(f"ΝΕΑ ΕΥΚΑΙΡΙΑ ΕΠΙΣΚΕΥΗΣ:\n{entry.title}\n{entry.link}")
        except Exception as e:
            print(f"Error scanning feed {url}: {e}")

def track_vessel():
    print(f"📡 AIS Monitoring Active for IMO {TARGET_IMO}")
    # Εδώ θα προστεθεί το logic για το MarineTraffic API στο μέλλον
    pass

if __name__ == "__main__":
    print("🚀 Intel Agent Task Started.")
    scan_news()
    track_vessel()
    print("🏁 Task Completed. Script exiting.")
