#contact.py
from my_app import db
from sqlalchemy import ForeignKey

class Contact(db.Model):
    __tablename__ = 'contact'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False, unique=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(25))
    social = db.Column(db.String(100))
    extra = db.Column(db.String(100))
