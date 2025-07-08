#__init__.py
from flask import Blueprint
import os

cover_letter_blueprint = Blueprint('cover_letter',  __name__, static_folder='../frontend/dist/assets', template_folder='../frontend/dist')

#Import routes after Blueprint is created
from . import routes

#Import api routes in the api directory
from .api import insert_contact
from .api import get_contact
from .api import delete_contact
from .api import update_contact
