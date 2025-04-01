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

'''
@auth.route('/login', methods=['POST'])
def login_post():

    
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False
    
    user = User.query.filter_by(email=email).first()

    # check if user actually exists
    # take the user supplied password, hash it, and compare it to the hashed password in database
    if not user or not check_password_hash(user.password, password): 
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # if user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    return redirect(url_for('main.profile'))
'''

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():
    username = request.form.get('username')
    password = request.form.get('password')

    isUsernameValid = is_valid_username(username)
    passwordErrors = is_valid_password(password)
    
    numPasswordErrors = len(passwordErrors)
    
    if (numPasswordErrors == 0): #There are not issues with the password. Return result of username validation (can return None)
        return render_template('signup.html', messageUsername = isUsernameValid)

    
    elif (numPasswordErrors > 0): #There is at least one issue with the input password
        if (isUsernameValid != None): #There is an error with the input username
            if (numPasswordErrors==1):
                return render_template('signup.html', messageUsername = isUsernameValid, messagePassword1 = passwordErrors[0], messagePassword2 =str(numPasswordErrors))
            
            elif (numPasswordErrors==2):
                return render_template('signup.html', messageUsername = isUsernameValid, messagePassword1 = passwordErrors[0], messagePassword2 = passwordErrors[1])
            
            
            elif (numPasswordErrors == 3):
                return render_template('signup.html', messageUsername = isUsernameValid, messagePassword1 = passwordErrors[0], messagePassword2 = passwordErrors[1], messagePassword3 = passwordErrors[2])
            
            elif (numPasswordErrors == 4):
                return render_template('signup.html', messageUsername = isUsernameValid, messagePassword1 = passwordErrors[0], messagePassword2 = passwordErrors[1], messagePassword3 = passwordErrors[2], messagePassword4 = passwordErrors[3])
            #elif (numPasswordErrors == 4):
                #return render_template('signup.html', messageUsername = isUsernameValid, messagePassword1 = passwordErrors[0], messagePassword2 = passwordErrors[1], messagePassword3 = passwordErrors[2], messagePassword4 = passwordErrors[3])
        
        '''
        elif (isUsernameValid == None): #There are no errors with the input username
            if (numPasswordErrors==1):
                return render_template('signup.html', messageUsername = messagePassword1 = passwordErrors[0])
            
            elif (numPasswordErrors==2):
                return render_template('signup.html', messagePassword1 = passwordErrors[0], messagePassword2 = passwordErrors[1])

            elif (numPasswordErrors == 3):
                return render_template('signup.html', messagePassword1 = passwordErrors[0], messagePassword2 = passwordErrors[1], messagePassword3 = passwordErrors[2])

            elif (numPasswordErrors == 4):
                return render_template('signup.html', messagePassword1 = passwordErrors[0], messagePassword2 = passwordErrors[1], messagePassword3 = passwordErrors[2], messagePassword4 = passwordErrors[3])

        ''' 
    
    '''
    passwordRepeat = request.form.get('passwordRepeat')
    
    user = User.query.filter_by(username=username).first() # if this returns a user, then the email already exists in database

    if user: # if a user is found, we want to redirect back to signup page so user can try again  
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))

    # create new user with the form data. Hash the password so plaintext version isn't saved.
    new_user = User(username=username,  password=generate_password_hash(password, method='pbkdf2:sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login'))
    '''
#To Do: Find out why removing the below lines of code result in an error
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))
