//DownloadCoverLetter.js
export const downloadCoverLetter = async(coverLetterInput) => { //coverLetterInput parameter is type object 
	try {
		const response = await fetch('/api/download-cover-letter', {
			method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(coverLetterInput)
		});

		if (!response.ok){ //API call returned an error message
			const errorText = await response.text();
			return;
		}
		
		//blob() reads body of response and returns a Blob object.
		const blob = await response.blob(); //Blob is binary representation of data(file,image,video) Used to download files,handle image,upload binary data.
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		
		const name= coverLetterInput.name;
		const company = coverLetterInput.company;
		a.download = `${name} Cover Letter - ${company}.docx`;

		document.body.appendChild(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(url);
		
	}

	catch(err){
		console.error('Download error', err);
		
	}
};
