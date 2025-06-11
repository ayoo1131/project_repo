#update_interview.py

from flask_login import login_required
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.job import Job
from my_app import db

#Import the applied job blueprint declared in __init__.py
from .. import applied_jobs_blueprint

@applied_jobs_blueprint.route('/api/update-interview', methods=['PUT'])
@login_required
def update_interview():
    try:
        frontend_data = request.get_json()
        job_id = frontend_data.get('jobId')

        if not job_id:
            return jsonify({'error': 'Job Id is required'})

        job = Job.query.filter_by(id = job_id).first()
        
        if job:
            job.status = 'Interview'
            db.session.commit()
            
            return jsonify({'message': 'Job status updated to Interview'}), 201

        return jsonify({'message': 'Job with id not found'}), 500

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500

