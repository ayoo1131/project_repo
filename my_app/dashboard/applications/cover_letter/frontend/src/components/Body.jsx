//Body.jsx
import React, {useState, useEffect} from 'react';
import UploadPersonalInfo from './UploadPersonalInfo.jsx'; //Current user does not have contacts saved. Show inputs for contacts
import DisplayPersonalInfo from './DisplayPersonalInfo.jsx'; //Current user has contacts saved. Show user contacts
import MockDocument from './MockDocument.jsx';
import ClearButton from './ClearButton.jsx';
import DownloadButton from './DownloadButton';
import {getContact} from './utils/personal_info/GetContact.js'

const Body = () => {
	const [userContact, setUserContact] = useState(null); //Initially set userContact as null, then check api with useEffect to see if contact is set
		
	useEffect(() => {
		getContact().then(data => {
			console.log(data);
		});
	},[]);

	return (
		<section className='hero-body is-align-items-start' style={{paddingTop: '10px'}} >
        		<div className="container is-flex is-flex-direction-column" style={{height:'100%'}}>
        			<UploadPersonalInfo />
				
				<div style={{flexGrow:1, overflowY:'auto', maxHeight:'60vh', paddingBottom:'10px'}}>
					<MockDocument />
				</div>
				
				<div className='is-flex is-justify-content-center' style={{paddingTop:'10px'}}>
					<div className='field is-grouped' style={{gap:'5px'}}>
						<div className='control'>
							<ClearButton />
						</div>
						<div className='control'>
							<DownloadButton />
						</div>
					</div>
				</div>
			</div>
    		</section>
	);
};


export default Body;
