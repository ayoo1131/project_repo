//App.js
import React, {useContext} from 'react';
import Header from './components/header/Header.js';
import Body from './components/body/Body.js';

import { UserProvider, UserContext } from './context/UserContext';

function Username() {
	const { username } = useContext(UserContext);

	return <>{username}</>;
}

function App() {
	return (
		<section class="hero is-fullheight">
			<Header / >

			<Body />
		</section>
	);
}

export default App;
