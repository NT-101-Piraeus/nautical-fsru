import os
import json
import hashlib
import requests
from datetime import datetime, timezone
from supabase import create_client, Client

# --- CONFIGURATION & SECRETS ---
URL = os.environ.get("SUPABASE_URL")
KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(URL, KEY)

# Το "Salt" για την εγκυρότητα του Chain of Custody (Legal GEM Requirement)
SALT = "NTG_FORENSIC_2024_SECURE_TOKEN" 

TARGET_NIP = "5262587598"  # EMIR GROUP'S SP. Z O.O.
TARGET_IMO = "9482926"    # S.V. NIKOLAY

def generate_forensic_hash(data_string, timestamp):
    """
    Υλοποίηση του Legal GEM Formula: 
    Hash = SHA-256(Data + Timestamp + Salt)
    """
    payload = f"{data_string}{timestamp}{SALT}"
    return hashlib.sha256(payload.encode()).hexdigest()

def check_polish_registry(nip):
    print(f"[*] Interrogating Polish Registry for NIP: {nip}...")
    # Εδώ χτυπάμε το API της Πολωνικής Κυβέρνησης (KAS/KRS) 
    # Χρησιμοποιούμε το επίσημο endpoint για το White List των εταιρειών
    api_url = f"https://wl-api.mf.gov.pl/api/search/nip/{nip}?date={datetime.now().date()}"
    
    try:
        response = requests.get(api_url, timeout=15)
        if response.status_code == 200:
            return response.json()
        else:
            return {"status": "ERROR", "code": response.status_code, "msg": "Registry Unreachable"}
    except Exception as e:
        return {"status": "ERROR", "msg": str(e)}

def run_legal_engine():
    print("--- NAUTICAL OS v3: LEGAL ENGINE START ---")
    
    # 1. FETCH DATA
    raw_data = check_polish_registry(TARGET_NIP)
    data_string = json.dumps(raw_data, sort_keys=True)
    
    # 2. FORENSIC TIMESTAMP & HASHING
    timestamp = datetime.now(timezone.utc).isoformat()
    forensic_hash = generate_forensic_hash(data_string, timestamp)
    
    # 3. CRITICAL ALERT TRIGGER (Legal GEM Directive)
    # Παράδειγμα ελέγχου για το S.V. NIKOLAY (IMO 9482926)
    # Εδώ θα μπορούσε να μπει API call για MarineTraffic/SDN List
    target_status = "SDN ALERT" if "error" in data_string.lower() else "MONITORED"
    
    if TARGET_IMO == "9482926" and target_status == "SDN ALERT":
        print("\n" + "!"*50)
        print("CRITICAL LEGAL ALERT: S.V. NIKOLAY STATUS CHANGED!")
        print(f"TIMESTAMP: {timestamp}")
        print("!"*50 + "\n")

    # 4. SUPABASE INGESTION WITH CHAIN OF CUSTODY
    evidence_payload = {
        "target": "EMIR GROUP'S (POLAND)",
        "source": "KRS/KAS API",
        "details": data_string[:500], # Short summary for overview
        "raw_json": raw_data,
        "created_at": timestamp,
        "forensic_hash": forensic_hash,
        "severity": "HIGH" if "ERROR" in data_string else "NORMAL"
    }

    try:
        # Γράφουμε στον πίνακα osint_alerts που βλέπει το M5 App
        res = supabase.table("osint_alerts").insert(evidence_payload).execute()
        print(f"[+] Forensic Evidence Locked. Hash: {forensic_hash}")
    except Exception as e:
        print(f"[-] Database Sync Failed: {e}")

if __name__ == "__main__":
    run_legal_engine()
