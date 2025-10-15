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

	let dateError = validateDate(userInput.date_time_applied)
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
	const userDate = parseUserDate(date);
	
	if (date == ""){
		return ("Enter a date");
	}

	if (userDate.year > todayDate.year){
		return ("Date cannot be in the future");
	}

	else if (userDate.year===todayDate.year && userDate.month > todayDate.month){
		return ("Date cannot be in the future");
	}

	else if ( userDate.year===todayDate.year && userDate.month===todayDate.month && userDate.day > todayDate.day){
		return ("Date cannot be in the future");
	}
};

const getTodayDate = () =>{
	const todayDate = new Date();
	const todayObject={day:null, month:null, year:null};
		
        todayObject.day= todayDate.getDate();
	todayObject.month = todayDate.getMonth() + 1;//goes from 0-11
        todayObject.year = todayDate.getFullYear();
	
	return(todayObject);
};

const parseUserDate = (date) =>{
	const dateArray = date.split('-');
	const dateObject = {day:null, month:null, year:null};

	dateObject.day = parseInt(dateArray[2]);
	dateObject.month = parseInt(dateArray[1]);
	dateObject.year = parseInt(dateArray[0]);
	
	return(dateObject);
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

        else if (urlLength > 300){
                return("url must be 300 characters or less");
        }
};







