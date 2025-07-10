from flask import Blueprint, render_template, redirect, url_for, request, flash, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from models.user import User
from models.job import Job
from models.contact import Contact
from my_app import db
from my_app.dashboard import dashboard
from . import api_blueprint
import logging

#Dashboard home page route
@dashboard.route('/dashboard')
@login_required
def dashboard_home():
    return render_template('dashboard.html', username=current_user.username, is_guest=session['is_guest'])

#API Route to allow access to logged in user info
@api_blueprint.route('/user-info')
@login_required
def get_user_info():
    return jsonify({'username': current_user.username, 'user_id': current_user.id, 'is_guest': current_user.is_guest})

#Dashboard logout route
@dashboard.route('/logout')
@login_required
def logout():
    if (session['is_guest'] == True):
        user = current_user
        
        #Delete Guest User's Applied Jobs
        db.session.query(Job).filter_by(user_id=current_user.id).delete()

        #Delete Guest User's Contact for Cover Letter
        db.session.query(Contact).filter_by(user_id=current_user.id).delete()

        #Delete Guest User
        db.session.delete(user)
        db.session.commit()

    logout_user()
    return redirect(url_for('dashboard.dashboard_home'))
