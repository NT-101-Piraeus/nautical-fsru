import json
import datetime
import uuid
import requests

# --- ΣΤΡΑΤΗΓΙΚΕΣ ΠΑΡΑΜΕΤΡΟΙ [V6.1 OSINT] ---
TARGET_ZONES = ["perama", "piraeus", "elefsina", "drapetsona"]
WHITE_LIST = ["EUROSHIPPING", "NEDA", "TSAKOS", "MAERSK", "MARAN"]

def generate_utid(area):
    """Παράγει το μοναδικό ψηφιακό DNA του στόχου"""
    sector = area[:3].upper()
    hex_id = uuid.uuid4().hex[:4].upper()
    return f"NTG-2026-{sector}-{hex_id}"

def get_osint_leads():
    """Προσομοίωση OSINT Scan (AIS + Port Schedules)"""
    print(f"[{datetime.datetime.now()}] M11: Scanning Global Port Schedules...")
    
    # Πραγματικοί στόχοι Μαρτίου 2026 βάσει προγράμματος
    detected = [
        {"name": "MT FELIX", "imo": "9464182", "area": "PERAMA", "type": "LNG", "company": "EUROSHIPPING"},
        {"name": "BADJI MOKHTAR III", "imo": "9827889", "area": "ELEFSINA", "type": "LNG", "company": "ALGERIE FERRIES"},
        {"name": "MOUNT FUJI", "imo": "9725457", "area": "PIRAEUS", "type": "TANKER", "company": "NEDA"},
        {"name": "HL SEA EAGLE", "imo": "9364522", "area": "SALAMINA", "type": "LNG", "company": "H-LINE"}
    ]
    
    final_leads = []
    for v in detected:
        is_priority = any(c in v["company"].upper() for c in WHITE_LIST)
        final_leads.append({
            "utid": generate_utid(v["area"]),
            "name": v["name"],
            "type": v["type"],
            "area": v["area"],
            "company": v["company"],
            "status": "EXPECTED" if not is_priority else "PRIORITY TARGET",
            "source": "OSINT_SENSOR",
            "ts": datetime.datetime.now().strftime("%H:%M")
        })
    return final_leads

def save_to_radar_feed(targets):
    """Κλειδώνει τα δεδομένα στο αρχείο JSON για το M11 UI"""
    # Δημιουργία φακέλου data αν δεν υπάρχει (στο GitHub περιβάλλον)
    import os
    if not os.path.exists('data'):
        os.makedirs('data')
        
    with open('data/radar_feed.json', 'w', encoding='utf-8') as f:
        json.dump(targets, f, ensure_ascii=False, indent=4)
    print(f"M11: {len(targets)} Targets
