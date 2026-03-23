import os
import json
import io
from supabase import create_client, Client
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload

# 1. Σύνδεση με Supabase (Secrets)
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

# 2. Σύνδεση με Google Drive API
def get_gdrive_service():
    """Δημιουργεί τη σύνδεση με το Drive χρησιμοποιώντας το JSON Secret"""
    try:
        # Παίρνει το JSON από τα GitHub Secrets
        info = json.loads(os.environ.get("GDRIVE_SERVICE_ACCOUNT_JSON"))
        creds = service_account.Credentials.from_service_account_info(info)
        return build('drive', 'v3', credentials=creds)
    except Exception as e:
        print(f"❌ Drive Auth Error: {e}")
        return None

# 3. Λειτουργία Audit Log (Η Νομική σου Ασπίδα)
def log_user_action(user_id, action, description):
    """Καταγράφει κάθε κίνηση στη βάση δεδομένων για το Audit Trail"""
    data = {
        "user_id": user_id,
        "action_type": action,
        "description": description
    }
    try:
        supabase.table("user_audit_logs").insert(data).execute()
        print(f"🔒 Audit Log Created: {action} by {user_id}")
    except Exception as e:
        print(f"❌ Audit Error: {e}")

# 4. Λειτουργία Μεταφοράς στο Google Drive
def archive_photo_to_drive(file_content, file_name, folder_id):
    """Μεταφέρει τη φωτογραφία από τη Supabase στην αποθήκη του Drive"""
    service = get_gdrive_service()
    if not service: return

    file_metadata = {
        'name': file_name,
        'parents': [folder_id]
    }
    try:
        media = MediaIoBaseUpload(io.BytesIO(file_content), mimetype='image/jpeg')
        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        print(f"✅ Photo Archived in Drive: {file.get('id')}")
        return file.get('id')
    except Exception as e:
        print(f"❌ Drive Upload Error: {e}")
        return None

# --- Κεντρική Ροή Πράκτορα (Main Logic) ---
if __name__ == "__main__":
    # Καταγραφή έναρξης συστήματος
    log_user_action(
        "SYSTEM_BOT", 
        "AGENT_START", 
        "Intel Agent V56 is live with Hybrid Storage (Supabase + Drive)"
    )
    
    print("🚀 NTG Intel Agent is running...")
