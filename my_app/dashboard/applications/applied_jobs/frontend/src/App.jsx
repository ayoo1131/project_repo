//App.jsx
import React, { useState, useEffect } from 'react';
import useCheckGuestInactivity from '../../../shared_ui/inactivity_logout/utils/useCheckGuestInactivity.js'; 
import GuestInactivityWarning from '../../../shared_ui/inactivity_logout/GuestInactivityWarning.jsx';
import Header from '../../../shared_ui/header/Header.jsx';
import Body from './components/Body.jsx';

function App() {
	const [showGuestInactiveWarning, setShowGuestInactiveWarning] = useState(false);
	const [userData, setUserData] = useState(null);

	useCheckGuestInactivity( userData?.is_guest, setShowGuestInactiveWarning);//custom hook to check if user is guest and if user is guest will start inactivity countdown on idle.

        useEffect(() => { //Get user information from api
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
        } ,[]); // empty dependency array means "run once and only once after first render"
	
	return (
		<section class='hero is-fullheight background-color-blue'>
			{showGuestInactiveWarning && //if user has been inactive for x amount of mins, will show warning  
				<GuestInactivityWarning setShowGuestInactiveWarningCallback={setShowGuestInactiveWarning}/>
			}
			{userData &&
				<Header  appName='Applied Jobs' userRoleProp={userData.role}/>
			}
			<Body />
		</section>
	);
};

export default App;
