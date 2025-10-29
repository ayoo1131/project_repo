//FormatDate.js

export const formatDateTime = (dateTime) => {
	const [date, time] = dateTime.split('T');
	const [ yyyy, mm, dd ] = date.split('-');
        const formatDate = `${mm}/${dd}/${yyyy}`;
        return formatDate;
};
