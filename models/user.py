#user.py
from my_app import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    is_guest = db.Column(db.Integer)
    username = db.Column(db.String(25), unique=True)
    password = db.Column(db.String(100))
    role = db.Column(db.String(20), default='user')
    created_date_time = db.Column(db.String(25))
