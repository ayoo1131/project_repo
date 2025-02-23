from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager 

#initialize SQLAlchemy so we can use it later in the model 

app = Flask(__name__)

app.config['SECRET_KEY'] = ''
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

db = SQLAlchemy()
db.init_app(app)

    #template for auth routes in the application
from .auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

    #template for non-authintication partos of the application
from .main import main as main_blueprint
app.register_blueprint(main_blueprint)



# Add this block to make the file executable
if __name__ == "__main__":
    app.run(debug=True)  # Run the Flask app in debug mode
