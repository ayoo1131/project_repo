//Rejected.js

export const rejected = async(jobId) =>{
	try{
		const response = await fetch('/api/update-rejected',{	
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',  // Sends Flask session cookie
			body: JSON.stringify({jobId})
		});

		const result = await response.json();	
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

