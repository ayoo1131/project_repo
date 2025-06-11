//Interview.js

export const interview = async (jobId) =>{
	try{
		const response = await fetch('/api/update-interview', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
      			credentials: 'include'  // Sends Flask session cookie
		});

		const result = await response.json();

                if (!response.ok){
                        throw new Error(`HTTP error! status: ${response.status}`);
                }

                else{
                        console.log('Success: ', response.message);
                }

	}

	catch(error){
		console.error('fetch error:', error);
		return[];
	}
};
