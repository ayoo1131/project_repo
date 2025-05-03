from flask import Blueprint
import os

cover_letter_blueprint = Blueprint('cover_letter', __name__, template_folder='templates')

from . import routes
