#job.py
from my_app import db
from datetime import datetime
from sqlalchemy import ForeignKey

class Job(db.Model):
    __tablename__ = 'job'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    company = db.Column(db.String(40))
    position = db.Column(db.String(40))
    date = db.Column(db.DateTime)
    location = db.Column(db.String(40))
    url = db.Column(db.String(100))
    status = db.Column(db.String(20))

