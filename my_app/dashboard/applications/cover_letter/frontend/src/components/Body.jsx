//Body.jsx
import React, {useState, useEffect} from 'react';
import UploadPersonalInfo from './UploadPersonalInfo.jsx'; //Current user does not have contacts saved. Show inputs for contacts
import DisplayPersonalInfo from './DisplayPersonalInfo.jsx'; //Current user has contacts saved. Show user contacts
import MockDocument from './MockDocument.jsx';
import ClearButton from './ClearButton.jsx';
import DownloadButton from './DownloadButton';
import {getContact} from './utils/personal_info/GetContact.js'

const Body = () => {
	//Set userContact as null, then check api with useEffect to see if contact is set
	const [userContact, setUserContact] = useState({name:'', email:'', phone:'', social:'', extra:''});
	
	//set fillUserContact if user clicks fill button, callback updates state and shows in Mock Document input
	const [fillUserContact, setFillUserContact] = useState({name: '', email:'', phone:'', social:'', extra:''});
	const [isUpdating, setIsUpdating] = useState(false);

	//The states below will be used to fill-in the cover letter template when the user presses download button
	const [coverLetterInput, setCoverLetterInput] = useState(
		{name:'', email:'', phone:'', social:'', extra:'', date:'', paragraph1:'', paragraph2:''}
	);
	
	const [jobInfo, setJobInfo] = useState({company:'', position:''});//Used to make sure company and position inputs match
	const [isToday, setIsToday] = useState(false);

	useEffect(() => {
		getContact().then(data => {
			if (data[0] === undefined){
				setUserContact({name:'', email:'', phone:'', social:'', extra:''});
			}

			else{
				setUserContact(data[0]);
			}
		});
	},[]);

	const isContactNull = () => {
		//user social and extra can be '' as it is optional
		if(userContact.name!='' && userContact.email!='' && userContact.phone!=''){ 
			return false;
		}
		else{
			return true;
		}
	};

	return (
		<section className='hero-body is-align-items-start' style={{paddingTop: '10px'}} >
        		<div className="container is-flex is-flex-direction-column" style={{height:'100%'}}>
        			
				<div>
				{/*? Ternary Operator, if userContact is null show Upload info component. If userContact has value, show display info component*/}
					{(isContactNull() && !isUpdating) || (!isContactNull() && isUpdating)
					? 
					<UploadPersonalInfo
						userContactProp={userContact}
						setUserContactCallback={setUserContact}
						setIsUpdatingCallback={setIsUpdating}
					/>

					:
					<DisplayPersonalInfo 
						userContactProp={userContact} 
						setUserContactCallback={setUserContact} 
						setIsUpdatingCallback={setIsUpdating}
						setFillUserContactCallback = {setFillUserContact}
					/>}
				</div>		

				<div style={{flexGrow:1, overflowY:'auto', maxHeight:'60vh', paddingBottom:'10px'}}>
					<MockDocument 
						fillUserContactProp={fillUserContact}
						coverLetterInputProp = {coverLetterInput}
						jobInfoProp = {jobInfo}
						setJobInfoCallback = {setJobInfo}
						setCoverLetterInputCallback = {setCoverLetterInput}
						isTodayProp = {isToday}
						setIsTodayCallback = {setIsToday}
					/>
				</div>
			
				<div className='is-flex is-justify-content-center' style={{paddingTop:'10px'}}>
                                	<div className='field is-grouped' style={{gap:'5px'}}>
                                        	<div className='control'>
                                        		<ClearButton 
								coverLetterInputProp = {coverLetterInput} 
								setCoverLetterInputCallback = {setCoverLetterInput}
								setFillUserContactCallback = {setFillUserContact}
								setJobInfoCallback = {setJobInfo}
								setIsTodayCallback = {setIsToday}
								isTodayProp = {isToday}
							/>
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
