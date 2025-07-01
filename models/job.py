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
    date = db.Column(db.String(15)) #Store date as YYYY-MM-DD which is ISO standard and allows for easy sorting
    location = db.Column(db.String(40))
    url = db.Column(db.String(200))
    status = db.Column(db.String(20))
    starred = db.Column(db.Integer, default=0)
