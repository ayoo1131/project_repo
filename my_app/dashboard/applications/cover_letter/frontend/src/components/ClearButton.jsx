//ClearButton.jsxi
import React from 'react';

const ClearButton = ({coverLetterInputProp, setCoverLetterInputCallback, setFillUserContactCallback, setJobInfoCallback}) => {
	const handleClear = () => {
		console.log(coverLetterInputProp);//Remove this arguement from function declaration
		setFillUserContactCallback({name:'', email:'', phone:'', social:'',extra:'', date:''});
		setCoverLetterInputCallback({name:'', email:'', phone:'', date:'', paragraph1:'', paragraph2:''});
		setJobInfoCallback({company: '', position: ''});
	};

	return(
		<button className='button' onClick={handleClear} style={{paddingRight:'10px'}}>Clear</button>
	);
};

export default ClearButton;
