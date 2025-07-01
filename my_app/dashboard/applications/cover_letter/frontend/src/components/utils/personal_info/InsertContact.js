//InsertContact.js
export const insertContact = async(contactData) => {
	try{
		console.log('insertContact.js = ' + JSON.stringify(contactData));
		const response = await fetch('/api/insert-contact', {
			method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(contactData)
		});

		const result = await response.json();

		if (response.ok){
			console.log('Success:', result.message);
		}

		else{
			console.error('Server error: ', result.error);
		}
	}

	catch (err) {
    		console.error('Network error:', err);
  	}
};
