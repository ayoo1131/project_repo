//FormatDate.js

export const formatDate = (date) => { 
	const [yyyy, mm, dd] = date.split('-');
	const formatDate = `${mm}/${dd}/${yyyy}`;
	return formatDate;
};
