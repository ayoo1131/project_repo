//ClearButton.jsxi
import React from 'react';

const ClearButton = ({
	coverLetterInputProp, 
	setCoverLetterInputCallback, 
	setFillUserContactCallback, 
	setJobInfoCallback, 
	setIsTodayCallback, 
	isTodayProp, 
	setContactMessageCallback,
	setDownloadMessageCallback,
	setDownloadErrorsCallback}) => {

	const handleClear = () => {
		setFillUserContactCallback({name:'', email:'', phone:'', social:'',extra:'', date:''});
		setIsTodayCallback(false);
		setCoverLetterInputCallback({name:'', email:'', phone:'', date:'', paragraph1:'', paragraph2:''});
		setJobInfoCallback({company: '', position: ''});
		setContactMessageCallback(null);
		setDownloadMessageCallback(null);
		setDownloadErrorsCallback({name:'', email:'', phone:'', social:'', extra:'', date:'', company:'', position:''});
	};

	return(
		<div className='control'>
			<button className='button' onClick={handleClear} style={{paddingRight:'10px'}}>Clear</button>
		</div>
	);
};

export default ClearButton;
