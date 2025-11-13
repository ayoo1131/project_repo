#create_guest_user.py
import random
from models.user import User

def create_guest_username():
    username=None
    
    while True:
        guestNum = random.randint(1,99999)
        formatted = f'{guestNum:05d}'
        username = 'guest_' + formatted

        #Search the user table and check if guest with same usernames is arealdy been made. Return username if not in user table
        if not (User.query.filter_by(username=username).first()):
            return username
