//Rejected.js

export const rejected = async(jobId) =>{
	try{
		console.log(jobId);
		const response = await fetch('/api/update-rejected',{	
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',  // Sends Flask session cookie
			body: JSON.stringify({jobId})
		});

		const result = await response.json();	
		console.log(result);
		if (!response.ok){
			throw new Error(`HTTP error!`);
		}

		else{
			console.log('Success: ', response.message);
		}
	}

	catch (error) {
    		console.error('Fetch error:', error);
    		return []; // Return empty array on failure
	}
};

