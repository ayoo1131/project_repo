from flask import Blueprint
import os

cover_letter = Blueprint('cover_letter', __name__, template_folder='templates')

from . import routes
