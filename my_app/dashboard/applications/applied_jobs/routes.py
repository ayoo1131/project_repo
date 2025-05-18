#routes.py
from flask import send_from_directory, render_template, jsonify, request
from flask_login import current_user, login_required
from . import applied_jobs_blueprint
from models.job import Job
from models.user import User
from my_app import db
import os
from sqlalchemy.exc import SQLAlchemyError
import logging

build_dir = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/applied_jobs/build'

@applied_jobs_blueprint.route('/applied-jobs', defaults={'path': ''})
@applied_jobs_blueprint.route('/applied-jobs/<path:path>')
def applied_jobs_home(path):
    file_path = os.path.join(build_dir, path)
    if path and os.path.exists(file_path):
        return send_from_directory(build_dir, path)
    return send_from_directory(build_dir, 'index.html')

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

        return jsonify({'message': 'Job added successfully'}), 201


    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Server error', 'details': str(e)}), 500

@applied_jobs_blueprint.route('/api/user-info')
@login_required
def user_info():
    return jsonify({'username': current_user.username})
