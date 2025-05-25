#__init__.py

from flask import Blueprint
import os

applied_jobs_blueprint = Blueprint('applied_jobs', __name__, static_folder='../frontend/build/static', template_folder='../frontend/build')

#Import routes after Blueprint is created
from . import routes

#Import api routes in the api directory
from .api import get_jobs
from .api import get_username
from .api import insert_job

