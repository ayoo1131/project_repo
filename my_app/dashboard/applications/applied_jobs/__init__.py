#__init__.py

from flask import Blueprint
import os

applied_jobs_blueprint = Blueprint('applied_jobs', __name__, static_folder='build/static', template_folder='build')

#Import routes after Blueprint is created
from . import routes


