//JobsList.js
import React, { useState, useEffect } from 'react';
import { getJobs } from './utils/jobs_list/GetJobs.js'

const JobsList = () => {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
    		getJobs().then(data => setJobs(data));
  	}, []);
	
	console.log(jobs);
	return (
    		<div className="box p-0">
      			<div className="table-container jobs-table-container">
        			<table className="table is-fullwidth is-striped is-hoverable">
          				<thead>
            					<tr>
							<th class='job-list-column-title'>No.</th>
              						<th class='job-list-column-title'>Company</th>
              						<th class='job-list-column-title'>Position</th>
              						<th class='job-list-column-title'>Date</th>
              						<th class='job-list-column-title'>Status</th>
							<th class='job-list-column-title'>URL</th>
							<th class="job-list-column-title jobs-actions">Actions</th>
            					</tr>
          				</thead>
          				<tbody>
            					{jobs.map(job => (
              						<tr key={job.id}>
                						<td>{job.company}</td>
                						
								<td>{job.position}</td>
                				
								<td>{job.date}</td>

								<td>
                  							<span className={`tag ${job.status}`}>
                    								{job.status}
                  							</span>
                						</td>
								
								<td>{job.url}</td>

                						<td className="jobs-actions">
                  							<button className="button is-small is-info">
                    								<i className="fas fa-edit">denied</i>
                  							</button>
                  							<button className="button is-small is-danger">
                    								<i className="fas fa-trash">delete</i>
                  							</button>
                						</td>
              						</tr>
            					))}
          				</tbody>
        			</table>
      			</div>
    		</div>
  	);	
};

export default JobsList;
