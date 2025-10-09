#job.py
from my_app import db
from datetime import datetime
from sqlalchemy import ForeignKey

class Job(db.Model):
    __tablename__ = 'job'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    company = db.Column(db.String(60))
    position = db.Column(db.String(60))
    date_time_applied = db.Column(db.String(25)) #Store date as YYYY-MM-DDTHH:MM:SS which is ISO standard and allows for easy sorting
    date_time_rejected = db.Column(db.String(25))
    date_time_interview = db.Column(db.String(25))
    location = db.Column(db.String(60))
    url = db.Column(db.String(250))
    status = db.Column(db.String(20))
    starred = db.Column(db.Integer, default=0)
