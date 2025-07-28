//DownloadButton.jsx
import React from 'react';
import {validateCoverLetterInput} from './utils/download/ValidateCoverLetterInput.js';
import { downloadCoverLetter } from './utils/download/DownloadCoverLetter.js';

const DownloadButton = (coverLetterInputProp) =>{
	const handleDownload = (e) => {
		e.preventDefault();

		//validate cover letter input
		const errors = validateCoverLetterInput(coverLetterInputProp);
		//setErrors();
		
		if (errors){
			downloadCoverLetter(coverLetterInputProp);
		}
	};


	return (
		<div className='control'>
			<button className='button' onClick={handleDownload} style={{paddingLeft:'10px'}}>Download</button>
		</div>
	);
};

export default DownloadButton;
