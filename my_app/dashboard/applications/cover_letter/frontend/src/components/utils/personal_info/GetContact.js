//GetContact.js

export const getContact = async (userId) => {
	try {
		const response = await fetch('/api/get-contact', {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			credentials: 'include',
		});

		if (!response.ok){
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return Array.isArray(data) ? data:[]; //Check if data is an array. If it is, return it, if not return an empty array
	}

	catch(error){
		console.error('Fetch error: ', error);
		return [];
	}
};
