//useCheckGuestInactivity.js
import { useState, useRef, useCallback} from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { logoutGuestUser } from './logoutGuestUser.js'; 

const useCheckGuestInactivity = ( userIsGuest, setShowGuestInactiveWarning) => {
	const warningTime = 1 * 60 * 1000; //1 min x 60 seconds in a min. x 1000 milliseconds in 1 sec. = 60,000 milliseconds

	const handleWarning = useCallback(() =>{ //User is inactive. Show the warning message
		setShowGuestInactiveWarning(true);
	}, [setShowGuestInactiveWarning]);
	
	useIdleTimer({ // Will display the Inactivity Warning 1 mins before user is to be logged out
		onIdle: userIsGuest === 1 ? handleWarning : ()=>{}, //Ternary operation, if userIsGuest===1, then handleWarning(), else empty arrow function
		timeout: warningTime, //Will perform onIdle operation after warningTime milliseconds
		throttle: 500,
	});
	
};

export default useCheckGuestInactivity;
