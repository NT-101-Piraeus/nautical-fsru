def send_instant_alert(vessel_name, event_type):
    """
    Στέλνει ακαριαία ειδοποίηση στο κινητό μέσω Webhook
    """
    WEBHOOK_URL = "ΕΔΩ_ΒΑΖΟΥΜΕ_ΤΟ_URL_ΣΟΥ" # Π.χ. Discord Webhook URL
    
    alert_payload = {
        "content": f"🚨 **CRITICAL LEGAL ALERT** 🚨\n"
                   f"**Target:** {vessel_name}\n"
                   f"**Event:** {event_type}\n"
                   f"**Geofence:** Terme Shipyard\n"
                   f"**Time (UTC):** {datetime.now(timezone.utc).isoformat()}"
    }
    
    try:
        requests.post(WEBHOOK_URL, json=alert_payload)
        print(f"[!] Push Alert Sent for {vessel_name}")
    except Exception as e:
        print(f"[-] Alert Failed: {e}")

# Κατά τη διάρκεια του σκαναρίσματος:
if vessel_speed == 0 and inside_geofence:
    send_instant_alert(vessel_name, "DOCKING DETECTED - POTENTIAL ASSET SEIZURE POINT")
