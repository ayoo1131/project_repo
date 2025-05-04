//Profile.js
import React from 'react';

const ProfileDropdown = ({className}) => {
	const handleProfile = () => {
		
	};

	const handleLogout = () => {
		window.location.href='/logout'	
	};

	return (
		<div class="navbar-dropdown">
                        <a className={className} onClick={handleProfile}>Profile</a>
                        <a className={className} onClick={handleLogout}>Logout</a>
                </div>
	
	)
}

export default ProfileDropdown;
