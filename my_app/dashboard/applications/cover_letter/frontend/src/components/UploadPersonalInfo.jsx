//UploadPersonalInfo.jsx
import React, {useState} from 'react';
import {validateContact} from './utils/personal_info/ValidateContact.js';
import {insertContact} from './utils/personal_info/InsertContact.js'; 

const UploadPersonalInfo = () => {
	const [userContact, setUserContact] = useState({name:'', email:'', phone:''});
	const [successfulSave, setSuccessfulSave] = useState(false);
	const [errors, setErrors] = useState({name: '', email: '', phone: ''});

	const handleSave = async(e) =>{
		e.preventDefault(); //button is in a <form> tag and triggers a page reload. preventDefault() is method on event object and tells browser not to reload
		
		//Validate User Contact
		const errors = validateContact(userContact);
		setErrors(errors);

		if (Object.keys(errors).length === 0){
			insertContact(userContact);
		}
	};

	return (
		<div className='container has-text-centered' style={{paddingBottom: '10px'}}>
			<form id='coverLetterForm' className='box user-input-top-bottom-margins has-background-white'>
				{successfulSave && <p className='has-text-success'>Personal Details Successfully Saved</p>}
				<div className='form-section'>
					<p className='has-text-left cover-letter-text' style={{paddingBottom:'2px'}}>Fill in the following fields to save your details for future use. If you prefer not to have your personal info saved, fill out the cover letter template manually.</p>

					<div className='columns is-mobile'>
						<div className='column'>
							<div className='field is-small'>
								<div className='control'>
									<input
										className="input is-small document-input-word" 
										type="text" 
										placeholder="Name"
										value={userContact.name}
										onChange={(e) => setUserContact({...userContact, name:e.target.value })}
									/>
								</div>
								{errors.name && <p className='help is-danger'>{errors.name}</p>}
							</div>
						</div>

						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
                                                                        <input
                                                                                className="input is-small document-input-word"
                                                                                type="text"
                                                                                placeholder="email"
										value={userContact.email}
										onChange={(e) => setUserContact({...userContact, email:e.target.value})}
                                                                        />
                                                                </div>
                                                                {errors.email && <p className='help is-danger'>{errors.email}</p>}
                                                        </div>
                                                </div>

						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
                                                                        <input
                                                                                className="input is-small document-input-word"
                                                                               	type="text"
                                                                                placeholder="Phone #"
										value={userContact.phone}
										onChange={(e) => setUserContact({...userContact, phone:e.target.value})}
                                                                        />
                                                                </div>
                                                                {errors.phone && <p className='help is-danger'>{errors.phone}</p>}
                                                        </div>
                                                </div>

						<div className='column is-narrow'>
							<div className='field is-grouped'>
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
