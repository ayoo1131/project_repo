//LogoutUser.js
export const logoutUser = (isGuest) =>{

	if (isGuest === 1){
		const confirmLogout = window.confirm("You are logged in as a guest. Are you sure you want to log out?");

		if  (confirmLogout){
			window.location.href = '/logout';
		} 
	}

	else{
		window.location.href = '/logout';
	}
};
