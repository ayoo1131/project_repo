//UodateContact.js

export const updateContact = async(userContactProp, updatedUserContact) =>{
	//The updated contact and previous contact are the same, do not do anything
	if(
		userContactProp.name === updatedUserContact.name &&
		userContactProp.email === updatedUserContact.email &&
		userContactProp.phone === updatedUserContact.phone &&
		userContactProp.social === updatedUserContact.social &&
		userContactProp.extra === updatedUserContact.extra
	){
		console.log('same');
	}

	else{//The user updated the contact data. Must call api to update.
		try{
			const response = await fetch('/api/update-contact',{
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				credentials: 'include',
				body: JSON.stringify(updatedUserContact)
			});

			const result = await response.json();

			if (response.ok){
				console.log('Success:', result.message);
			}

			else{
				console.log('Error:', result.error);
			}
		}

		catch(err){
			console.error('Network error', err);
		}
	}

};
