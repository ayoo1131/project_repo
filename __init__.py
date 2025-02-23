from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#initialize SQLAlchemy so we can use it later in the model 

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = ''
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqllite://db.sqllite'

    db.init_app(app)

    #template for auth routes in the application
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    #template for non-authintication partos of the application
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app


