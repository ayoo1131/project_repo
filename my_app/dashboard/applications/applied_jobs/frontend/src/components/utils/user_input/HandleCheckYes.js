//HandleCheckYes.js

export const handleCheckYes = (e, userInput, setUserInput) =>{

	if (e.target.checked){
		setUserInput({...userInput, cover_letter:"Yes"});
	}

	else{
		setUserInput({...userInput, cover_letter:""});
	}
};
