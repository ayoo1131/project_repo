from flask import render_template, request, flash
from . import cover_letter #import the cover_letter Blueprint
from .services.cl import cover_letter_generate

coverLetter=cover_letter_generate()

@cover_letter.route('/', methods=['GET', 'POST'])
def cover_letter_home():

    if request.method == 'POST':
        try:
            formData= {
                'company' : request.form.get('company', '').strip(),
                'role' : request.form.get('role', '').strip(),
                'industry' : request.form.get('industry', '').strip()
            }

            if not all(formData.values()):
                return render_template('cover_letter.html')

            document = coverLetter.generateCoverLetter(formData)
            

        except Exception as e:
            flash(str(e), 'error')


    return render_template('cover_letter.html')
    

