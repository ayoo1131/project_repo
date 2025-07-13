#download_cover_letter.py
from flask_login import login_required, current_user
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.contact import Contact
from my_app import db

import logging

from .. import cover_letter_blueprint

@cover_letter_blueprint.route('/api/download-cover-letter', methods =['POST'])
@login_required
def download_cover_letter():
    try:
        data = result.get_json()
        
        return jsonify({'message': 'Download successful'}), 201

    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500
