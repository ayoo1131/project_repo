//App.jsx
import React from 'react';
import Header from '../../../shared_ui/header/Header.jsx';
import Body from './components/Body.jsx';

function App() {

	return (
		<section className = 'hero is-fullheight background-color-blue'>

  			<Header appName='Cover Letter' />

			<Body />

		</section>
	)
}

export default App;
