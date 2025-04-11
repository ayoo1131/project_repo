from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from my_app.auth.models import User
from my_app import db
from my_app.dashboard import dashboard

#Dashboard home page route
@dashboard.route('/dashboard')
@login_required
def dash():
    return render_template('dashboard.html')

@dashboard.route('/cover-letter')
def cover():
    return render_template('cover_letter.html')

#Dashboard logout route
@dashboard.route('/logout')
@login_required
def logout():
    logout_user()
    return render_template('home.html')
