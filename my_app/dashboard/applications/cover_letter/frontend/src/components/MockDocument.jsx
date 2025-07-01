//MockDocument.jsx
import React from 'react';

const MockDocument = () => {
	
	return (
		<div className='box is-fullheight has-background-white'>
			{/*Header*/}
			<div className='field is-small is-flex is-justify-content-center'>	
				<div className='control'>
					<input 
						className='input is-small document-input-word'
						type='text'
						placeholder='Name'
					/>
				</div>
			</div>

			<div className='field is-small is-flex is-justify-content-center'>
				<div className='control is-grouped'>
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Email'
					/> 
					|
					<input
                                                className='input is-small document-input-word'
                                                type='text'
                                                placeholder='Phone No.'
                                        />				
				</div>
			</div>
			
			<div className='field is-small is-flex is-justify-content-left'>
				<div className='control'>
					<input
						className='input is-small document-input-word'
						type='text'
						placeholder='Date'
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
					/>
					<p className='cover-letter-text'>for the</p>
					<input
                                                className='input is-small document-input-word'
                                                type='text'
                                                placeholder='Position'
                                        />
					<p className='cover-letter-text'>position.</p>

				</div>
			</div>

			<div className='field'>
				<div class='control'>
					<textarea
						className='textarea document-input-paragraph'
						type='text'
						placeholder='Enter'
					/>
				</div>
			</div>

			<div className='field'>
                                <div class='control'>
                                        <textarea
                                                className='textarea document-input-paragraph'
                                                type='text'
                                                placeholder='Enter'
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
                                        />
                                </div>
                        </div>
		</div>
	);
};

export default MockDocument;
