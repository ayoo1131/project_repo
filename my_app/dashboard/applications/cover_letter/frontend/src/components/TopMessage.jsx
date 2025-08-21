//TopMessage.jsx
import React from 'react';

const TopMessage = ({messageProp}) => {
	const messageColorMap = { //A map that indicates message and message background color depending on success or failure
		'Contact Saved': 'green',
		'Contact Updated': 'green',
		'Contact Deleted': 'green',
		'Contact Save Error': 'red',
		'Contact Update Error': 'red',

		'Download Success': 'green',
		'Download Failed, Check Input': 'red'
	};
	const messageBackgroundColor = messageColorMap[messageProp];

	return(
		<div className='is-flex is-justify-content-center' style={{paddingTop:'0px'}}>
			<p className='contact-message' style={{backgroundColor: messageBackgroundColor}}>{messageProp}</p>
		</div>	
	);
};

export default TopMessage;
