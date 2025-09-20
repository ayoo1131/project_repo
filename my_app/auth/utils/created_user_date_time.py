#created_user_time_date.py
from datetime import datetime

def created_user_date_time():
    return datetime.utcnow().replace(microsecond=0).isoformat()
