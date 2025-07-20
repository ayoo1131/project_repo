//DownloadCoverLetter.js
export const downloadCoverLetter = async(coverLetterInput) => {
	try {
		const response = await fetch('/api/download-cover-letter', {
			method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(coverLetterInput)
		});

		if (!response.ok){
			const errorText = await response.text();
			console.error(errorText)
			return;
		}
		console.log('Success');

		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;

		const name= coverLetterInput['coverLetterInputProp'].name;
		const company = coverLetterInput['coverLetterInputProp'].company;
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
