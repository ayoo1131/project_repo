#routes.py

from flask import BluePrint, send_from_directory, render_template
from . import applied_jobs_blueprint

@applied_jobs.route('/' methods=['GET', 'POST'])
def applied_jobs_home():
    if request.method == 'GET':
        return render_template('applied_jobs.html')


    return render_template('applied_jobs.html')
