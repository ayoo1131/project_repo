#delete_job.py

from flask_login import login_required, current_user
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.job import Job
from my_app import db

#Import the applied job blueprint declared in __init__.py
from .. import applied_jobs_blueprint

@applied_jobs_blueprint.route('/api/delete-job', methods=['DELETE'])
@login_required
def delete_job():
    try:
        data = request.get_json()
        job_id = data.get('jobId')
        if not job_id:
            return jsonify({'error': 'Job Id is required'})

        job = Job.query.filter_by(id = job_id).first()

        db.session.delete(job)
        db.session.commit()

        return jsonify({'message': 'Job deleted successfully'}), 201

    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500

