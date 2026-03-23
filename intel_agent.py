import os
from supabase import create_client, Client

# Σύνδεση με το project σου
URL = "https://omdarjncczohpfzrqqhr.supabase.co"
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

def record_audit(action, desc):
    try:
        if not KEY: return
        supabase: Client = create_client(URL, KEY)
        supabase.table("user_audit_logs").insert({
            "user_id": "SYSTEM_V56",
            "action_type": action,
            "description": desc
        }).execute()
        print(f"🔒 Audit Trail Updated: {action}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    record_audit("SYSTEM_CHECK", "V56 Intelligence Layer Active.")
    print("🚀 NTG Intel Agent: ONLINE")
