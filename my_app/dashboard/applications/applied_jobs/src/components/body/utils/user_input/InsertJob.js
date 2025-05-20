//InsertJob.js

export async function insertJob(jobData){
	try {
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
      			// Optionally update local job list here
    		} 
		else {
      			console.error('Server error:', result.error);
    		}
  	}
		
	catch (err) {
    		console.error('Network error:', err);
  	}
};
