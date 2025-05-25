#get_username.py

from flask_login import login_required, current_user
from flask import jsonify

#Import the applied jobs blueprint declared in __init__.py
from .. import applied_jobs_blueprint

@applied_jobs_blueprint.route('/api/user-info')
@login_required
def user_info():
    return jsonify({'username': current_user.username})

