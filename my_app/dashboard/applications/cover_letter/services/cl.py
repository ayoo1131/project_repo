#cl.py
import os
from docx import Document
import io
from datetime import datetime
import logging

class cover_letter_generate:
    #def __init__(self, template_path='dashboard/applications/cover_letter/static/clTemplate.docx'):
    def __init__(self):
        
        self.template_path = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/cover_letter/static/clTemplate.docx'

        #os.makedirs(self.output_dir, exist_ok=True)  # Create directory if it doesn't exist

    def generateCoverLetter(self, formData):
        doc = Document(self.template_path)
        for para in doc.paragraphs:
            if '<COMPANY>' in para.text:
                para.text = para.text.replace('<COMPANY>', formData['company'])

            if '<ROLE>' in para.text:
                para.text = para.text.replace('<ROLE>', formData['role'])

            if '<INDUSTRY>' in para.text:
                para.text = para.text.replace('<INDUSTRY>', formData['industry'])

        fileName=f"Andrew Yoo Cover Letter - {formData['company']}.docx"

        output = io.BytesIO()
        doc.save(output)
        output.seek(0)
       
        return output, fileName
