//GuestInactivityWarning.jsx
import { React, useState, useEffect } from 'react';
import '../../../../static/css/shared/guest_inactivity_warning.css';
import { logoutGuestUser } from './utils/logoutGuestUser.js'; 

const GuestInactivityWarning = ({setShowGuestInactiveWarningCallback}) => {
	const [timeLeft, setTimeLeft] = useState(60);
	const [userActive, setUserActive] = useState(false);
	
	useEffect(() => {
		console.log('Effect running with userActive:', userActive, 'timeLeft:', timeLeft);

		if (userActive){
			console.log('User Clicked button');
			return;
		}

		if (timeLeft <= 0) {
			console.log("timer reachex zero");
			logoutGuestUser();
			return;
		}
		const timerId = setInterval(() => {
			setTimeLeft(prevTime => prevTime - 1);
		}, 1000);

		return() => clearInterval(timerId);
	}, [timeLeft, userActive]);

	const handleConfirmActive = () =>{ //User clicks I'm still working button
		setUserActive(true);
		setShowGuestInactiveWarningCallback(false);
	}

	return(
		<div className="inactivity-warning-overlay">
			<div className="inactivity-warning-content">
				<h3>Are you still there?</h3>
				<p>You will be logged out due to inactivity in {timeLeft} seconds.</p>
				
				<button onClick={handleConfirmActive} className="inactivity-warning-button">I'm still working</button>
			</div>
		</div>
	);
};

export default GuestInactivityWarning;
