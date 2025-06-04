//Profile.js
import React, {useContext} from 'react';
import { logoutUser } from './utils/LogoutUser';
import { UserProvider, UserContext } from '../../context/UserContext.js';

const ProfileDropdown = ({className}) => {
	
	const { username, userId, isGuest } = useContext(UserContext);


	const handleProfile = () => {
		
	};

	return (
		<div class="navbar-dropdown">
                        <a className={className} onClick={handleProfile}>Profile</a>
                        <a className={className} onClick={() => logoutUser(isGuest)}>Logout</a>
                </div>
	);
}

export default ProfileDropdown;
