#__init__.py
from flask import Blueprint
import os

cover_letter_blueprint = Blueprint('cover_letter',  __name__, static_folder='../frontend/dist/assets', template_folder='../frontend/dist')

#Import routes after Blueprint is created
from . import routes
