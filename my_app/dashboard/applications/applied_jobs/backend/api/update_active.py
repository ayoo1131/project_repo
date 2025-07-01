#update_active.py

from flask_login import login_required
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.job import Job
from my_app import db

#Import the applied jobs blueprint declared in parent package __init__.py
from .. import applied_jobs_blueprint

@applied_jobs_blueprint.route('/api/update-active', methods =['PUT'])
@login_required
def update_active():
    try:
        frontendData = request.get_json()

        job_id = frontendData.get('jobId')
        if not job_id:
            return jsonify({'error': 'Job Id is required'}), 400

        job = Job.query.filter_by(id = job_id).first()
        if not job:
            return jsonify({'error': 'Job not found'}), 400

        job.status='Active'
        db.session.commit()

        return jsonift({'message': 'Job status successfully updated'}),201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500
