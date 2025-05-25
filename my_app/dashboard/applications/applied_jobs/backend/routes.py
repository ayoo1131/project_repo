#routes.py
from flask import send_from_directory, render_template, jsonify, request
from flask_login import current_user, login_required
from . import applied_jobs_blueprint
from models.job import Job
from my_app import db
import os
from sqlalchemy.exc import SQLAlchemyError

import logging

build_dir = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/applied_jobs/frontend/build'

@applied_jobs_blueprint.route('/applied-jobs', defaults={'path': ''})
@applied_jobs_blueprint.route('/applied-jobs/<path:path>')
def applied_jobs_home(path):
    file_path = os.path.join(build_dir, path)
    if path and os.path.exists(file_path):
        return send_from_directory(build_dir, path)
    return send_from_directory(build_dir, 'index.html')
