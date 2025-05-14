//ValidateInput.js

import React from 'react';

export const validateUserInput = (userInput) => {
	const errors = {}; //creates an error object that stores errors of user input
	let isValid=true;

	let companyError = validateCompany(userInput.company)
	if (companyError != null){
		errors.company = companyError;
	}

	let positionError = validatePosition(userInput.position)
	if (positionError != null){
		errors.position = positionError;
	}

	let dateError = validateDate(userInput.date)
	if (dateError != null){
		errors.date = dateError;
	}

	let locationError = validateLocation(userInput.location)
	if (locationError != null){
		errors.location = locationError;
	}

	let urlError = validateURL(userInput.url)
	if (urlError != null){
		errors.url = urlError;
	}
	return errors;
};

const isOnlySpaces = (inputString) => { //Returns true if string is only spaces or blank
	return /^\s*$/.test(inputString);
};

const validateCompany = (company) => {
        const companyLength = company.length;

        if (companyLength == 0 || isOnlySpaces(company)){
                return("Enter a company");
        }

        else if (companyLength > 40){
                return("Company must be 40 characters or less");
        }
};

const validatePosition = (position) => {
	const positionLength = position.length;

	if (positionLength == 0 || isOnlySpaces(position)){
		return("Enter a position");
	}

	else if (positionLength > 40){
		return("Position must be 40 characters or less");
	}
};

const validateDate = (date) =>{
	//Check if date is none, check if date is in the future
	const todayDate = getTodayDate();
};

const getTodayDate = () =>{
	const todayDate = new Date();

        let day = todayDate.getDate();
        let dayString = day.toString();
        if (dayString.length === 1){
                dayString = "0" + day; //If single digit day, add leading 0
        }

        let month = todayDate.getMonth() + 1;//goes from 0-11
        let monthString = month.toString();
        if (monthString.length === 1){ //If single digit month, add leading 0
                monthString = "0" + month;
        }

        let year = todayDate.getFullYear();

        let currentDate = `${year}-${monthString}-${dayString}`; //YYYY-MM-DD
	
	return(currentDate);
};

const validateLocation = (location) => {
	const locationLength = location.length;

        if (locationLength == 0 || isOnlySpaces(location)){
                return("Enter a location");
        }

        else if (locationLength > 40){
                return("Location must be 40 characters or less");
        }
};

const validateURL = (url) => {
	const urlLength = url.length;

        if (urlLength == 0 || isOnlySpaces(url)){
                return("Enter a url");
        }

        else if (urlLength > 100){
                return("url must be 40 characters or less");
        }
};







