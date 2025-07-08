#update_contact.py
from flask_login import login_required, current_user
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.contact import Contact
from my_app import db

import logging

from .. import cover_letter_blueprint

@cover_letter_blueprint.route('/api/update-contact', methods=['PUT'])
@login_required
def update_contact():
    try:
        data = request.get_json()

        contact = Contact.query.filter_by(user_id=current_user.id).first()
        if (contact is not None): #User's contact found
            contact.name = data.get('name', contact.name)
            contact.email = data.get('email', contact.email)
            contact.phone = data.get('phone', contact.phone)
            contact.social = data.get('social', contact.social)
            contact.extra = data.get('extra', contact.extra)

            db.session.commit()
            return jsonify({'message': 'Contact Successfully Updated'}), 201

        else: #User's contact NOT found. serious problem
            return jsonify({'error': 'problem'})

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500
