//GuestInactivityWarning.jsx
import { React, useState, useEffect } from 'react';
import '../../../../static/css/shared/guest_inactivity_warning.css';
import { logoutGuestUser } from './utils/logoutGuestUser.js'; 

const GuestInactivityWarning = ({setShowGuestInactiveWarningCallback}) => {
	const [timeLeft, setTimeLeft] = useState(60); //user has 5 mins to click I'm still working button
	
	useEffect(() => {
		if (timeLeft <= 0) {
			logoutGuestUser();
			return;
		}
		const timerId = setInterval(() => {
			setTimeLeft(prevTime => prevTime - 1);
		}, 1000);

		return() => clearInterval(timerId); //When component is unmounted(destroyed), cleanup function runs clearInterval which stops the setInterval() from counting down
	}, [timeLeft]); //timeLeft is in dependency array meaning useEffect runs whenever timeLeft changes

	const handleConfirmActive = () =>{ //User clicks I'm still working button
		setShowGuestInactiveWarningCallback(false); //This destroys the warning component
	}

	return(
		<div className='inactivity-warning-overlay'>
			<div className='inactivity-warning-content'>
				<h3 className='inactivity-warning-text'>Are you still there?</h3>
				<p className='inactivity-warning-text'>You will be logged out due to inactivity in {timeLeft} seconds.</p>
				<p style={{color: 'red'}}>*All your saved data will be deleted*</p>
				<button onClick={handleConfirmActive} className="inactivity-warning-button">I'm still working</button>
			</div>
		</div>
	);
};

export default GuestInactivityWarning;
