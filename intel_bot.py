import requests
import os

# Ρυθμίσεις (Βάλτε τα δικά σας στοιχεία εδώ)
TELEGRAM_TOKEN = "8278288402:AAEXmSDWML5r8cNDRF_d1Zk-Phvwwdf-dYI"
CHAT_ID = "7621129659"
NEWS_API_KEY = "63d7671764c643909772c3d5e2978051" # Παράδειγμα Key αν έχετε
MONITORED_NAMES = ["Tugrul Karaca", "Emir Ozturk", "Erkan Zorlu"]

def send_telegram(msg):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    try:
        requests.post(url, data={"chat_id": CHAT_ID, "text": msg, "parse_mode": "Markdown"})
        print("✅ Alert Sent to Captain!")
    except Exception as e:
        print(f"❌ Error: {e}")

def check_board_intelligence():
    print("🚀 NTG Intel Division: Scanning for Targets...")
    query = " OR ".join([f'"{name}"' for name in MONITORED_NAMES])
    # Εδώ γίνεται η αναζήτηση (χρησιμοποιούμε το NewsAPI ως παράδειγμα)
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={NEWS_API_KEY}"
    
    try:
        response = requests.get(url).json()
        articles = response.get('articles', [])
        
        if not articles:
            print("🔍 No new mentions found today.")
            return

        for article in articles[:3]: # Μόνο τα 3 πιο πρόσφατα
            alert_msg = (
                f"🚨 *ALERT: NTG Intel Division*\n"
                f"🎯 *TARGET IDENTIFIED:* {article['title']}\n"
                f"🏢 *SOURCE:* {article['source']['name']}\n"
                f"🔗 [Read Report]({article['url']})"
            )
            send_telegram(alert_msg)
    except:
        print("⚠️ News API limit reached or error. Monitoring continues...")

if __name__ == "__main__":
    check_board_intelligence()
