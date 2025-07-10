//SetToday.js

export const setToday = (ISOdate) => {
	const dateMap = new Map([
		['1', 'January'],
		['2', 'February'],
		['3', 'March'],
		['4', 'April'],
		['5', 'May'],
		['6', 'June'],
		['7', 'July'],
		['8', 'August'],
		['9', 'September'],
		['10', 'October'],
		['11', 'November'],
		['12', 'December'],
	]);

	const date = ISOdate.split('/');

	const returnDate = dateMap.get(date[0]) + ' ' + date[1] + ', ' + date[2];
	return returnDate;
};
