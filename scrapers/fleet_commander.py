# Αντικατέστησε το transmit_to_bridge στο τέλος του fleet_commander.py με αυτό:
def transmit_to_bridge(targets):
    if not targets: return
    # Σώζει τα δεδομένα σε ένα JSON αρχείο μέσα στο repo
    with open('data/radar_feed.json', 'w', encoding='utf-8') as f:
        json.dump(targets, f, ensure_ascii=False, indent=4)
    print(f"M11: Data locked in data/radar_feed.json")
