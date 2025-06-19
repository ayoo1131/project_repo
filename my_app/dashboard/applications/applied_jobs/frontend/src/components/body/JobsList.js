//JobsList.js
import React, { useState, useEffect } from 'react';
import { deleteJob } from './utils/jobs_list/DeleteJob.js'
import { rejected } from './utils/jobs_list/Rejected.js'
import { interview } from './utils/jobs_list/Interview.js'
import { active } from './utils/jobs_list/Active.js'

const JobsList = ({ removeJobCallBack, updateActiveCallBack, updateRejectedCallBack, updateInterviewCallBack, jobsState }) => {
	const [openDropdownId, setOpenDropdownId] = useState(null);
	const [dropdownCoords, setDropdownCoords] = useState({top: 0, left: 0});
	const [showStatus, setShowStatus] = useState({total: true, active: true, rejected: true, interview: true });
	const [sortBy, setSortBy] = useState('newest');

	const toggleDropdownSort = (e) => {
		e.stopPropagation();
		
		if (openDropdownId === 'sort'){
			setOpenDropdownId(null);
			return;
		}

		const rect = e.currentTarget.getBoundingClientRect();
		setDropdownCoords({top: rect.bottom, left: rect.left});
		setOpenDropdownId('sort');
	};
	
	const toggleDropdownStatus = (e, jobId) => {
		e.stopPropagation();
		
		const dropdownHeight = 135; 
		const buffer = 8;
		const rect = e.currentTarget.getBoundingClientRect();

		if (openDropdownId === jobId) {// Close if clicking the same dropdown
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

	const handleUpdateActive = (e, jobId) => {
		e.preventDefault();
		active(jobId);
		updateActiveCallBack(jobId);
	};

	const handleUpdateRejected = (e, jobId) => {
		e.preventDefault();
		rejected(jobId); //Change status of job to Rejected in database
		updateRejectedCallBack(jobId); //Change status of job to Rejected in state
	};

	const handleUpdateInterview = (e, jobId) => {
		e.preventDefault();
		interview(jobId); //Change status of job to Interview in database
		updateInterviewCallBack(jobId); // Change status of job to Interview in state
	};

	const handleDeleteJob = async(e, jobId, jobCompany, jobTitle) => {
		e.preventDefault();
		const response =await deleteJob(jobId, jobCompany, jobTitle); //Delete job from the database
		if (!response.cancelled){
			removeJobCallBack(jobId); //RemoveJob from the jobs state
		}
	};
	
	//Command Patterns(array of objects) -> Maps actions(hander) to identifier(label)
	const statusOptions = [
		{label: 'Active', handler: handleUpdateActive},
		{label: 'Rejected', handler: handleUpdateRejected},
		{label: 'Interview', handler: handleUpdateInterview}
	];

	const countJobStatus = () => {
		const totalJobs = jobsState.length;
		const activeCount = jobsState.filter(job => job.status === 'Active').length;
		const rejectedCount = jobsState.filter(job => job.status === 'Rejected').length;
		const interviewCount = jobsState.filter(job => job.status === 'Interview').length;
		const statusCount = {total: totalJobs, active: activeCount, rejected: rejectedCount, interview: interviewCount};
		
		return statusCount;
	};

	const toggleTotal = (e) => {
		if (!showStatus.total){
			setShowStatus({total: true, active: true, rejected: true, interview: true });
		}
	};

	const toggleActive = (e) =>{
		if (showStatus.total && showStatus.active && showStatus.rejected && showStatus.interview){
			setShowStatus({...showStatus, total:false, active:false});
			return;
		}

		if (!showStatus.total && !showStatus.active && showStatus.rejected && showStatus.interview){
			setShowStatus({...showStatus, total: true, active:true});
			return;
		}

		setShowStatus({...showStatus, active: !showStatus.active});
	};

	const toggleRejected = (e) =>{
		if (showStatus.total && showStatus.active && showStatus.rejected && showStatus.interview){
			setShowStatus({...showStatus, total:false, rejected:false});
			return;
		}

		if (!showStatus.total && showStatus.active && !showStatus.rejected && showStatus.interview){
			setShowStatus({...showStatus, total: true, rejected: true});
			return;
		}

		setShowStatus({...showStatus, rejected: !showStatus.rejected});
	};

	const toggleInterview = (e) => {
		if (showStatus.total && showStatus.active && showStatus.rejected && showStatus.interview){
			setShowStatus({...showStatus, total:false, interview:false});
			return;
		}

		if (!showStatus.total && showStatus.active && showStatus.rejected && !showStatus.interview){
			setShowStatus({...showStatus, total: true, interview: true});
			return;
		}

		setShowStatus({...showStatus, interview: !showStatus.interview});
	};

	const formatDate = (date) => {
		const [yyyy, mm, dd] = date.split('-');
		const formatDate = `${mm}/${dd}/${yyyy}`;
		return formatDate;
	};
	
	const jobsList = 
		jobsState
			.filter(job => showStatus[job.status.toLowerCase()])
			.sort((a,b) => { //swap a and b object if 1 is returned
				if (sortBy === 'newest'){
					return b.date.localeCompare(a.date);
				}
				
				if (sortBy === 'oldest'){
					return a.date.localeCompare(b.date);
				}
				
				if (sortBy === 'company: a → z'){ 
					return a.company.localeCompare(b.company); //compares 2 strings and returns -1 if first string comes before second, 0 if equal, and 1 if first string comes after second string
				}
				
				if (sortBy === 'company: z → a'){
					return b.company.localeCompare(a.company);
				}
			})
			.map(job => (
				<tr key={job.id}>
					<td>{job.company}</td>
					<td>{job.position}</td>
					<td className='jobs-table-narrow-column'>{formatDate(job.date)}</td>
					<td className='jobs-table-narrow-column'> <span className={`tag ${job.status}`}> {job.status} </span> </td>
					<td>{job.location}</td>
					<td className='jobs-table-narrow-column'> <a href={job.url} target='_blank' rel='noopener noreferrer' >link</a> </td> {/*target='_blank' opens link in new tab rel is for security*/}

					<td className="jobs-actions" style={{ position: 'relative' }}>
						<button className="dropdown-button" onClick={(e) => toggleDropdownStatus(e, job.id)}> Edit ▼ </button>
							{openDropdownId === job.id && (       
								<div className="test-dropdown-menu" style={{ top: dropdownCoords.top, left: dropdownCoords.left }}>
									{statusOptions
										.filter(option => option.label != job.status)
										.map(option => (
											<div key={option.label} className='dropdown-item' onClick={(e) => option.handler(e, job.id)}>{option.label}</div>
									))}

									<div className="dropdown-item" onClick={(e) => handleDeleteJob(e, job.id, job.company, job.position)}>Delete</div>
								</div>
							)}
					</td>
				</tr>
		));

	return (
		<div className="box p-0" style={{ marginTop: '20px' }}>
			<div className="table-container jobs-table-container">
				<table className="table is-fullwidth is-striped is-hoverable">
					<thead>
						<tr className='has-text-centered'>
							<th colSpan='1' className='has-text-centered'>
								<div class="control mt-1">
									<input type="checkbox" checked={showStatus.total} onChange={toggleTotal} style={{ marginRight:'0.5em'}}/>
									Total: {countJobStatus().total}
								</div>
							</th>

							<th colSpan='1' className='has-text-centered'> 
								<div class='control mt-1'>
									<input type='checkbox' checked={showStatus.active} onChange={toggleActive} style={{ marginRight:'0.5em'}}/>
									Active: {countJobStatus().active} 
								</div>
							</th>

							<th colSpan="2" className="has-text-centered">
								<div class='control mt-1'>
									<input type='checkbox' checked={showStatus.rejected} onChange={toggleRejected} style={{ marginRight:'0.5em'}}/>
									Rejected: {countJobStatus().rejected}
								</div>
							</th>

							<th colSpan='1' className='has-text-centered'>
								<div class='control mt-1'>
									<input type='checkbox' checked={showStatus.interview} onChange={toggleInterview} style={{ marginRight:'0.5em'}}/>
									Interviews: {countJobStatus().interview}
								</div>
							</th>

							<th colSpan='2' className='has-text-centered'>
								<div class='control mt-1'>
									<button className="sort-by-dropdown" onClick={toggleDropdownSort}> Sort By: {sortBy} ▼ </button>
									{openDropdownId === 'sort' && (
										<div className='test-dropdown-menu' style={{top: dropdownCoords.top, left: dropdownCoords.left}}>
											<div className='sort-by-dropdown-item' onClick={ () => setSortBy('newest')}>newest</div>
											<div className='sort-by-dropdown-item' onClick={ () => setSortBy('oldest')}>oldest</div>
											<div className='sort-by-dropdown-item' onClick={ () => setSortBy('company: a → z')}>company: a → z</div>
											<div className='sort-by-dropdown-item' onClick={ () => setSortBy('company: z → a')}>company: z → a</div>
										</div>
									)}
								</div>
							</th>
						</tr>

						<tr>
							<th style={{ width: '20%' }} >Company</th>
							<th style={{ width: '20%' }} >Position</th>
							<th style={{ width: '10%' }} >Date</th>
							<th style={{ width: '10%' }} >Status</th>
							<th style={{ width: '20%' }} >Location</th>
							<th style={{ width: '10%' }} >URL</th>
							<th style={{ width: '10%' }} >Actions</th>
						</tr>
					</thead>

					<tbody>
						{jobsList}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default JobsList;

