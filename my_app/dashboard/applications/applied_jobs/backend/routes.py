#routes.py
from flask import send_from_directory, render_template, jsonify, request
from flask_login import current_user, login_required
from . import applied_jobs_blueprint
from models.job import Job
from my_app import db
import os
from sqlalchemy.exc import SQLAlchemyError

build_dir = '/home/ayoo1131/project_repo/my_app/dashboard/applications/applied_jobs/frontend/dist'

@applied_jobs_blueprint.route('/applied-jobs', defaults={'path': ''}, methods=['GET'])
@applied_jobs_blueprint.route('/applied-jobs/<path:path>')
@login_required
def applied_jobs_home(path):
    if request.method == 'GET':
        file_path = os.path.join(build_dir, path)
        if path and os.path.exists(file_path):
            return send_from_directory(build_dir, path)
        return send_from_directory(build_dir, 'index.html')

