#create_db.py
from my_app import create_app, db
from models.user import User
from models.job import Job
from models.contact import Contact

def initialize_database():
    app = create_app()

    with app.app_context():
        db.create_all()
        print("Database created successfully")

if __name__ == '__main__':
    initialize_database()
