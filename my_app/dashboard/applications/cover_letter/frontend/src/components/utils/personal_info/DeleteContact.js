//DeleteContact.js

export const deleteContact = async () => {
	try{
		const response = await fetch('/api/delete-contact', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',  // Sends Flask session cookie
                       	body: JSON.stringify('')
		});

		const result = await response.json();
		console.log(result);
		if (response.ok){
			console.log('Success', result.message);
			return {cancelled: false};
		}

		else{
			console.error('Server error:', result.error);
		}
	}

	catch(error){
		console.error('fetch error:', error);
		return[];
	}

}


