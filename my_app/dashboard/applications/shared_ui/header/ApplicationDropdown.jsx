//AppicationDropdown.jsx
const ApplicationDropout = ({userRoleProp}) => {
	//Insert handle method here
	const handleTestCoverLetter = () => { window.location.href='/test-cover-letter' };

	const handleCoverLetter = () => {
		window.location.href='/cover-letter'
	};

	const handleAppliedJobs = () => {
		window.location.href='/applied-jobs'
	};
	const handleTestAppliedJobs = () => { 
		window.location.href='/test-applied-jobs'
	};
	return (
		<div class="navbar-item has-dropdown is-hoverable">
			<a className="navbar-link gray-background has-text-white">
				Applications
			</a>

			<div className="navbar-dropdown">
				{/* Insert an application tag here */}		
				{userRoleProp==='dev' && <a className='navbar-item gray-background has-text-white' onClick={handleTestCoverLetter}>Test Cover Letter</a>}

				{userRoleProp==='dev'&&
					<a className="navbar-item gray-background has-text-white" onClick={handleTestAppliedJobs}>Test Applied Jobs</a>
				}
				<a className="navbar-item gray-background has-text-white" onClick={handleCoverLetter}>Cover Letter</a>
				<a className="navbar-item gray-background has-text-white" onClick={handleAppliedJobs}>Applied Jobs</a>
			</div>
		</div>
	);

};

export default ApplicationDropout;

