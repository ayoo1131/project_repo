from flask import Blueprint, render_template, redirect, url_for, request, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user
from my_app.auth.models import User
from my_app import db
from my_app.auth import auth
from my_app.auth.validate_signup import is_valid_password, is_valid_username

#Authentication Home Route
@auth.route('/')
def home():
    return render_template('home.html')

#About Page Route
@auth.route('/about')
def about():
    return render_template('about.html')

#Login Routes
@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')

    user = User.query.filter_by(username=username).first()

    #Check if user exists. Also check if password entered by user corresponds to username
    if not user or not check_password_hash(user.password, password):
        return render_template('login.html', loginError="Login Failed. Verify username/password are correct")

    #call flask method to login user
    login_user(user)
    session['username'] = username
    #return render_template('dashboard.html', username = username)
    return redirect(url_for('dashboard.dashboard_home'))

#Signup Routes
@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
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
    newUser = User(username=username, password=generate_password_hash(password, method = 'pbkdf2:sha256'))
    
    # add the new user to the database
    db.session.add(newUser)
    db.session.commit()

    return render_template('login.html', userSuccessfullyAdded='User successfully added')

