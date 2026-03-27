import os
import feedparser
import requests
from supabase import create_client

# Σύνδεση με Supabase (Τα κλειδιά τραβιούνται από τα GitHub Secrets)
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

# Λίστα Στόχων & Λέξεων Κλειδιών
KEYWORDS = ["Zorlu", "Emir Öztürk", "Naftotrade", "Terme Tersanesi", "Samsun Shipyard"]

# Πηγές Ειδήσεων (RSS Feeds)
FEEDS = [
    "https://www.maritime-executive.com/rss",
    "https://safety4sea.com/feed/",
    "https://www.shippingtelegraph.com/feed/"
]

def scan_news():
    print("🛰️ Starting Intelligence Scan...")
    found_items = []
    
    for feed_url in FEEDS:
        feed = feedparser.parse(feed_url)
        for entry in feed.entries:
            # Έλεγχος αν κάποια λέξη-κλειδί υπάρχει στον τίτλο
            if any(key.lower() in entry.title.lower() for key in KEYWORDS):
                print(f"🚩 Match Found: {entry.title}")
                
                # Δεδομένα για τη βάση
                data = {
                    "title": entry.title,
                    "link": entry.link,
                    "source": "RSS_FEED",
                    "status": "NEW"
                }
                
                # Αποθήκευση στη Supabase (Πίνακας: intel_logs)
                try:
                    supabase.table("intel_logs").insert(data).execute()
                    found_items.append(entry.title)
                except Exception as e:
                    print(f"❌ DB Error: {e}")

    if not found_items:
        print("✅ Scan complete. No new matches for targets.")
    else:
        print(f"🔥 Found {len(found_items)} new leads!")

if __name__ == "__main__":
    scan_news()
