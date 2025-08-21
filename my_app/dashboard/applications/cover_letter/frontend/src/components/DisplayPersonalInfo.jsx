//DisplayPersonalInfo.jsx
import React, {useState} from 'react';
import {deleteContact} from './utils/personal_info/DeleteContact.js';
import {updateContact} from './utils/personal_info/UpdateContact.js'; 

const DisplayPersonalInfo = ({
		userContactProp,
		coverLetterInputProp,
		setUserContactCallback,
		setIsUpdatingCallback,
		setFillUserContactCallback,
		setCoverLetterInputCallback,
		setContactMessageCallback,
		setDownloadMessageCallback}) => {
	
	const [successfulSave, setSuccessfulSave] = useState(false);
	const [errors, setErrors] = useState({name: '', email: '', phone: ''});

	const handleFill = (e) => {
		e.preventDefault();
		setFillUserContactCallback({
			name: userContactProp.name,
			email: userContactProp.email,
			phone: userContactProp.phone,
			social: userContactProp.social,
			extra: userContactProp.extra
		});
		
		setCoverLetterInputCallback({...coverLetterInputProp,
			name: userContactProp.name,
			email: userContactProp.email,
			phone: userContactProp.phone,
			social: userContactProp.social,
			extra: userContactProp.extra
		});
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		deleteContact();
		setUserContactCallback({name:'', email:'', phone:'', social:'', extra:''});
		setContactMessageCallback('Contact Deleted');
		setDownloadMessageCallback(null);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setIsUpdatingCallback(true);
	};

	return (
		<div className='container has-text-centered' style={{paddingBottom: '10px'}}>
			<form id='coverLetterForm' className='box user-input-top-bottom-margins has-background-white'>
				{successfulSave && <p className='has-text-success'>Personal Details Successfully Saved</p>}
				<div className='form-section'>
					<p className='has-text-left cover-letter-text' style={{paddingBottom:'2px'}}> </p>

					<div className='columns is-mobile'>
						<div className='column'>
							<div className='field is-small'>
								<div className='control'>
									<p className='has-text-left cover-letter-text'> Name: {userContactProp.name}</p>
								</div>
							</div>
						</div>

						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
									<p className='has-text-left cover-letter-text'>Email: {userContactProp.email}</p>
                                                                </div>
                                                        </div>
                                                </div>

						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
									<p className='has-text-left cover-letter-text'>Phone: {userContactProp.phone}</p>
                                                                </div>
                                                        </div>
                                                </div>
						
						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
                                                                        <p className='has-text-left cover-letter-text'>Social: {userContactProp.social}</p>
                                                                </div>
                                                        </div>
                                                </div>

						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
                                                                        <p className='has-text-left cover-letter-text'>Extra: {userContactProp.extra}</p>
                                                                </div>
                                                        </div>
                                                </div>

						<div className='column is-narrow'>
							<div className='field is-grouped'>
								<div className='buttons'>
									<button className='button is-light is-small' onClick={handleFill}>Fill</button>
									<button className='button is-light is-small' onClick={handleUpdate}>Update</button>
									<button className='button is-light is-small' onClick={handleDelete}>Delete</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default DisplayPersonalInfo;
