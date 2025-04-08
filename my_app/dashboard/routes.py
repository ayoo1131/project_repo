from flask import render_template
from my_app.auth.models import User
from my_app import db
from my_app.dashboard import dashboard


#Dashboard route
@dashboard.route('/dashboard')
def dashboard():
    return render_template('dashboard/templates/dashboard.html')

