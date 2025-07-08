#delete_contact.py
from flask_login import login_required, current_user
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.contact import Contact
from my_app import db

import logging

from .. import cover_letter_blueprint

@cover_letter_blueprint.route('/api/delete-contact', methods=['DELETE'])
@login_required
def delete_contact():
    try:
        contact = Contact.query.filter_by(user_id = current_user.id).first()
        logging.error(contact)
        db.session.delete(contact)
        db.session.commit()

        return jsonify({'message': 'Contact deleted successfully'}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500
