#insert_job.py

from flask_login import login_required, current_user
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from models.job import Job
from my_app import db

#Import the applied jobs blueprint declared in __init__.py
from .. import applied_jobs_blueprint

@applied_jobs_blueprint.route('/api/insert-job', methods=['POST'])
@login_required
def insert_job():
    try:
        data = request.get_json(); #Parses incoming JSON data from request body into a dictionary.
        required_fields = ['company', 'position', 'date', 'url']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
       
        newJob = Job(
            user_id = current_user.id,
            company = data['company'],
            position = data['position'],
            date = data['date'],
            location = data['location'],
            url = data['url'],
            status = data['status']
        )
        
        db.session.add(newJob)
        db.session.commit()
        return jsonify({'message': 'Job added successfully', 'job_id': newJob.id}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500

