#get_jobs.py

from flask_login import login_required, current_user
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from models.job import Job
from my_app import db
import logging

#Import the applied jobs blueprint declared in parent package __init__.py
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
            'date_time_applied': j.date_time_applied,
            'date_time_rejected': j.date_time_rejected,
            'date_time_interview': j.date_time_interview,
            'location': j.location,
            'url': j.url,
            'status': j.status,
            'starred': j.starred
        } for j in jobs])

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500

