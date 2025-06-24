//App.jsx
import React from 'react';
import Header from '../../../shared_ui/header/Header.jsx';
import Body from './components/Body.jsx';

function App() {
  return (
	<section class='hero is-fullheight background-color-blue'>
		<Header  appName='Applied Jobs'/>

	  	<Body />
	</section>
)
}

export default App;
