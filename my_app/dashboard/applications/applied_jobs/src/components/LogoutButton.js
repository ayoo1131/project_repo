//LogoutButton.js
import React from 'react';

const LogoutButton = ({className}) => { //Defines a functional component called LogoutButton
	const handleLogout = () =>{
		window.location.href='/logout'
	};

	return (
		<button className={className} onClick={handleLogout}>
			Logout
		</button>
	);
};

export default LogoutButton;
