#delete_guest_user.py
from flask import Flask, request, jsonify
from flask_login import login_required, current_user
from models.user import User
from my_app import db
from sqlalchemy.exc import SQLAlchemyError

from .. import applied_jobs_blueprint

@applied_jobs_blueprint.route('/api/delete-guest-user', methods=['DELETE'])
@login_required
def delete_guest_user():
    try:
        user = current_user
        db.session.delete(user)
        db.session.commt()
        

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500

