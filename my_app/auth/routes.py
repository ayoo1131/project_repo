from flask import Blueprint, render_template, redirect, url_for, request, flash, session
from flask_login import login_user
from werkzeug.security import generate_password_hash, check_password_hash
import time
import random
from models.user import User
from my_app import db
from .utils.validate_signup import is_valid_password, is_valid_username
from .utils.create_guest_user import create_guest_username
from .utils.created_user_date_time import created_user_date_time

auth_blueprint = Blueprint('auth', __name__, template_folder='templates')

#Authentication Home Route
@auth_blueprint.route('/')
def home():
    return render_template('home.html')

#About Page Route
@auth_blueprint.route('/about')
def about():
    return render_template('about.html')

#Login Routes
@auth_blueprint.route('/login')
def login():
    return render_template('login.html')

@auth_blueprint.route('/login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')

    user = User.query.filter_by(username=username).first()

    #Check if user exists. Also check if password entered by user corresponds to username
    if not user or not check_password_hash(user.password, password):
        return render_template('login.html', loginError="Login Failed. Verify username/password are correct")

    #call flask method to login user
    login_user(user)
    session['is_guest'] = False
    return redirect(url_for('dashboard.dashboard_home'))

@auth_blueprint.route('/login_guest', methods=['POST'])
def login_guest_post():
    password = generate_password_hash('password', method = 'pbkdf2:sha256')

    guestUser = User(is_guest=1, username=create_guest_username(), password=password, role='user', created_date_time=created_user_date_time())
    db.session.add(guestUser)
    db.session.commit()
    
    login_user(guestUser)
    session['is_guest'] = True
    session['guest_acknowledged'] = False
    #session.permanent = True #treats session as 'permanent', meaning it uses value of permanent_session_lifetime to decide when session expires. Without this line, session will only last untill browser is closed.
    return redirect(url_for('dashboard.dashboard_home'))

#Signup Routes
@auth_blueprint.route('/signup')
def signup():
    return render_template('signup.html')

@auth_blueprint.route('/signup', methods=['POST'])
def signup_post():
    username = request.form.get('username')
    password = request.form.get('password')

    usernameError = is_valid_username(username)
    passwordErrorList = is_valid_password(password)
    numPasswordErrors = len(passwordErrorList)

    #Check if user entered username and password are valid
    if (numPasswordErrors > 0 and usernameError != None): #Password has error, Username has error
        return render_template('signup.html', usernameError=usernameError, passwordErrors = passwordErrorList)
   
    if (numPasswordErrors > 0 and usernameError == None): #Password has Error, Username passes
        return render_template('signup.html', usernameAutofill=username, passwordErrors=passwordErrorList)

    if (numPasswordErrors == 0 and usernameError != None): #Password passes, Username has error
        return render_template('signup.html', usernameError=usernameError)

    #Check if password and password repeat match
    passwordRepeat = request.form.get('passwordRepeat') 
    if (password != passwordRepeat):
        return render_template('signup.html', usernameAutofill=username,  passwordErrors=['Passwords do not match'])

    #User entered username and password are valid
    #Create new user with the form data. Hash the password so plaintext version isn't saved.
    newUser = User(is_guest=0, username=username, password=generate_password_hash(password, method = 'pbkdf2:sha256'), role='user', created_date_time=created_user_date_time())
    
    # add the new user to the database
    db.session.add(newUser)
    db.session.commit()

    return render_template('login.html', userSuccessfullyAdded='User successfully added')
