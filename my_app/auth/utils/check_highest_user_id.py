#check_highest_user_id.py
from models.id_tracker import Id_Tracker
from models.user import User
from my_app import db
import logging

def check_highest_user_id(user_id, username):
    highest_id = Id_Tracker.query.first()

    logging.error("user_id")
    logging.error(user_id)

    if not highest_id: #If there are no users in user table, add user id to id_tracker table
        new_user_id = Id_Tracker(username = username, highest_id=user_id)
        db.session.add(new_user_id)
        db.session.commit()
        return user_id

    elif highest_id.highest_id >= user_id: #If the highest id is equal to new user id, then highest user's been deleted. Update id_tracker and user tables
        highest_id_value = highest_id.highest_id

        highest_id.username=username
        highest_id.highest_id=(highest_id_value + 1)

        newGuestUser = User.query.filter_by(id = user_id).first()
        newGuestUser.id = (highest_id_value + 1)
        db.session.commit()
        return (newGuestUser.id)

    elif highest_id.highest_id < user_id: #Record new highest user id in id_tracker
        highest_id.username = username
        highest_id.highest_id = user_id
        db.session.commit()
        return user_id

    return
