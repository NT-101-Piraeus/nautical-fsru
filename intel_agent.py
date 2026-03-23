import os, requests, feedparser
from supabase import create_client

# CONFIG
TARGET_IMO = "7355349"
VESSEL_NAME = "NAFTOCEMENT IV"
# Πηγές για Global & Vietnam Intel
FEEDS = [
    "https://safety4sea.com/feed/",
    "https://vpa.org.vn/feed/", # Vietnam Ports Association
    "https://www.lloydslist.com/rss"
]

def scan_global_intel():
    print(f"📡 Scanning Global Databases for IMO {TARGET_IMO}...")
    for url in FEEDS:
        feed = feedparser.parse(url)
        for entry in feed.entries:
            # Αναζήτηση για το IMO ή το όνομα
            if TARGET_IMO in entry.summary or VESSEL_NAME.upper() in entry.title.upper():
                # Trigger Critical Alert
                send_telegram_alert(f"CRITICAL INTEL FOUND:\n{entry.title}\n{entry.link}")

def track_movement():
    # Εδώ θα χτυπάμε το AIS API για αλλαγή στίγματος στο Hai Phong
    pass

if __name__ == "__main__":
    scan_global_intel()
