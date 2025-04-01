# auth.py

from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from .models import User
from . import db
from my_app.validate_signup import is_valid_password, is_valid_username

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():
    username = request.form.get('username')
    password = request.form.get('password')

    usernameError = is_valid_username(username)
    passwordErrorList = is_valid_password(password)
    
    if (len(passwordErrorList) > 0 and usernameError != None):
        return render_template('signup.html', usernameError=usernameError, passwordErrors = passwordErrorList)
    
    #return render_template('signup.html', messageUsername = "what")


#To Do: Find out why removing the below lines of code result in an error
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))
