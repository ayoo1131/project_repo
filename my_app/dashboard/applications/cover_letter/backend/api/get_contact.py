#get_contact.py
from flask_login import login_required, current_user
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from models.contact import Contact
from my_app import db
import logging

#Import the cover letter blueprint declared in __init__.py
from .. import cover_letter_blueprint

@cover_letter_blueprint.route('/api/get-contact', methods=['GET'])
@login_required
def get_contact():
    try:
        contact = Contact.query.filter_by(user_id = current_user.id).first()
        if (contact is not None ):
            return jsonify([{'name': contact.name, 'email': contact.email, 'phone': contact.phone, 'social': contact.social, 'extra': contact.extra}])

        else:
            return []
        
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500
