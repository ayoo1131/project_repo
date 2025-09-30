//Body.jsx
import React, {useState, useEffect} from 'react';
import {getContact} from './utils/personal_info/GetContact.js';
import TopMessage from './TopMessage.jsx';
import UploadPersonalInfo from './UploadPersonalInfo.jsx'; //Current user does not have contacts saved. Show inputs for contacts
import DisplayPersonalInfo from './DisplayPersonalInfo.jsx'; //Current user has contacts saved. Show user contacts
import MockDocument from './MockDocument.jsx';
import ClearButton from './ClearButton.jsx';
import DownloadButton from './DownloadButton.jsx';
import DeleteContactWarning from './DeleteContactWarning.jsx';

const Body = () => {
	//JavaScript Object, set properties as blank, then check api with useEffect to see if contact is set
	const [userContact, setUserContact] = useState({name:'', email:'', phone:'', social:'', extra:''});
	
	//JavaScript Object, set fillUserContact if user clicks fill button, callback updates state and shows in MockDocument input
	const [fillUserContact, setFillUserContact] = useState({name: '', email:'', phone:'', social:'', extra:''});
	
	//Boolean to track if user has saved contact and has clicked the update button
	const [isUpdating, setIsUpdating] = useState(false);

	//String to track if contact message is saved, updated, deleted, or error
	const [contactMessage, setContactMessage] = useState(null); 

	//String to track if error exists in Mock Document input fields
	const [downloadMessage, setDownloadMessage] = useState(null);

	//JavaScript Object. If Download button is pressed, check MockDocument input values 
	const [downloadErrors, setDownloadErrors] = useState({name:'', email:'', phone:'', social:'', extra:'', company:'', position:''});

	//JavaScript Object. Used to fill-in the cover letter template when the user presses download button
	const [coverLetterInput, setCoverLetterInput] = useState(
		{name:'', email:'', phone:'', social:'', extra:'', date:'', company:'', position:'', paragraph1:'', paragraph2:'', paragraph3:''}
	);

	//JavaScript Object, Used to make sure both sets of company and position input tags in Mock Document match the other.
	const [jobInfo, setJobInfo] = useState({company:'', position:''});

	//Boolean, if user clicks checkbox for today, set true.
	const [isToday, setIsToday] = useState(false);

	//Boolean, If the user clicks delete button for User Contact, set true.
	const [showContactDeleteWarning, setShowContactDeleteWarning] = useState(false);

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
				{/*Ternary Operator, Only display message if user clicks delete contact button*/}		
				{showContactDeleteWarning &&
				<DeleteContactWarning 
					setShowContactDeleteWarningCallback = {setShowContactDeleteWarning}
					setUserContactCallback = {setUserContact}
					setContactMessageCallback = {setContactMessage}
					setDownloadMessageCallback = {setDownloadMessage}
				/>
				}
					
				{/*Ternary Operator that only displays if contactMessage has been set.*/}
				{contactMessage && <TopMessage messageProp = {contactMessage}/> }

				{/*Ternary Operator that displays if downloadMessage is set*/}
				{downloadMessage && <TopMessage messageProp = {downloadMessage}/> }

				{/*Ternary Operator, if userContact null or isUpdating show UploadPersonalInfo. If userContact set, show DisplayPersonaInfo*/}
				{(isContactNull() && !isUpdating) || (!isContactNull() && isUpdating) ? 
				<UploadPersonalInfo
					userContactProp = {userContact}
					setUserContactCallback = {setUserContact}
					setIsUpdatingCallback = {setIsUpdating}
					setContactMessageCallback = {setContactMessage}
					setDownloadMessageCallback = {setDownloadMessage}
				/>
				:
				<DisplayPersonalInfo 
					userContactProp = {userContact}
					coverLetterInputProp = {coverLetterInput}
					setUserContactCallback = {setUserContact} 
					setIsUpdatingCallback = {setIsUpdating}
					setFillUserContactCallback = {setFillUserContact}
					setCoverLetterInputCallback = {setCoverLetterInput}
					setContactMessageCallback = {setContactMessage}
					setDownloadMessageCallback = {setDownloadMessage}
					setShowContactDeleteWarningCallback = {setShowContactDeleteWarning}
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
							setContactMessageCallback = {setContactMessage}
							setDownloadErrorsCallback = {setDownloadErrors}
						/> 
                                 	</div>
                        	</div>
			</div>
    		</section>
	);
};


export default Body;
