#storage.py
import os
import uuid
from flask import current_app
from datetime import datetime, timedelta
import logging

class TempFileStorage:
    def __init__(self):
        self.storage_path = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/cover_letter/temp'

    def save(self, fileData):
        #Save file data with unique ID and return access token
        fileId = str(uuid.uuid4())
        filePath = os.path.join(self.storage_path, fileId)

        with open(filePath, 'wb') as f:
            f.write(fileData)

        return fileId

    def get(self, fileID):
        #Retrieve dile data by ID
        filePath = os.path.join(self.storage_path, fileID)
        if os.path.exists(filePath):
            with open(filePath, 'rb') as f:
                return f.read()

        return None

    def cleanup(self, timer=1): 
        #Remove files older than specified time(in hours)

        now = datetime.now()
        for fileName in os.listdir(self.storage_path):
            file_path = os.path.join(self.storage_path, fileName)
            file_time = datetime.fromtimestamp(os.path.getmtime(file_path))
            if (now - file_time) > timedelta(hours=time):
                os.remove(file_path)

