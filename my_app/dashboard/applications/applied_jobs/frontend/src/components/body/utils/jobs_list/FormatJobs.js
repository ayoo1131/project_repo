//FormatJobs.js

export const formatJobs = (jobs) => {
	
	return jobs.map(jobEntry => {
		const [yyyy, mm, dd] = jobEntry.date.split('-');
		const newDate = `${mm}/${dd}/${yyyy}`;
		return{ ...jobEntry, date: newDate};	
	});
};
