# models.py

'''
The user model represents what it means for the application to have a user. Models created in Flask-SQLAlchemy are represented by classes that then translate in a database. The attributes of those classes then turn into columns for those tables. This code will define a User with columns for id, username, and password 
'''
from my_app import db
from flask_login import UserMixin #Flask-Login can manage user sessions. add UserMixin to user model to allow flask-login attributes to work with model

class User(UserMixin, db.Model):
    __tablename__='user' #Define the name of the table when create_db is run
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    is_guest = db.Column(db.Integer)
    username = db.Column(db.String(25), unique=True)
    password = db.Column(db.String(100))
    role = db.Column(db.String(20), default='user')
    created_date_time = db.Column(db.String(25))
