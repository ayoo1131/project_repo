//Body.js

import React from 'react';
import UserInput from './UserInput.js';
import JobsList from './JobsList.js';

const Body = () =>{
	return(
		<section class='hero-body is-align-items-start' style= {{paddingTop:'0'}}>
			<div class='container has-text-centered'>
				<section class='hero-body is-align-items-start'>
					<UserInput />
				</section>
			</div>
		</section>
	);

};

export default Body;
