//HandleCheckNo.js

export const handleCheckNo = (e, userInput, setUserInput) => {
	
	if (e.target.checked){//if no checkbox is checked
		setUserInput({...userInput, cover_letter:"No"});
	}

	else{
		setUserInput({...userInput, cover_letter:""})
	}

};
