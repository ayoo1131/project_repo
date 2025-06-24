#__init__.py
from flask import Blueprint
import os

applied_jobs_blueprint = Blueprint('applied_jobs',  __name__, static_folder='../frontend/dist/assets', template_folder='../frontend/dist')

#Import routes after Blueprint is created
from . import routes

#Import api routes in the api directory
from .api import get_jobs
from .api import insert_job
from .api import delete_job
from .api import update_rejected
from .api import update_interview
from .api import update_active
