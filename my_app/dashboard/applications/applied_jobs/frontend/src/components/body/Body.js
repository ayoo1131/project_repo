//Body.js

import React from 'react';
import UserInput from './UserInput.js';
import JobsList from './JobsList.js';

const Body = () =>{
	return(
		<section class='hero-body' style= {{paddingTop:'0'}}>
			<div class='container'>
				<UserInput />
				<div style={{ marginTop: '20px' }}> {/* Adjust this value to control spacing */}
          				<JobsList />
        			</div>
			</div>
		</section>
	);

};

export default Body;
