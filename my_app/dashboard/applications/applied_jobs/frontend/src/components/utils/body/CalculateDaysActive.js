//CalculateDaysActive.js

export const calculateDaysActive = (jobsData) =>{

	const jobsDataDaysActive = jobsData.map(job => {
		const [date, time] = job['date_time_applied'].split('T');
		const appliedDate = new Date(date);
		const today = new Date();

		const difference = today - appliedDate;
		const daysActive = Math.floor(difference / (1000 * 60 * 60 * 24));
		
		return({...job, days_active: daysActive});
	});

	return jobsDataDaysActive;
};
