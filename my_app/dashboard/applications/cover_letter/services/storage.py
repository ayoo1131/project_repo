#storage.py
import os
import uuid
from flask import current_app
from datetime import datetime, timedelta
import logging
from apscheduler.schedulers.background import BackgroundScheduler

class TempFileStorage:
    def __init__(self, app=None):
        #Hardcode the storage path for your cover letter temp files
        self.storage_path = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/cover_letter/generated_cover_letters'
        
        self._scheduler = None # Scheduler instance placeholder

        self.start_cleanup()

    def save(self, fileData):
        #Save file data with unique ID and return access token
        fileId = str(uuid.uuid4())
        filePath = os.path.join(self.storage_path, fileId)

        with open(filePath, 'wb') as f: #Write file to disk
            f.write(fileData)

        return fileId

    def get(self, fileID):
        #Retrieve file data by ID
        filePath = os.path.join(self.storage_path, fileID)
        if os.path.exists(filePath):
            with open(filePath, 'rb') as f:
                return f.read()

        return None

    def start_cleanup(self, intervalHours=1):
        self._scheduler = BackgroundScheduler(daemon = True)
        
        # Add the cleanup job to run at intervals
        self._scheduler.add_job(
            self.cleanup,          # Method to call
            'interval',           # Trigger type
            hours=intervalHours, # Run frequency
            id='file_cleanup'     # Unique job ID
        )

        # Start the scheduler
        self._scheduler.start()

    def cleanup(self, timer=1): 
        #Remove files older than specified time(in hours)

        now = datetime.now() - timedelta(hours=timer) #Find time that the timer started countdown

        for fileName in os.listdir(self.storage_path): #Scan temp file directory for old files
            file_path = os.path.join(self.storage_path, fileName)
            file_time = datetime.fromtimestamp(os.path.getmtime(file_path))
            if file_time > now:
                os.remove(file_path)



