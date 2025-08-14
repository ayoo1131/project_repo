//UploadPersonalInfo.jsx
import React, {useState} from 'react';
import {validateContact} from './utils/personal_info/ValidateContact.js';
import {insertContact} from './utils/personal_info/InsertContact.js'; 
import {updateContact} from './utils/personal_info/UpdateContact.js';

const UploadPersonalInfo = ({userContactProp, setUserContactCallback, setIsUpdatingCallback, setContactMessageCallback}) => {
	const [userContact, setUserContact] = useState({
		name: userContactProp.name,
		email: userContactProp.email, 
		phone: userContactProp.phone,
		social: userContactProp.social,
		extra: userContactProp.extra
	}); //JavaScript Object
	
	const [successfulSave, setSuccessfulSave] = useState(false);
	const [errors, setErrors] = useState({name: '', email: '', phone: '', social: '', extra: ''}); //JavaScript Object
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

		else {
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

					<div className='columns is-mobile is-multiline'>
						<div className='column has-left-border has-right-border is-full-mobile is-6-tablet is-2-desktop'>
							<div className='field is-grouped is-small column-bottom-margin' style={{gap: '0.25rem'}}>
								<div className='control upload-label-fixed'>
									<p className='cover-letter-text'>Name: </p>
								</div>
								<div className='control upload-input-resize'>
									<input
										className="input upload-input-contact" 
										type="text" 
										placeholder="Name"
										value={userContact?.name || ''}
										onChange={(e) => setUserContact({...userContact, name:e.target.value })}
									/>
								</div>
							</div>
							{errors.name && <p className='error-message-user-input'>{errors.name}</p>}
						</div>

						<div className='column has-left-border has-right-border is-full-mobile is-6-tablet is-2-desktop'>
                                                        <div className='field is-grouped column-bottom-margin' style={{gap: '0.25rem'}}>
								<div className='control upload-label-fixed'>
									<p className='cover-letter-text'>Email: </p>
								</div>
                                                                <div className='control upload-input-resize'>
                                                                        <input
                                                                                className="input upload-input-contact"
                                                                                type="text"
                                                                                placeholder="email"
										value={userContact?.email || ''}
										onChange={(e) => setUserContact({...userContact, email:e.target.value})}
                                                                        />
                                                                </div>
                                                        </div>
							{errors.email && <p className='error-message-user-input'>{errors.email}</p>}
                                                </div>

						<div className='column is-full-mobile is-6-tablet is-2-desktop'>
                                                        <div className='field is-grouped column-bottom-margin' style={{gap: '0.25rem'}}>
								<div className='control upload-label-fixed'>
									<p className='cover-letter-text'>Phone: </p>
								</div>
                                                                <div className='control upload-input-resize'>
                                                                        <input
                                                                                className="input upload-input-contact"
                                                                               	type="text"
                                                                                placeholder="Phone #"
										value={userContact?.phone || ''}
										onChange={(e) => setUserContact({...userContact, phone:e.target.value})}
                                                                        />
                                                                </div>
                                                        </div>
							{errors.phone && <p className='error-message-user-input'>{errors.phone}</p>}
                                                </div>

						<div className='column is-full-mobile is-6-tablet is-3-desktop'>
                                                        <div className='field is-grouped column-bottom-margin' style={{gap: '0.25rem'}}>
                                                                <div className='control upload-label-fixed'>
                                                                        <p className='cover-letter-text'>Social Media: </p>
                                                                </div>
                                                                <div className='control upload-input-resize'>
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

						<div className='column is-full-mobile is-6-tablet is-2-desktop'>
                                                        <div className='field is-grouped column-bottom-margin' style={{gap: '0.25rem'}}>
                                                                <div className='control upload-label-fixed'>
                                                                        <p className='cover-letter-text'>Extra: </p>
                                                                </div>
                                                                <div className='control upload-input-resize'>
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
