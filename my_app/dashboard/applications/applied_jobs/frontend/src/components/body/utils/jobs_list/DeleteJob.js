//DeleteJob.js

export const deleteJob = async (jobId)=> {
	try{
		const response = await fetch('/api/delete-job', {
      			method: 'DELETE',
      			headers: { 'Content-Type': 'application/json' },
      			credentials: 'include',  // Sends Flask session cookie
			body: JSON.stringify({ jobId })
    		});

    		if (!response.ok) {
     			throw new Error(`HTTP error! status: ${response.status}`);
    		}
	}

	catch(error){
		console.error('fetch error:', error);
		return[];
	}
};
