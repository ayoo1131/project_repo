//ValidateCoverLetterInput.js

export const validateCoverLetterInput = (coverLetterInput) => {
	const errors = {};
	
	let nameError = validateName(coverLetterInput.name);
        if (nameError != null){
		errors.name = nameError;
        }

	let emailError = validateEmail(coverLetterInput.email);
	if (emailError != null){
		errors.email = emailError;
	}

	let phoneError = validatePhone(coverLetterInput.phone);
	if (phoneError != null){
		errors.phone = phoneError;
	}

	//check first if social and extra attributes exist 
	let socialError = validateSocial(coverLetterInput.social);
	if (socialError != null){
		errors.social = socialError;
	}

	let extraError = validateExtra(coverLetterInput.extra);
	if (extraError != null){
		errors.extra = extraError;
	}
	
	let dateError = validateDate(coverLetterInput.date);
	if (dateError != null){
		errors.date = dateError;
	}
	
	let companyError = validateCompany(coverLetterInput.company);
	if(companyError != null){
		errors.company = companyError;
	}

	let positionError = validatePosition (coverLetterInput.position);
	if (positionError!= null){
		errors.position = positionError;
	}

	return errors;
};

const isEmptyOrWhitespace = (str) => { //return true if string is empty or all spaces or return
        return /^\s*$/.test(str);
};

const validateName = (name) => { //Check for number, length limit, empty, and character.
        const nameInvalidRegex = /^[\p{L}\p{Zs}'.-]+$/u;
        // /.../ - Regex literal syntax
        // ^ - Start of line
        // [] - Match a character present in set
        // \p{L} - Match any character from any language
        // \p{Zs} - Match whitespace character for Firstname Lastname
        // '.- - Matches ', ., and - ex. O'Keefe, Naymar Jr., and Mary-Anne
        // + - Matches previous set at least once, can be more
        // $ - End of line

        if (isEmptyOrWhitespace(name)){
                return("Enter a name");
        }

        else if (name.length > 100){
                return('Name cannot excede 100 characters');
        }

        else if (/.*\d.*/.test(name)){
                return ('Name cannot contain numbers');
        }

        else if (!nameInvalidRegex.test(name)){
                return ('Name is invalid');
        }
};

const validateEmail = (email) => {
	if (isEmptyOrWhitespace(email)){
		return("Enter an email");
	}

	else if (/\S\s+\S/.test(email)){
		// \S - any non-whitespace character
		// \s+ - one or more non-whitespace character
		return ('Email cannot have space');
	}

	else if(email.length > 100){
		return('Email cannot be more than 100 characters');
	}

	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
		return ('Email not valid');
	}
};

const validatePhone = (phone) => {
	if (isEmptyOrWhitespace(phone)){
		return('Enter a phone #')
	}

	else if(/\p{L}/u.test(phone)){ //ensure phone # does not have letters
		return ('Phone # is invalid');
	}

	else if (!/(?:\D*\d){9}/.test(phone)){ //ensure phone # has at least 9 numbers
		return ('Phone # is invalid');
	}

	//fix this later
	//else if (phone.length > 25){
	//	return('Phone # length too long');
	//}
};

const validateSocial = (social) =>{
	if (social.length > 100){
		return('Social media cannot be more than 100 characters');
	}
};

const validateExtra = (extra) => {
	if (extra.length > 100){
		return('Extra cannot be more than 100 characters');
	}
};

const validateDate = (date) => {
	if (isEmptyOrWhitespace(date)){
		return("Enter a date");
        }
};

const validateCompany = (company) => {
	if (isEmptyOrWhitespace(company)){
                return("Enter a company");
        }

};

const validatePosition = (position) =>{
	if (isEmptyOrWhitespace(position)){
                return("Enter a position");
        }

};
