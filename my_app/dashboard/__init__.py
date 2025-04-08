from flask import Blueprint

#create the blueprint for dashboard
dashboard = Blueprint('dashboard', __name__, template_folder='templates')

from . import routes

