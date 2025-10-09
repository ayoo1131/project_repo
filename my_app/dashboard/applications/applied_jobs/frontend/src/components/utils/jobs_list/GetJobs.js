//GetJobs.js

export const getJobs = async (userId) => {
	try {
		const response = await fetch('/api/get-jobs', {
      			method: 'GET',
      			headers: { 'Content-Type': 'application/json' },
      			credentials: 'include'  // Sends Flask session cookie
    		});

    		if (!response.ok) {
     			throw new Error(`HTTP error! status: ${response.status}`);
    		}

    		const data = await response.json(); //Gets an array of objects
		return Array.isArray(data) ? data : []; // Ensure always return an array
  	}
	
	catch (error) {
    		console.error('Fetch error:', error);
    		return []; // Return empty array on failure
	}
};
