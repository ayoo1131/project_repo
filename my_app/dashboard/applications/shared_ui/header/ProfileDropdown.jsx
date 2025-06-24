//ProfileDropdown.jsx
import React, {useEffect, useState} from 'react';
import { logoutUser } from './utils/LogoutUser';

const ProfileDropdown = () => {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try{
                        	const response = await fetch('/api/user-info', {
                                	method: 'GET',
                                	headers: { 'Content-Type': 'application/json' },
                                	credentials: 'include', // Send cookies with request (important for Flask sessions)
                        	});

				const result = await response.json();

				if (response.ok){
					setUserData(result);
				}
                        	else{
                                	console.error('Server error: ', result.error);
                        	}
                	}

                	catch(error){
                        	console.error('Fetch error: ', error);
                	}
        	};

		fetchUserData();
	} ,[]); // 👈 empty dependency array means "run once on mount"

	const handleProfile = () => {
		
	};

	const handleLogout = ()=>{
		console.log(userData);
		logoutUser(userData.is_guest);

	};
	
	return (
		<div className="navbar-item has-dropdown is-hoverable">
			<a className="navbar-link gray-background  has-text-white">
				{userData?.username || ''}
			</a>
		
			<div className="navbar-dropdown">
				<a className="navbar-item gray-background has-text-white" onClick={handleProfile}>Profile</a>
				<a className="navbar-item gray-background has-text-white" onClick={handleLogout}>Logout</a>
			</div>
		</div>
	);
}

export default ProfileDropdown;
