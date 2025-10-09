//InsertJob.js

export const insertJob = async (jobData) => {
	try {
    		console.log(jobData);
		const response = await fetch('/api/insert-job', {
      			method: 'POST',
      				headers: {
        				'Content-Type': 'application/json'
      				},
      				credentials: 'include',  // important: sends Flask session cookie
      				body: JSON.stringify(jobData)
    		});

    		const result = await response.json();

    		if (response.ok) {
      			console.log('Success:', result.message);

    			return result.job_id;	
		} 
		else {
      			console.error('Server error:', result.error);
    		}
  	}
		
	catch (err) {
    		console.error('Network error:', err);
  	}
};
