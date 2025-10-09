//FormatToday.js

export const formatToday = (date) => {

	const monthMap = new Map ([
		['1', '01'],
		['2', '02'],
		['3', '03'],
		['4', '04'],
		['5', '05'],
		['6', '06'],
		['7', '07'],
		['8', '08'],
		['9', '09'],
		['10', '10'],
		['11', '11'],
		['12', '12'],
	]);

	const todayArray = date.split('/');
	const todayYear = todayArray[2];
	const todayMonth = monthMap.get(todayArray[0]);
	
	let todayDay=todayArray[1];
	if (todayArray[1].length === 1){
		todayDay = '0' + todayDay
	}

	//const todayDay = todayArray[1];


	const todayDateISO = todayYear + '-' + todayMonth + '-' + todayDay;
	return todayDateISO;
};
