import os
import feedparser
import requests
from supabase import create_client

# Σύνδεση με Supabase
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

# Λίστα Στόχων
KEYWORDS = ["Zorlu", "Emir Öztürk", "Naftotrade", "Terme Tersanesi"]

# Πηγές Ειδήσεων
FEEDS = ["https://www.maritime-executive.com/rss", "https://safety4sea.com/feed/"]

def scan():
    print("🛰️ Scanning maritime feeds...")
    for url in FEEDS:
        feed = feedparser.parse(url)
        for entry in feed.entries:
            if any(k.lower() in entry.title.lower() for k in KEYWORDS):
                print(f"🚩 Match: {entry.title}")
                data = {"title": entry.title, "link": entry.link, "source": "RSS", "status": "NEW"}
                supabase.table("intel_logs").insert(data).execute()

if __name__ == "__main__":
    scan()
