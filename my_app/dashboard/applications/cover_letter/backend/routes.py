#routes.py
from flask import send_from_directory, render_template, jsonify, request
from flask_login import current_user, login_required
from . import cover_letter_blueprint
from models.job import Job
from my_app import db
import os
from sqlalchemy.exc import SQLAlchemyError

import logging

build_dir = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/cover_letter/frontend/dist'

@cover_letter_blueprint.route('/cover-letter', defaults={'path': ''}, methods=['GET'])
@cover_letter_blueprint.route('/cover-letter/<path:path>')
def cover_letter_home(path):
    if request.method == 'GET':
        file_path = os.path.join(build_dir, path)
        if path and os.path.exists(file_path):
            return send_from_directory(build_dir, path)
        return send_from_directory(build_dir, 'index.html')

