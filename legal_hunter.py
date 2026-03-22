import requests
import time
from supabase import create_client

# CONFIG
TARGET_VESSELS = {
    "7355349": {"name": "NAFTOCEMENT IV", "priority": "HIGH", "area": "Vietnam"},
    "NB05": {"name": "Katiusha", "priority": "MED", "area": "Yalova"},
    "Terme1": {"name": "Terme 1", "priority": "MED", "area": "Samsun"}
}
TARGET_NAMES = ["Erkan Zorlu", "Sevim Zorlu", "Tuğrul Karaca", "Hasan Öztürk", "Yıldırım Bozkurt"]

# SUPABASE & TELEGRAM
supabase = create_client("URL", "KEY")

def check_vessels():
    for imo, data in TARGET_VESSELS.items():
        # AIS API CALL (Υποθετικό)
        # response = requests.get(f"AIS_API_URL/{imo}")
        print(f"📡 Scanning Asset: {data['name']} (IMO: {imo})")
        
        # Logic for AIS DARK (>6h)
        # Logic for Name/Flag Change
        # Logic for Area Exit (Geofence)

def scan_registries():
    for name in TARGET_NAMES:
        print(f"🔍 Scraping Registry for: {name}")
        # Logic for Ticaret Sicil Gazetesi (TR)
        # Logic for KVK (NL)
        # If found -> send_telegram_alert() & log_to_supabase()

def main_loop():
    while True:
        check_vessels()
        scan_registries()
        time.sleep(3600) # Scan every hour

if __name__ == "__main__":
    main_loop()
