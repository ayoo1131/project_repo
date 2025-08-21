//UploadPersonalInfo.jsx
import React, {useState} from 'react';
import {validateContact} from './utils/personal_info/ValidateContact.js';
import {insertContact} from './utils/personal_info/InsertContact.js'; 
import {updateContact} from './utils/personal_info/UpdateContact.js';

const UploadPersonalInfo = ({
	userContactProp, 
	setUserContactCallback, 
	setIsUpdatingCallback, 
	setContactMessageCallback,
	setDownloadMessageCallback}) => {

	const [userContact, setUserContact] = useState({
		name: userContactProp.name,
		email: userContactProp.email, 
		phone: userContactProp.phone,
		social: userContactProp.social,
		extra: userContactProp.extra
	}); //JavaScript Object

	const [errors, setErrors] = useState({name: '', email: '', phone: '', social: '', extra: ''}); //JavaScript Object
	const [successfulSave, setSuccessfulSave] = useState(false);
	const [successfulAdd, setSuccessfulAdd] = useState(false);

	const isContactPropNull = () => {
		if (
			userContactProp.name === '' &&
			userContactProp.email === '' &&
			userContactProp.phone === '' &&
			userContactProp.social === '' &&
			userContactProp.extra === '')
		{
			return true;
		}

		else{
			return false;
		}
	}; 

	const handleSave = async(e) =>{
		e.preventDefault(); //button is in a <form> tag and triggers a page reload. preventDefault() is method on event object and tells browser not to reload
		
		//Validate User Contact
		const errors = validateContact(userContact);
		setErrors(errors);
		
		setDownloadMessageCallback(null); //Clear Download message from top of screen if there is one
		if (Object.keys(errors).length === 0){ //No errors in user input contact.
			if (isContactPropNull()){ //There is no saved contact, create a new one for the user
				insertContact(userContact);
				setContactMessageCallback('Contact Saved');
			}
			
			else{//Contact exists. Update the existing contact
				updateContact(userContactProp, userContact);
				setContactMessageCallback('Contact Updated');
			}
			setUserContactCallback({
				name: userContact.name,
				email:userContact.email,
				phone: userContact.phone,
				social: userContact.social, 
				extra:userContact.extra
			});
			setIsUpdatingCallback(false);
		}

		else { //There is an error with the user input contact.
			if (isContactPropNull()){ 
				setContactMessageCallback('Contact Save Error');
			}
			else{
				setContactMessageCallback('Contact Update Error');
			}
		}
	};

	return (
		<div className='container has-text-centered' style={{paddingBottom: '8px'}}>
			<form id='coverLetterForm' className='box user-input-top-bottom-margins has-background-white'>
				<div className='form-section'>
					<p className='has-text-left cover-letter-text' style={{paddingBottom:'2px'}}>Fill in the following fields to save your details for future use. If you prefer not to have your personal info saved, fill out the cover letter template manually.</p>

					<div className='columns'>
						<div className='column is-2' style={{alignItems: 'center'}}>
						{/*field is contrainer for form tag, is-group for side-by side*/}
							<div className='field is-small'>
								<div className='control'> {/*control wraps single form control with styling/spacing*/}
									<div className='field is-grouped is-small column-bottom-margin'>
										<p className='cover-letter-text upload-label-fixed'>Name: </p>
										<input
											className='input upload-input-contact'
											type='text'
											placeholder='Name'
											value={userContact?.name || ''}
											onChange={(e) => setUserContact({...userContact, name:e.target.value })}
										/> 
									</div>
								</div>
								{errors.name && <p className='error-message-user-input'>{errors.name}</p>}
							</div>
						</div>	
						
						<div className='column is-2'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
                                                                        <div className='field is-grouped is-small column-bottom-margin'>
                                                                                <p className='cover-letter-text upload-label-fixed'>Email:</p>
                                                                                <input
                                                                                        className='input upload-input-contact'
                                                                                        type='text'
                                                                                        placeholder='Email'
											value = {userContact?.email || ''}
                                                					onChange={(e) => setUserContact({...userContact, email:e.target.value })}
										/>
									</div>
								</div>
								{errors.email && <p className='error-message-user-input'>{errors.email}</p>}
							</div>
						</div>
						
						<div className='column is-2'>
							<div className='field is-small'>
								<div className='control'>
									<div className='field is-grouped is-small column-bottom-margin'>
										<p className='cover-letter-text upload-label-fixed'>Phone:</p>
										<input
        	        		                		                className='input upload-input-contact'
        		        	                                		type='text'
	        			        	                                placeholder='Phone'
											value={userContact?.phone || ''}
											onChange={(e) => setUserContact({...userContact, phone:e.target.value })}
										/>				
									</div>
								</div>
								{errors.phone && <p className='error-message-user-input'>{errors.phone}</p>}
							</div>
						</div>

						<div className='column is-3'>
							<div className='field is-small'>
								<div className='control'>
									<div className='field is-grouped is-small column-bottom-margin'>
										<p className='cover-letter-text upload-label-fixed'>Social Media:</p>
										<input
											className="input upload-input-contact"
											type="text"
											placeholder="(optional)"
											value={userContact?.social || ''}
											onChange={(e) => setUserContact({...userContact, social:e.target.value})}
										/>
									</div>
								</div>
								{errors.social && <p className='error-message-user-input'>{errors.social}</p>}
							</div>
						</div>
						
						<div className='column is-2'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
                                                                        <div className='field is-grouped is-small column-bottom-margin'>
                                                                                <p className='cover-letter-text upload-label-fixed'>Extra:</p>
                                                                                <input
                                                                                        className="input upload-input-contact"
                                                                                        type="text"
                                                                                        placeholder="(optional)"
                                                                                        value={userContact?.extra || ''}
                                                                                        onChange={(e) => setUserContact({...userContact, extra:e.target.value})}
                                                                                />
                                                                        </div>
                                                                </div>
								{errors.extra && <p className='error-message-user-input'>{errors.extra}</p>}
                                                        </div>
                                                </div>
						
						<div className='column is-1'>
							<div className='field'>
								<div className='buttons'>
									<button className='button is-dark is-small' onClick={handleSave}>Save</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UploadPersonalInfo;
