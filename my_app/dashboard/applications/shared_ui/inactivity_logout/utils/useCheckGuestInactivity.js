//useCheckGuestInactivity.js
import { useState, useRef, useCallback} from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { logoutGuestUser } from './logoutGuestUser.js'; 

const useCheckGuestInactivity = (setShowGuestInactiveWarning) => {
	const warningTime = 1 * 60 * 1000;

	const handleWarning = useCallback(() =>{
		console.log("Warning you are inactive");
		setShowGuestInactiveWarning(true);
	}, [setShowGuestInactiveWarning]);

	useIdleTimer({ // Will display the Inactivity Warning 1 mins before user is to be logged out
		onIdle: handleWarning,
		timeout: warningTime,
		throttle: 500,
	});

};

export default useCheckGuestInactivity;
