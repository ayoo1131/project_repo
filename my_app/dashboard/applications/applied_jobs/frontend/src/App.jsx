//App.jsx
import React, {useState} from 'react';
import useCheckGuestInactivity from '../../../shared_ui/inactivity_logout/utils/useCheckGuestInactivity.js'; 
import GuestInactivityWarning from '../../../shared_ui/inactivity_logout/GuestInactivityWarning.jsx';
import Header from '../../../shared_ui/header/Header.jsx';
import Body from './components/Body.jsx';

function App() {
	const [showGuestInactiveWarning, setShowGuestInactiveWarning] = useState(false);

	const logoutGuestUserCallback = () => {
		console.log('Logging out User');
	};

	useCheckGuestInactivity(setShowGuestInactiveWarning);

	return (
		<section class='hero is-fullheight background-color-blue'>
			{showGuestInactiveWarning && 
				<GuestInactivityWarning setShowGuestInactiveWarningCallback={setShowGuestInactiveWarning}/>
			}
			<Header  appName='Applied Jobs'/>
			<Body />
		</section>
	);
};

export default App;
