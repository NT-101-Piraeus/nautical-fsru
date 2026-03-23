import os
from supabase import create_client, Client

# Τραβάει τα στοιχεία από τα GitHub Secrets (τα έχουμε βάλει ήδη)
URL = os.environ.get("SUPABASE_URL", "https://omdarjncczohpfzrqqhr.supabase.co")
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

def log_event(action, detail):
    """Καταγράφει κάθε κίνηση στο νομικό ημερολόγιο της NTG"""
    try:
        if not KEY:
            print("❌ Error: Missing Service Role Key")
            return
        supabase: Client = create_client(URL, KEY)
        supabase.table("user_audit_logs").insert({
            "user_id": "CAPTAIN_M_SYK",
            "action_type": action,
            "description": detail
        }).execute()
        print(f"🔒 Logged: {action}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    log_event("AGENT_BOOT", "Intel Agent V56 Active - Monitoring Supabase Storage.")
    print("🚀 NTG Intel Agent: STANDBY MODE ACTIVE")
