//ApplicationDropdown.js
import React from 'react';

const ApplicationDropout = ({className}) => {
	const handleCoverLetter = () => {
		window.location.href='/cover-letter'
	}

	const handleAppliedJobs = () => {
		window.location.href='/applied-jobs'
	}

	return (
		<div class="navbar-dropdown">
			<a className={className} onClick={handleCoverLetter}>Cover Letter</a>
			<a className={className} onClick={handleAppliedJobs}>Applied Jobs</a>
		</div>
	);
};

export default ApplicationDropout;
