//DisplayPersonalInfo.jsx
import React, {useState} from 'react';
import {validateContact} from './utils/personal_info/ValidateContact.js';
import {insertContact} from './utils/personal_info/InsertContact.js'; 

const DisplayPersonalInfo = ({displayPersonalInfoCallBack}) => {
	const [successfulSave, setSuccessfulSave] = useState(false);
	const [errors, setErrors] = useState({name: '', email: '', phone: ''});

	const handleDelete = () => {

	};

	const handleUpdate = () => {

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
									<p className='has-text-left cover-letter-text'> Name: {displayPersonalInfoCallBack.name}</p>
								</div>
							</div>
						</div>

						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
									<p className='has-text-left cover-letter-text'>Email: {displayPersonalInfoCallBack.email}</p>
                                                                </div>
                                                        </div>
                                                </div>


						<div className='column'>
                                                        <div className='field is-small'>
                                                                <div className='control'>
									<p className='has-text-left cover-letter-text'>Phone: {displayPersonalInfoCallBack.phone}</p>
                                                                </div>
                                                        </div>
                                                </div>

						<div className='column is-narrow'>
							<div className='field is-grouped'>
								<div className='buttons'>
									<button className='button is-light is-small' onChange={handleUpdate}>Update</button>
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
