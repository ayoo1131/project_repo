# init.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager 
import logging
from logging.handlers import SysLogHandler

from jinja2 import ChoiceLoader, FileSystemLoader
import os

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.debug = True #Debug mode ON

    #Setup error logging to /var/log/syslog
    syslog_handler = SysLogHandler(address='/dev/log') #writes to syslog
    syslog_handler.setLevel(logging.DEBUG) #set the level of logging you want
    formatter = logging.Formatter('%(asctime)s %(name)s[%(process)d]: %(message)s')
    syslog_handler.setFormatter(formatter)

    app.logger.addHandler(syslog_handler) #Add the handler to Flask's Logger

    app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO' #Key used by Flask app to sign in session cookies, generate csrf tokens for forms, and provide security.
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite' #Tells SQLAlchemy to create a SQLite database file named db.sqlite in the root directory.
    app.config['SQLALCHEMY_TRACK_MODICIFATIONS'] = False

    db.init_app(app)
    
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    #blueprint for api routes
    from my_app.dashboard import api_blueprint
    app.register_blueprint(api_blueprint)

    # blueprint for auth routes
    from my_app.auth import auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for dashboard routes in the app
    from my_app.dashboard import dashboard as dashboard_blueprint
    app.register_blueprint(dashboard_blueprint)

    #Application Blueprint Route and Register
    from my_app.dashboard.applications.test_applied_jobs.backend import test_applied_jobs_blueprint
    app.register_blueprint(test_applied_jobs_blueprint)

    #blueprint for coverletter routes in the Dashboard Applications
    from my_app.dashboard.applications.cover_letter.backend import cover_letter_blueprint
    app.register_blueprint(cover_letter_blueprint)

    #blueprint for applied jobs routes in the dashboard application
    from my_app.dashboard.applications.applied_jobs.backend import applied_jobs_blueprint
    app.register_blueprint(applied_jobs_blueprint)

    from models.user import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    return app
