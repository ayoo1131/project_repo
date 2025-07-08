//MockDocument.jsx
import Reacti, {useState, useEffect} from 'react';

const MockDocument = ({fillUserContactProp, coverLetterInputProp, jobInfoProp, setJobInfoCallback, setCoverLetterInputCallback}) => {
	const [userContact, setUserContact] = useState(fillUserContactProp);//On startup, saved user contact in fillUserContactProp is set. allows multiple fill button presses
	
	useEffect(() => {
		setUserContact(fillUserContactProp);
	}, [fillUserContactProp]);//On startup set saved contact in local state.

	return (
		<div className='box is-fullheight has-background-white'>
			{/*Header*/}
			<div className='field is-small is-flex is-justify-content-center'>	
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
			</div>

			<div className='field is-grouped is-small is-flex is-justify-content-center'>
				<div className='control'>
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Email'
						value = {userContact.email}
						onChange={(e)=> {
							setUserContact({...userContact, email: e.target.value});
							setCoverLetterInputCallback({...coverLetterInputProp, email:e.target.value});
						}}
					/> 
				</div>
				
				<div className='control'><p className='cover-letter-text'> | </p></div>
				
				<div className='control'>
					<input
                                                className='input is-small document-input-word'
                                                type='text'
                                                placeholder='Phone No.'
						value = {userContact.phone}
						onChange = {(e) => {
							setUserContact({...userContact, phone: e.target.value});
							setCoverLetterInputCallback({...coverLetterInputProp, phone: e.target.value});
						}}
                                        />				
				</div>
				
				<div className='control'><p className='cover-letter-text'> | </p></div>
				
				<div className='control'>
                                        <input
                                                className='input is-small document-input-word'
                                                type='text'
                                                placeholder='Social Media (optional)'
                                                value = {userContact.social}
						onChange = {(e) => {
							setUserContact({...userContact, social: e.target.value});
							setCoverLetterInputCallback({...coverLetterInputProp, social: e.target.value});
						}}
                                        />
                                </div>
				
				<div className='control'><p className='cover-letter-text'> | </p></div>
				
				<div className='control'>
                                        <input
                                                className='input is-small document-input-word'
                                                type='text'
                                                placeholder='Extra (optional)'
                                                value = {userContact.extra}
						onChange = {(e) => {
							setUserContact({...userContact, extra: e.target.value});
							setCoverLetterInputCallback({...coverLetterInputProp, extra: e.target.value});
						}}
                                        />
                                </div>
			</div>
			
			<div className='field is-small is-flex is-justify-content-left'>
				<div className='control'>
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Date'
						value = {coverLetterInputProp.data}
						onChange = {(e) => {
							setCoverLetterInputCallback({...coverLetterInputProp, date: e.target.value})
						}}
					/>
					<label className='checkbox' style={{paddingLeft:'10px'}}>
						<input type='checkbox' />
						<span className='ml-2 cover-letter-text'>Today</span>
					</label>
				</div>
			</div>

			{/*Body */}
			<div className='field is-small is-flex is-justify-content-left'>
				<div style= {{display:'flex', gap:'10px'}}>
					<p className='cover-letter-text'>Dear</p>
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Company'
						value = {jobInfoProp.company}
						onChange = {(e) => setJobInfoCallback({...jobInfoProp, company: e.target.value})}
					/>
					<p className='cover-letter-text'> Hiring Manager,</p>
				</div>
			</div>
			
			<div className='field is-small is-flex is-justified-content-left'>
				<div style={{display:'flex', gap:'5px'}}>
					<p className='cover-letter-text'>I am excited to have the opportunity to apply to</p>
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Company'
						value = {jobInfoProp.company}
						onChange = {(e) => setJobInfoCallback({...jobInfoProp, company: e.target.value})}
					/>
					<p className='cover-letter-text'>for the</p>
					<input
                                                className='input is-small document-input-word'
                                                type='text'
                                                placeholder='Position'
						value = {jobInfoProp.position}
						onChange = {(e) => setJobInfoCallback({...jobInfoProp, position: e.target.value})}
                                        />
					<p className='cover-letter-text'>position.</p>

				</div>
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

			<div className='field is-small is-flex is-justified-content-left'>
                                <div style={{display:'flex', gap:'5px'}}>
                                        <p className='cover-letter-text'>
						Please find my attached resume which details my experience and qualifications for the&nbsp;
						<input
                                                	className='input is-small document-input-word'
                                                	type='text'
                                        	        placeholder='Position'
							value = {jobInfoProp.position}
							onChange = {(e) => setJobInfoCallback({...jobInputProp, position: e.target.value})}
                                       		/>
						&nbsp;position. If you have any questions, please do not hesitate to contact me and I will be happy to explain further. Thank you for your time and consideration.
                                	</p>
				</div>
                        </div>
			{/*Footer*/}
			<div className='field is-small is-flex is-justified-content-left'>
                                <div style={{display:'flex', gap:'5px'}}>
                                        <p className='cover-letter-text'>Sincerely,</p>
				</div>
			</div>
				
			<div className='field is-small is-flex is-justified-content-left'>
                                <div style={{display:'flex', gap:'5px'}}>					
					<input
                                                className='input is-small document-input-word'
                                                type='text'
                                                placeholder='Name'
						value={userContact.name}
						onChange = {(e) => {
							setUserContact({...userContact, name: e.target.value});                                                                                             setCoverLetterInputCallback({...coverLetterInputProp, name:e.target.value});
						}}
                                        />
                                </div>
                        </div>
		</div>


	);
};

export default MockDocument;
