#get_jobs.py

from flask_login import login_required, current_user
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from models.job import Job
from my_app import db

#Import the applied jobs blueprint declared in __init__.py
from .. import applied_jobs_blueprint


@applied_jobs_blueprint.route('/api/get-jobs', methods=['GET'])
@login_required
def get_jobs():
    try:
        jobs = Job.query.filter_by(user_id=current_user.id).all()

        return jsonify([{
            'id': j.id,
            'company': j.company,
            'position': j.position,
            'date': j.date,
            'location': j.location,
            'url': j.url,
            'status': j.status
        } for j in jobs])

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500

