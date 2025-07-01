//DisplayPersonalInfo.jsx
import React, {useState} from 'react';
import {validateContact} from './utils/personal_info/ValidateContact.js';
import {insertContact} from './utils/personal_info/InsertContact.js'; 

const DisplayPersonalInfo = () => {
	const [userContact, setUserContact] = useState({name:'', email:'', phone:''});
	const [successfulSave, setSuccessfulSave] = useState(false);
	const [errors, setErrors] = useState({name: '', email: '', phone: ''});

	const handleDelete = () => {

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
                                                                        />
                                                                </div>
                                                                {errors.phone && <p className='help is-danger'>{errors.phone}</p>}
                                                        </div>
                                                </div>

						<div className='column is-narrow'>
							<div className='field is-grouped'>
								<div className='buttons'>
									<button className='button is-light is-small' onChange={handleGet}>Update</button>
									<button className='button is-light is-small' onChange={handleDelete}>Delete Saved Data</button>
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
