from flask import Blueprint

#create the blueprint for auth
auth = Blueprint('auth', __name__, template_folder='templates')

from . import routes
