//DeleteJob.js

export const deleteJob = async (jobId, jobCompany, jobTitle)=> {
	try{
	
		const confirmDelete = window.confirm(`Are you sure you want to delete ${jobTitle} at ${jobCompany}?`);

		if (confirmDelete){
			const response = await fetch('/api/delete-job', {
                        	method: 'DELETE',
                        	headers: { 'Content-Type': 'application/json' },
                        	credentials: 'include',  // Sends Flask session cookie
                        	body: JSON.stringify({ jobId })
                	});

               		const result = await response.json();

                	if (response.ok) {
                        	console.log('Success:', result.message);
				return {cancelled: false};
                	}
                	else {
                        	console.error('Server error:', result.error);
                	}
		}

		else{
			return{cancelled: true};
		}
	}

	catch(error){
		console.error('fetch error:', error);
		return[];
	}
};
