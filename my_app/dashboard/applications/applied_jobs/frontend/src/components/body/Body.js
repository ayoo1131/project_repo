//Body.js

import React, { useState, useEffect } from 'react';
import UserInput from './UserInput.js';
import JobsList from './JobsList.js';
import { getJobs } from './utils/jobs_list/GetJobs.js'
import { formatJobs } from './utils/jobs_list/FormatJobs.js'


const Body = () =>{
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
                getJobs().then(data => { //data is the valie getJobs() returns
                        const formattedJobsData = formatJobs(data);
                        console.log(formattedJobsData);
                        setJobs(formattedJobsData);
                });
        }, []);

	const addJob = (newJob) => {
		setJobs((prevJobs) => [...prevJobs, newJob]);
	};

	return(
		<section class='hero-body' style= {{paddingTop:'0'}}>
			<div class='container'>
				<UserInput addJob={addJob}/>
				<div style={{ marginTop: '20px' }}> {/* Adjust this value to control spacing */}
          				<JobsList jobs={jobs} />
        			</div>
			</div>
		</section>
	);

};

export default Body;
