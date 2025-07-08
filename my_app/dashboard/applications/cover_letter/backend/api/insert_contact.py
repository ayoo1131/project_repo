#insert_contact.py
from flask_login import login_required, current_user
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.contact import Contact
from my_app import db

import logging

#Import the cover letter blueprint declared in __init__.py
from .. import cover_letter_blueprint

@cover_letter_blueprint.route('/api/insert-contact', methods=['POST'])
@login_required
def insert_contact():
    try:
        data = request.get_json() #Parses incoming JSON data from request body into a directory
        logging.error(data)
        required_fields = ['name', 'email', 'phone']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        newContact = Contact(
            user_id = current_user.id,
            name = data['name'],
            email = data['email'],
            phone = data['phone'],
            social = data['social'],
            extra=data['extra']
        )
        db.session.add(newContact)
        db.session.commit()

        return jsonify({'message': 'Contact added successfully', 'contact_id': newContact.id}), 201


    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500
