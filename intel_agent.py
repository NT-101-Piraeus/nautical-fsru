def log_user_action(user_id, action, description):
    """Καταγραφή κάθε ενέργειας για νομική κάλυψη (Audit Trail)"""
    data = {
        "user_id": user_id,
        "action_type": action,
        "description": description
    }
    try:
        supabase.table("user_audit_logs").insert(data).execute()
        print(f"🔒 Audit Log Created: {action} by {user_id}")
    except Exception as e:
        print(f"Audit Error: {e}")

if __name__ == "__main__":
    log_user_action("CAPTAIN_MAIN", "SYSTEM_START", "Intel Agent V55 initiated with Ship-Type Priority logic.")
