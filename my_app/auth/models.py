# models.py

'''
The user model represents what it means for the application to have a user. Models created in Flask-SQLAlchemy are represented by classes that then translate in a database. The attributes of those classes then turn into columns for those tables. This code will define a User with columns for id, username, and password 
'''
from my_app import db
from flask_login import UserMixin #Flask-Login can manage user sessions. add UserMixin to user model to allow flask-login attributes to work with model

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
