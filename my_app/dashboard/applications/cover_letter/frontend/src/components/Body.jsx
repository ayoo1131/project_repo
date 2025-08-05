//Body.jsx
import React, {useState, useEffect} from 'react';
import TopMessage from './TopMessage.jsx';
import UploadPersonalInfo from './UploadPersonalInfo.jsx'; //Current user does not have contacts saved. Show inputs for contacts
import DisplayPersonalInfo from './DisplayPersonalInfo.jsx'; //Current user has contacts saved. Show user contacts
import MockDocument from './MockDocument.jsx';
import ClearButton from './ClearButton.jsx';
import DownloadButton from './DownloadButton.jsx';
import {getContact} from './utils/personal_info/GetContact.js'

const Body = () => {
	//Set userContact as null, then check api with useEffect to see if contact is set
	const [userContact, setUserContact] = useState({name:'', email:'', phone:'', social:'', extra:''});
	
	//set fillUserContact if user clicks fill button, callback updates state and shows in Mock Document input
	const [fillUserContact, setFillUserContact] = useState({name: '', email:'', phone:'', social:'', extra:''});
	const [isUpdating, setIsUpdating] = useState(false);
	const [contactMessage, setContactMessage] = useState(null); //Track if contact message is saved, updated, deleted, or error
	const [downloadMessage, setDownloadMessage] = useState(null); //Track if error exists in Mock Document input fields
	const [downloadErrors, setDownloadErrors] = useState({name:'', email:'', phone:'', social:'', extra:'', company:'', position:''}); //JavaScript Object

	const [coverLetterInput, setCoverLetterInput] = useState( // used to fill-in the cover letter template when the user presses download button
		{name:'', email:'', phone:'', social:'', extra:'', date:'', company:'', position:'', paragraph1:'', paragraph2:''}
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
				{/*Ternary Operator that only displays if contactMessage has been set.*/}
				{contactMessage && <TopMessage messageProp = {contactMessage}/> }

				{/*Ternary Operator that displays if downloadMessage is set*/}
				{downloadMessage && <TopMessage messageProp = {downloadMessage}/> }

				{/*Ternary Operator, if userContact null show Upload component. If userContact not null, show display component*/}
				{(isContactNull() && !isUpdating) || (!isContactNull() && isUpdating) ? 
				<UploadPersonalInfo
					userContactProp = {userContact}
					setUserContactCallback = {setUserContact}
					setIsUpdatingCallback = {setIsUpdating}
					setContactMessageCallback = {setContactMessage}
				/>
				:
				<DisplayPersonalInfo 
					userContactProp = {userContact} 
					setUserContactCallback = {setUserContact} 
					setIsUpdatingCallback = {setIsUpdating}
					setFillUserContactCallback = {setFillUserContact}
					setCoverLetterInputCallback = {setCoverLetterInput}
					setContactMessageCallback = {setContactMessage}
				/>}

				<MockDocument 
					fillUserContactProp={fillUserContact}
					coverLetterInputProp = {coverLetterInput}
					jobInfoProp = {jobInfo}
					downloadErrorsProp = {downloadErrors}
					setJobInfoCallback = {setJobInfo}
					setCoverLetterInputCallback = {setCoverLetterInput}
					isTodayProp = {isToday}
					setIsTodayCallback = {setIsToday}
				/>
			
				<div className='is-flex is-justify-content-center' style={{paddingTop:'2px'}}>
                                	<div className='field is-grouped' style={{gap:'5px'}}>
                                        	<ClearButton 
							coverLetterInputProp = {coverLetterInput} 
							isTodayProp = {isToday}
							setCoverLetterInputCallback = {setCoverLetterInput}
							setFillUserContactCallback = {setFillUserContact}
							setJobInfoCallback = {setJobInfo}
							setIsTodayCallback = {setIsToday}
							setContactMessageCallback = {setContactMessage}
							setDownloadMessageCallback = {setDownloadMessage}
							setDownloadErrorsCallback = {setDownloadErrors}
						/>

                                       		<DownloadButton 
							coverLetterInputProp = {coverLetterInput}
							setDownloadMessageCallback = {setDownloadMessage}
							setDownloadErrorsCallback = {setDownloadErrors}
						/> 
                                 	</div>
                        	</div>
			</div>
    		</section>
	);
};


export default Body;
