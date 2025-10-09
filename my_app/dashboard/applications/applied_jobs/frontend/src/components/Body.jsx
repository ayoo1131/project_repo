//Body.js

import React, { useState, useEffect } from 'react';
import UserInput from './UserInput.jsx';
import JobsList from './JobsList.jsx';
import { getJobs } from './utils/jobs_list/GetJobs.js'

const Body = () =>{
	const [jobs, setJobs] = useState([]);

	const addJob = (newJob) => {
		setJobs((prevJobs) => [...prevJobs, newJob]);
        };

	const removeJob = (jobId) =>{
		setJobs(jobs => jobs.filter(job => job.id !== jobId));
	};
	
	const updateActive = (jobId) => {
		setJobs(jobs =>
			jobs.map(job =>
				job.id ===jobId ? {...job, status:"Active"}: job
			)
		);
	};
		
	const updateRejected = (jobId) => {
		setJobs(jobs => 
			jobs.map(job =>
				job.id ===jobId ? {...job, status: "Rejected"}: job
			)
		);
	};

	const updateInterview = (jobId) => {
		setJobs(jobs =>
			jobs.map(job => 
				job.id === jobId ? {...job, status: "Interview"}:job
			)
		);
	};
	
	useEffect(() => {
                getJobs().then(data => { //data is the value getJobs() returns
			setJobs(data);
                });
        }, []);
		
	return(
		<section class='hero-body is-align-items-start' style= {{paddingTop:'0'}}>
			<div class='container'>
				<UserInput addJobCallBack={addJob}/>
          			
				<JobsList 
					removeJobCallBack={removeJob}
					updateActiveCallBack = {updateActive}
					updateRejectedCallBack = {updateRejected}
					updateInterviewCallBack = {updateInterview}
					jobsState={jobs}
				/>
			</div>
		</section>
	);
};

export default Body;
