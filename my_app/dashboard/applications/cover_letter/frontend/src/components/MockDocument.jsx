//MockDocument.jsx
import React, {useState, useEffect} from 'react';
import {setToday} from './utils/mock_document/SetToday.js' 

const MockDocument = ({
	fillUserContactProp,
	coverLetterInputProp,
	jobInfoProp,
	isTodayProp,
	downloadErrorsProp,
	setJobInfoCallback,
	setCoverLetterInputCallback,
	setIsTodayCallback}) => {
	
	//On startup, saved user contact in fillUserContactProp is set. allows multiple fill button presses
	const [userContact, setUserContact] = useState(fillUserContactProp);

	const handleToday = (e) => {
		const useToday = e.target.checked;

		if (useToday){
			const todayDate = new Date().toLocaleDateString();
			const formatDate = setToday(todayDate);
			setCoverLetterInputCallback({...coverLetterInputProp, date: formatDate});
			setIsTodayCallback(true);
		}

		else{
			setCoverLetterInputCallback({...coverLetterInputProp, date: ''});
                        setIsTodayCallback(false);
		}
	};

	useEffect(() => {
		setUserContact(fillUserContactProp);
	}, [fillUserContactProp]);//On startup set saved contact in local state.

	return (
		<div className='box is-fullheight has-background-white' style={{flexGrow:1, overflowY:'auto', maxHeight:'65vh', paddingBottom:'0px'}}>
			{/*---------------------------------------------------Header-------------------------------------------------*/}
			<div className='container has-text-centered'>
				<div className='field is-small is-justify-content-center'>
					<div className='control'>
						<input 
							className='input is-small document-input-word'
							type='text'
							placeholder='Name'
							value = {userContact.name}
							onChange={(e) => { 
								setUserContact({...userContact, name: e.target.value});
								setCoverLetterInputCallback({...coverLetterInputProp, name:e.target.value});
							}}
						/>
					</div>
					<div className='control' style={{display: 'flex', justifyContent:'center', paddingBottom:'5px', paddingTop:'5px'}}>
						{downloadErrorsProp.name && <p className='error-message-user-input'>{downloadErrorsProp.name}</p>}
					</div>
				</div>
			</div>
			
			<div className='columns'>
				<div className='column is-2'>
				</div>
				
				<div className='column is-2' style={{alignItems: 'center'}}>
					{/*field is contrainer for form tag, is-group for side-by side*/}
					<div className='field is-small'>
						<div className='control'> {/*control wraps single form control with styling/spacing*/}
							<input
								className='input is-small document-input-contact'
								type='text'
								placeholder='Email'
								value = {userContact.email}
								onChange={(e)=> {
									setUserContact({...userContact, email: e.target.value});
									setCoverLetterInputCallback({...coverLetterInputProp, email:e.target.value});
								}}
							/> 
						</div>
						<div className='control' style={{display: 'flex', justifyContent:'center', marginTop:'5px'}}>
							{downloadErrorsProp.email && <p className='error-message-user-input'>{downloadErrorsProp.email}</p>}
						</div>
					</div>
				</div>	
				
				<div className='column is-2'>
					<div className='field is-small'>
						<div className='control'>
							<input
                	                	                className='input is-small document-input-contact'
        	                                        	type='text'
	        	                                        placeholder='Phone No.'
								value = {userContact.phone}
								onChange = {(e) => {
									setUserContact({...userContact, phone: e.target.value});
									setCoverLetterInputCallback({...coverLetterInputProp, phone: e.target.value});
								}}
		                                        />				
						</div>

						<div className='control' style={{display: 'flex', justifyContent:'center', marginTop:'5px'}}>
							{downloadErrorsProp.phone && <p className='error-message-user-input'>{downloadErrorsProp.phone}</p>}
						</div>
					</div>
				</div>	

				<div className='column is-2'>
                                        <div className='field is-small'>
						<div className='control'>
	                	                        <input
        	                	                        className='input is-small document-input-contact'
                	                	                type='text'
                        	                	        placeholder='Social Media (optional)'
                                	                	value = {userContact.social}
								onChange = {(e) => {
									setUserContact({...userContact, social: e.target.value});
									setCoverLetterInputCallback({...coverLetterInputProp, social: e.target.value});
								}}
        	                	                />
                	                	</div>

						<div className='control' style={{display: 'flex', justifyContent:'center', marginTop:'5px'}}>
							{downloadErrorsProp.social && <p className='error-message-user-input'>{downloadErrorsProp.social}</p>}
                                                </div>
					</div>
				</div>

				<div className='column is-2'>
                                        <div className='field is-small'>
						<div className='control'>
                		                        <input
                                		                className='input is-small document-input-contact'
		                                                type='text'
                		                                placeholder='Extra (optional)'
                                		                value = {userContact.extra}
								onChange = {(e) => {
									setUserContact({...userContact, extra: e.target.value});
									setCoverLetterInputCallback({...coverLetterInputProp, extra: e.target.value});
								}}
		                                        />
                		                </div>
						<div className='control' style={{display: 'flex', justifyContent:'center', marginTop:'5px'}}>
							{downloadErrorsProp.extra && <p className='error-message-user-input'>{downloadErrorsProp.extra}</p>}
                                        	</div>
					</div>
				</div>
				
				<div className='column is-2'>
				</div>
			</div>

			{/*-----------------------------------------Body-----------------------------------------------*/}
			<div style={{display: 'inline-flex',alignItems: 'baseline',flexWrap: 'wrap'}}>	
				<p className='cover-letter-text'>Dear</p>
				<div className='document-input-error-block-sentence'> {/* Input + error container */}
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Company'
						value = {jobInfoProp.company}
						onChange = {(e) => {
							setJobInfoCallback({...jobInfoProp, company: e.target.value});
							setCoverLetterInputCallback({...coverLetterInputProp, company: e.target.value});
						}}
					/> 
					{downloadErrorsProp.company && <p className='document-input-error-message'>{downloadErrorsProp.company}</p>}
				</div>
				<p className='cover-letter-text'>Hiring Manager,</p>
			</div>
	
			<div className='is-small'>
				<p>&nbsp;</p>		
			</div>

			<div style={{display: 'inline-flex',alignItems: 'baseline',flexWrap: 'wrap'}}>
				<p className='cover-letter-text'>I am excited to have the opportunity to apply to</p>
				
				<div className='document-input-error-block-sentence'> {/* Input + error container */}
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Company'
						value = {jobInfoProp.company}
						onChange = {(e) => {
							setJobInfoCallback({...jobInfoProp, company: e.target.value});
							setCoverLetterInputCallback({...coverLetterInputProp, company: e.target.value});
						}}
					/>
					{downloadErrorsProp.company && <p className='document-input-error-message'>{downloadErrorsProp.company}</p>}
				</div>

				<p className='cover-letter-text'>for the</p>
				<div className='document-input-error-block-sentence'> {/* Input + error container */}
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Position'
						value = {jobInfoProp.position}
						onChange = {(e) => {
							setJobInfoCallback({...jobInfoProp, position: e.target.value});
							setCoverLetterInputCallback({...coverLetterInputProp, position: e.target.value});
						}}
					/>
					{downloadErrorsProp.position && <p className='document-input-error-message'>{downloadErrorsProp.position}</p>}
				</div>
				<p className='cover-letter-text'>position.</p>
			</div>

			<div>
				{(downloadErrorsProp.company || downloadErrorsProp.position) && <p>&nbsp;</p>}
			</div>

			<div className='field'>
				<div className='control'> {/*Paragraph 1*/}
					<textarea 
						className='textarea document-input-paragraph'
						type='text'
						placeholder='Enter'
						value = {coverLetterInputProp.paragraph1}
						onChange = {(e) => setCoverLetterInputCallback({...coverLetterInputProp, paragraph1: e.target.value})}
					/>
				</div>
			</div>

			<div className='field'>
                                <div className='control'> {/*Paragraph 2*/}
                                        <textarea
                                                className='textarea document-input-paragraph'
                                                type='text'
                                                placeholder='Enter'
						value = {coverLetterInputProp.paragraph2}
						onChange = {(e) => setCoverLetterInputCallback({...coverLetterInputProp, paragraph2: e.target.value})}
                                        />
                                </div>
                        </div>

			<div>
				<span className='cover-letter-text'>Please find my attached resume which details my experience and qualifications for the</span>

 				{/* Input + error container */}
  				<span className='document-input-error-block-paragraph'> 
					<input
						className = 'document-input-word'
						type = "text"
						placeholder = "Position"
						value = {jobInfoProp.position}
						onChange = {(e) => {
							setJobInfoCallback({ ...jobInfoProp, position: e.target.value });
							setCoverLetterInputCallback({ ...coverLetterInputProp, position: e.target.value });
						}}
					/>

					{/* Error message absolutely positioned in reserved space */}
					{downloadErrorsProp.position && (<div className='document-input-error-message'> {downloadErrorsProp.position} </div>)}
				</span>

				<span className='cover-letter-text'>position. If you have any questions, please do not hesitate to contact me and I will be happy to explain further. Thank you for your time and consideration.</span>
			</div>

			{/*---------------------------------Footer------------------------------------*/}
			<div className='is-small'>
                                <p>&nbsp;</p>
                        </div>

			<div className='field is-small is-flex is-justified-content-left'>
                                <div style={{display:'flex', gap:'5px'}}>
                                        <p className='cover-letter-text'>Sincerely,</p>
				</div>
			</div>
				
			<div className='document-input-error-block'>					
				<input
					className='input is-small document-input-word'
					type='text'
					placeholder='Name'
					value={userContact.name}
					onChange = {(e) => {
						setUserContact({...userContact, name: e.target.value});
						setCoverLetterInputCallback({...coverLetterInputProp, name:e.target.value});
					}}
				/>
				{downloadErrorsProp.name && <p className='document-input-error-message'>{downloadErrorsProp.name}</p>}
			</div>
		</div>
	);
};

export default MockDocument;
