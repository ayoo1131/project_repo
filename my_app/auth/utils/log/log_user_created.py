#log_user_created.py
import os
import logging
from pathlib import Path

#Get the absolute path to this file
CURRENT_DIR = Path(__file__).resolve().parent

#Go up to the project root: project_repo (4 levels up in this dir)
PROJECT_ROOT = CURRENT_DIR.parents[3]

# Build the path to the logs/users_created.log file
LOG_FILE = PROJECT_ROOT/ "logs" /"users_created.log"

#Create a logger object
logger = logging.getLogger("user_created")
logger.setLevel(logging.INFO)

#Create a file handler for the users_created.log file
file_handler = logging.FileHandler(LOG_FILE)
file_handler.setLevel(logging.INFO)

#Create and attach a formatter
formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)

#Add the handler to the logger
if not logger.hasHandlers():
    logger.addHandler(file_handler)

def log_user_created(username, user_id, created_date_time, user_ip):
    logger.info(f"username = {username} | user_id = {user_id} | created_date_time = {created_date_time} | user_ip = {user_ip}")
    return
    
