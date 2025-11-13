#id_tracker.py
from my_app import db

class Id_Tracker(db.Model):
    __tablename__ = 'id_tracker'
    username = db.Column(db.String(25), primary_key=True)
    id = db.Column(db.Integer, nullable=False)
