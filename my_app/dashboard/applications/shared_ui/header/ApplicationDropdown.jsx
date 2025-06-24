//ApplicationDropdown.js
import React from 'react';

const ApplicationDropout = () => {
	const handleCoverLetter = () => {
		window.location.href='/cover-letter'
	};

	const handleAppliedJobs = () => {
		window.location.href='/applied-jobs'
	};
	
	return (
		<div class="navbar-item has-dropdown is-hoverable">
			<a className="navbar-link gray-background has-text-white">
				Applications
			</a>

			<div className="navbar-dropdown">
				<a className="navbar-item gray-background has-text-white" onClick={handleCoverLetter}>Cover Letter</a>
				<a className="navbar-item gray-background has-text-white" onClick={handleAppliedJobs}>Applied Jobs</a>
			</div>
		</div>
	);

};

export default ApplicationDropout;

