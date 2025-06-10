//Body.js

import React, { useState, useEffect } from 'react';
import UserInput from './UserInput.js';
import JobsList from './JobsList.js';
import { getJobs } from './utils/jobs_list/GetJobs.js'
import { formatJobs } from './utils/jobs_list/FormatJobs.js'


const Body = () =>{
	const [jobs, setJobs] = useState([]);

	const addJob = (newJob) => {
		setJobs((prevJobs) => [...prevJobs, newJob]);
        };

	const removeJob = (jobId) =>{
		setJobs(jobs => jobs.filter(job => job.id !== jobId));
	};

	useEffect(() => {
                getJobs().then(data => { //data is the valie getJobs() returns
                        const formattedJobsData = formatJobs(data);
                        setJobs(formattedJobsData);
                });
        }, []);

	return(
		<section class='hero-body' style= {{paddingTop:'0'}}>
			<div class='container'>
				<UserInput addJobCallBack={addJob}/>
          			
				<JobsList removeJobCallBack={removeJob} jobsState={jobs} />
			</div>
		</section>
	);
};

export default Body;
