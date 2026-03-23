import os
from supabase import create_client, Client

# Σύνδεση με Supabase μέσω των Secrets που ήδη έχεις βάλει στο GitHub
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

def log_user_action(user_id, action, description):
    """Καταγραφή Audit Trail στη βάση"""
    data = {"user_id": user_id, "action_type": action, "description": description}
    try:
        supabase.table("user_audit_logs").insert(data).execute()
        print(f"🔒 Audit Log: {action} by {user_id}")
    except Exception as e:
        print(f"❌ Audit Error: {e}")

if __name__ == "__main__":
    log_user_action("SYSTEM_BOT", "AGENT_START", "V56 Supabase Storage Active - Ready for Inspection")
    print("🚀 NTG Agent is live and waiting for photos!")
