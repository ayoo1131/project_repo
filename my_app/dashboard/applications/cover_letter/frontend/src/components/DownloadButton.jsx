//DownloadButton.jsx
import React from 'react';
import {validateCoverLetterInput} from './utils/download/ValidateCoverLetterInput.js';
import { downloadCoverLetter } from './utils/download/DownloadCoverLetter.js';

// {} destructs properties object to give state from parent
const DownloadButton = ({coverLetterInputProp, setDownloadMessageCallback, setContactMessageCallback, setDownloadErrorsCallback}) =>{
	
	const handleDownload = (e) => {
		e.preventDefault();//stops Download button click from reloading page.

		//validate cover letter input
		console.log(coverLetterInputProp);
		const errors = validateCoverLetterInput(coverLetterInputProp);
		setContactMessageCallback(null); //SetContact message to null regardless of if there is contact message on top of page or not
		if (Object.keys(errors).length === 0){
			downloadCoverLetter(coverLetterInputProp);
			setDownloadMessageCallback('Download Success');
			console.log('Download Success');
		}

		else {
			setDownloadMessageCallback('Download Failed, Check Input');
			setDownloadErrorsCallback(errors);
			console.log('Download Fail');
		}
	};


	return (
		<div className='control'>
			<button className='button' onClick={handleDownload} style={{paddingLeft:'10px'}}>Download</button>
		</div>
	);
};

export default DownloadButton;
