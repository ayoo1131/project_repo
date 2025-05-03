from flask import render_template, request, session, redirect, url_for, flash, send_file
from . import cover_letter_blueprint #import the cover_letter Blueprint
from .services.generate_cover_letter import CoverLetterGenerator
from docx import Document
import logging
from .services.storage import TempFileStorage
import io
import mammoth #DOCX to HTML converter

coverLetter = CoverLetterGenerator()
fileStorage= TempFileStorage()

@cover_letter_blueprint.route('/', methods=['GET', 'POST'])
def cover_letter_home():
    if request.method == 'GET':
        formData=session.get('formData', {})
        return render_template(
            'cover_letter.html'
        )

    if request.method == 'POST':#This will process the user input and create the new document from the cover letter template
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
        return redirect(url_for('cover_letter.download_page'))

    return render_template('cover_letter.html')
   
@cover_letter_blueprint.route('/preview')
def preview_document():
    if 'generatedDocument' not in session:
        return redirect(url_for('cover_letter.cover_letter_home'))

    #Get the file data from storage
    fileData = fileStorage.get(session['generatedDocument']['fileId'])
    if not fileData:
        logging.error('Document not found')

    #Convert DOCX to HTML for preview
    result = mammoth.convert_to_html(io.BytesIO(fileData))
    htmlContent = result.value

    return render_template('preview.html', content=htmlContent, company=session['generatedDocument']['company'])

@cover_letter_blueprint.route('/download')
def download_page():
    if 'generatedDocument' not in session:
        return redirect(url_for('cover_letter.cover_letter_home'))
    
    return render_template('download_preview.html')

@cover_letter_blueprint.route('/download-file')
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


