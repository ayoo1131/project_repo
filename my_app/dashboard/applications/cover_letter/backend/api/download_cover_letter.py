#download_cover_letter.py
from flask_login import login_required, current_user
from flask import jsonify, request, send_file
from sqlalchemy.exc import SQLAlchemyError
from models.contact import Contact
from my_app import db
from ..utils.fill_template import fill_template

import logging

from .. import cover_letter_blueprint

@cover_letter_blueprint.route('/api/download-cover-letter', methods =['POST'])
@login_required
def download_cover_letter():
    try:
        data = request.get_json()
        download_document_buffer = fill_template(current_user, data)
        logging.error(data)
        #user_name = data['name']
        user_name = 'James'
        company = data['company']
        
        return send_file(
            download_document_buffer,
            as_attachment = True,
            download_name = f"{user_name} Cover Letter - {company}.docx",
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )        
        #return jsonify({'message': 'Download successful'}), 201

    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500
