from flask import render_template, request, session, redirect, url_for, flash, send_file
from . import cover_letter #import the cover_letter Blueprint
from .services.cl import cover_letter_generate
from docx import Document
import logging
from .services.storage import TempFileStorage
import io

coverLetter = cover_letter_generate()
fileStorage= TempFileStorage()

@cover_letter.route('/', methods=['GET', 'POST'])
def cover_letter_home():

    if request.method == 'POST':#This will process the user input and create the new document from the cover letter template
        try:
            company = request.form.get('company')
            role = request.form.get('role')
            industry = request.form.get('industry')
           
            #Check if any of the user input in fields is empty. If so, reload the cover_letter page with already input fields
            errorList = []
            if (len(company)==0):
                errorList.append("Please enter a valid company")

            if (len(role)==0):
                errorList.append("Please enter a valid role")

            if (len(industry) == 0):
                errorList.append("Please enter a valid industry")

            if (len(errorList) > 0):
                return render_template('cover_letter.html', coverLetterErrors=errorList, company=company, role=role, industry=industry)

            session['formData'] = {
                'company' : company,
                'role' : role,
                'industry' : industry
            }
            
            fileStream, fileName = coverLetter.generateCoverLetter(session['formData'])
            fileData = fileStream.getvalue()
            fileStream.close()

            #Store in temp storage instead of session
            fileId = fileStorage.save(fileData)
           
            #Store only meta data in session
            session['generatedDocument'] ={
                'fileId' : fileId,
                'fileName' : fileName,
                'company' : company
            }
            logging.error('2')
            return redirect(url_for('cover_letter.download_page'))

        except Exception as e:
            flash(str(e), 'error')

    return render_template('cover_letter.html')
    
@cover_letter.route('/download')
def download_page():
    logging.error("DOWNLOAD PAGE ROUTE REACHED")
    if 'generatedDocument' not in session:
        return redirect(url_for('cover_letter.cover_letter_home'))
    
    return render_template('download_preview.html')

@cover_letter.route('/download-file')
def download_file():
    if 'generatedDocument' not in session:
        return redirect(url_for('cover_letter.cover_letter_home'))
    
    fileData = fileStorage.get(session['generatedDocument']['fileId'])

    return send_file(
        io.BytesIO(fileData),
        as_attachment = True,
        download_name = session['generatedDocument']['fileName'],
        mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )


