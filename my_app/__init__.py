# init.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager 
#from .dashboard import dashboard as dashboard_blueprint
#from .auth import auth as auth_blueprint


# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.debug = True #Debug mode ON

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
