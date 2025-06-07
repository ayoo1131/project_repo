//JobsList.js
import React, { useState, useEffect } from 'react';
import { getJobs } from './utils/jobs_list/GetJobs.js'
import { formatJobs } from './utils/jobs_list/FormatJobs.js'
import { deleteJob } from './utils/jobs_list/DeleteJob.js'

const JobsList = ({ jobs }) => {
	
	const handleDeleteJob = (e, jobId) => {
		e.preventDefault();

		deleteJob(jobId);
	}; 
	

        return (
                <div className="box p-0">
                        <div className="table-container jobs-table-container">
                                <table className="table is-fullwidth is-striped is-hoverable jobs-table">
                                        <thead>
                                                <tr>
                                                        <th class='job-list-column-title'>Company</th>
                                                        <th class='job-list-column-title'>Position</th>
                                                        <th class='job-list-column-title jobs-table-narrow-column'>Date</th>
                                                        <th class='job-list-column-title jobs-table-narrow-column'>Status</th>
                                                        <th class='job-list-column-title'>Location</th>
                                                        <th class='job-list-column-title'>URL</th>
                                                        <th class="job-list-column-title jobs-actions">Actions</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {jobs.map(job => (
                                                        <tr key={job.id}>
                                                                <td>{job.company}</td>

                                                                <td>{job.position}</td>

                                                                <td class='jobs-table-narrow-column'>{job.date}</td>

                                                                <td class='jobs-table-narrow-column'>
                                                                        <span className={`tag ${job.status}`}>
                                                                                {job.status}
                                                                        </span>
                                                                </td>

                                                                <td>{job.location}</td>

                                                                <td> <a href={job.url} target='_blank' rel='noopener noreferrer' >link</a> </td> {/*target='_blank' opens link in new tab rel is for security*/}

                                                                <td className="jobs-actions">
                                                                        <button className="button is-small is-info">
                                                                                <i className="fas fa-edit">denied</i>
                                                                        </button>
                                                                        <button onClick={(e) => handleDeleteJob(e, job.id)} className="button is-small is-danger">
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
