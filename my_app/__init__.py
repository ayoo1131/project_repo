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

    #Set up the paths to your templates
    auth_base_template_path = os.path.join(os.path.dirname(__file__), 'templates')
    dashboard_base_template_path = os.path.join(os.path.dirname(__file__), 'dashboard','templates')
    cover_letter_template_path = os.path.join(os.path.dirname(__file__), 'applications', 'cover_letter', 'templates')

    # Tell Flask to look in both places when rendering templates
    app.jinja_loader = ChoiceLoader([
        FileSystemLoader(auth_base_template_path),
        FileSystemLoader(dashboard_base_template_path),
        FileSystemLoader(cover_letter_template_path)
    ])

    #Setup error logging to /var/log/syslog
    syslog_handler = SysLogHandler(address='/dev/log') #writes to syslog
    syslog_handler.setLevel(logging.DEBUG) #set the level of logging you want
    formatter = logging.Formatter('%(asctime)s %(name)s[%(process)d]: %(message)s')
    syslog_handler.setFormatter(formatter)

    app.logger.addHandler(syslog_handler) #Add the handler to Flask's Logger

    app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODICIFATIONS'] = False

    db.init_app(app)
    
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    # blueprint for auth routes in our app
    from my_app.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for dashboard routes in the app
    from my_app.dashboard import dashboard as dashboard_blueprint
    app.register_blueprint(dashboard_blueprint)
    
    from my_app.auth.models import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    return app
