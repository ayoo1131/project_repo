#routes.py
from flask import send_from_directory, render_template, jsonify
from flask_login import current_user, login_required
from . import applied_jobs_blueprint
import os

build_dir = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/applied_jobs/build'

@applied_jobs_blueprint.route('/api/user-info')
@login_required
def user_info():
    return jsonify({'username': current_user.username})

@applied_jobs_blueprint.route('/applied-jobs', defaults={'path': ''})
@applied_jobs_blueprint.route('/applied-jobs/<path:path>')
def applied_jobs_home(path):
    file_path = os.path.join(build_dir, path)
    if path and os.path.exists(file_path):
        return send_from_directory(build_dir, path)
    return send_from_directory(build_dir, 'index.html')
