import os
import requests
from supabase import create_client

# Σύνδεση με Supabase (Τα παίρνει αυτόματα από τα Secrets του GitHub)
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

TARGETS = [
    {"name": "Emir Öztürk", "query": 'ext:pdf "5262587598" OR "Emir Group"'},
    {"name": "Alasund Shipbrokers", "query": '"Alasund" AND "Terme Shipyard"'},
    {"name": "S.V. NIKOLAY", "query": 'IMO 9482926 AND "Samsun"'}
]

def run_osint():
    for target in TARGETS:
        print(f"Scanning for: {target['name']}...")
        
        # Εδώ γίνεται η κλήση (Simulated Google Search API ή Scraper)
        # Αν βρεθεί νέο αποτέλεσμα, το στέλνουμε στο Supabase
        alert_data = {
            "target": target['name'],
            "status": "ALERT",
            "severity": "HIGH",
            "source": "Google OSINT Bot",
            "details": f"New activity detected for query: {target['query']}"
        }
        
        # Αποθήκευση στον πίνακα 'osint_alerts' του Supabase
        supabase.table("osint_alerts").insert(alert_data).execute()
        print(f"Alert sent for {target['name']}")

if __name__ == "__main__":
    run_osint()
