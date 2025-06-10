//JobsList.js
import React, { useState, useEffect } from 'react';
import { deleteJob } from './utils/jobs_list/DeleteJob.js'

const JobsList = ({ removeJobCallBack, jobsState }) => {
        const [openDropdownId, setOpenDropdownId] = useState(null);
        const [dropdownCoords, setDropdownCoords] = useState({top: 0, left: 0});

        const toggleDropdown = (e, jobId) => {
                e.stopPropagation();
		
		const dropdownHeight = 135; 
  		const buffer = 8;

		const rect = e.currentTarget.getBoundingClientRect();

		// Close if clicking the same dropdown
                if (openDropdownId === jobId) {
                        setOpenDropdownId(null);
                        return;
                }
		let top;

		if (rect.bottom + dropdownHeight + buffer > window.innerHeight) {
    			top = rect.top + window.scrollY - dropdownHeight;
  		}
		else{
			top = rect.bottom + window.scrollY;
		}

                setDropdownCoords({ top, left: rect.left });
                setOpenDropdownId(jobId);
        };

        useEffect(() => {
                const handleClickOutside =()=>{
                        setOpenDropdownId(null);
                };

                window.addEventListener('click', handleClickOutside);
                return () => window.removeEventListener('click', handleClickOutside);

        }, []);

        const handleDeleteJob = (e, jobId, jobCompany, jobTitle) => {
                e.preventDefault();
                deleteJob(jobId, jobCompany, jobTitle); //Delete job from the database
                removeJobCallBack(jobId); //RemoveJob from the jobs state
        };

        const countJobStatus = () => {
                const appliedCount = jobsState.filter(job => job.status === 'Applied').length;
                const rejectedCount = jobsState.filter(job => job.status === 'Rejected').length;
                const interviewCount = jobsState.filter(job => job.status === 'Interview').length;

                const statusCount = {
                        applied: appliedCount,
                        rejected: rejectedCount,
                        interview: interviewCount
                };

                return statusCount
        };

        return (
                <div className="box p-0" style={{ marginTop: '20px' }}>
                        <div className="table-container jobs-table-container">
                                <table className="table is-fullwidth is-striped is-hoverable">
                                        <thead>
                                                <tr className='has-text-centered'>
                                                        <th colSpan="7" className="has-text-centered">
								Applied: {countJobStatus().applied}
								Rejected: {countJobStatus().rejected}
								Intervews: {countJobStatus().interview}
							</th>
                                                </tr>


                                                <tr>
                                                        <th style={{ width: '15%' }} >Company</th>
                                                        <th style={{ width: '15%' }} >Position</th>
                                                        <th style={{ width: '10%' }} >Date</th>
                                                        <th style={{ width: '10%' }} >Status</th>
                                                        <th style={{ width: '20%' }} >Location</th>
                                                        <th style={{ width: '10%' }} >URL</th>
                                                        <th style={{ width: '20%' }} >Actions</th>
                                                </tr>
                                        </thead>

                                        <tbody>
                                                {jobsState.map(job => (

                                                        <tr key={job.id}>
                                                                <td>{job.company}</td>
                                                                <td>{job.position}</td>
                                                                <td className='jobs-table-narrow-column'>{job.date}</td>
                                                                <td className='jobs-table-narrow-column'> <span className={`tag ${job.status}`}> {job.status} </span> </td>
                                                                <td>{job.location}</td>
                                                                <td className='jobs-table-narrow-column'> <a href={job.url} target='_blank' rel='noopener noreferrer' >link</a> </td> {/*target='_blank' opens link in new tab rel is for security*/}

                                                                <td className="jobs-actions" style={{ position: 'relative' }}>
                                                                        <button className="button" onClick={(e) => toggleDropdown(e, job.id)}> Actions ▼ </button>

                                                                        {openDropdownId === job.id && (
                                                                                
  										<div className="test-dropdown-menu" style={{ top: dropdownCoords.top, left: dropdownCoords.left }}>
    											<div className="dropdown-item">Option 1</div>
    											<div className="dropdown-item">Option 2</div>
    											<div className="dropdown-item" onClick={(e) => handleDeleteJob(e, job.id, job.company, job.title)}>Delete</div>
  										</div>
										
                                                                        )}
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

