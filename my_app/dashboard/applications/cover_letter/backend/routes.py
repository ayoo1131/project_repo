#routes.py
from flask import send_from_directory, render_template, jsonify, request
from flask_login import current_user, login_required
from . import cover_letter_blueprint
from models.contact import Contact
from my_app import db
import os
from pathlib import Path
from sqlalchemy.exc import SQLAlchemyError

import logging

BASE_DIR = Path(__file__).resolve().parent.parent #Get the complete file path to parent directory of this file
build_dir = BASE_DIR / 'frontend' / 'dist'

@cover_letter_blueprint.route('/cover-letter', defaults={'path': ''}, methods=['GET'])
@cover_letter_blueprint.route('/cover-letter/<path:path>')
@login_required
def cover_letter_home(path):
    if request.method == 'GET':
        file_path = os.path.join(build_dir, path)
        if path and os.path.exists(file_path):
            return send_from_directory(build_dir, path)
        return send_from_directory(build_dir, 'index.html')

