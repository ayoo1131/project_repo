from flask import Blueprint

#create the blueprint for dashboard
dashboard = Blueprint('dashboard', __name__, template_folder='templates')

from my_app.dashboard import routes

#Register the sub-app blueprints for each of the applications
from my_app.dashboard.applications.cover_letter import cover_letter_blueprint
dashboard.register_blueprint(cover_letter_blueprint, url_prefix ='/cover-letter')
