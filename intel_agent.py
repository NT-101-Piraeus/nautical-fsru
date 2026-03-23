import os
import json
import io
from supabase import create_client, Client
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload

# 1. Σύνδεση με Supabase
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

# 2. Σύνδεση με Google Drive API
def get_gdrive_service():
    try:
        info = json.loads(os.environ.get("GDRIVE_SERVICE_ACCOUNT_JSON"))
        creds = service_account.Credentials.from_service_account_info(info)
        return build('drive', 'v3', credentials=creds)
    except Exception as e:
        print(f"❌ Drive Auth Error: {e}")
        return None

# 3. Λειτουργία Audit Log
def log_user_action(user_id, action, description):
    data = {"user_id": user_id, "action_type": action, "description": description}
    try:
        supabase.table("user_audit_logs").insert(data).execute()
        print(f"🔒 Audit Log: {action} by {user_id}")
    except Exception as e:
        print(f"❌ Audit Error: {e}")

# 4. Κεντρική Ροή
if __name__ == "__main__":
    log_user_action("SYSTEM_BOT", "AGENT_START", "V56 Hybrid Storage Active")
    print("🚀 Agent is live!")
