//UserInput.js
import React, {useState} from 'react';
import { validateUserInput } from './utils/user_input/ValidateUserInput';
import { insertJob } from './utils/user_input/InsertJob';
import { formatToday } from './utils/user_input/FormatToday';

const UserInput = ({addJobCallBack}) =>{
	const [userInput, setUserInput] = useState({ //State for user entered form values
		company:'', position:'', date_time_applied:'', location:'', url:'', useToday:false, status:'Active'
	});

	const [errors, setErrors] = useState({ //State for errors with user entered values
		company:'', position:'', date_time_applied:'', location:'', url:''
	});

	const [successfulAdd, setSuccessfulAdd] = useState(false); //State to track if job was successfully added. controls sucess message
		
	const toggleSuccessfulAdd = () =>{//Sets the state for successful added to opposite of current status
		setSuccessfulAdd(!successfulAdd);
	};

	const handleClear = () => { //Remove all the text from the input fields and clear all errors
		setUserInput({ company:'', position:'', date_time_applied:'', location:'', url:'', useToday:false});
		setErrors({company:'', position:'', date_time_applied:'', location:'', url:''});
		setSuccessfulAdd(false);
	};

	const handleAddJob = async(e) => { // 'e'=event object
		e.preventDefault(); //Stops browser's default form submission which refreshes the page. Essential for React form handling
		
		//Validate User Input
		const errors = validateUserInput(userInput);
		setErrors(errors);

		//No errors with User Input, Save job to DB and Upload Job to Job List 
		if (Object.keys(errors).length ===0){
			const newJobId = await insertJob(userInput); //Insert Job into job table in db.sqlite
			const updatedUserInput ={...userInput, id:newJobId};
			setUserInput(updatedUserInput); //React’s setState (setUserInput) is asynchronous. So userInput still has the old value when you call addJobCallBack(userInput). 
			//Instead of relying on setUserInput immediately updating userInput, just construct and use the updated object directly
			addJobCallBack(updatedUserInput);//Add job to the job list
			handleClear(); //Clear all the user input
			toggleSuccessfulAdd(); //Turn the Successfully Added message on
			setUserInput({company:'', position:'', date_time_applied:'', location:'', url:'', useToday:false, status:'Active'});
		}
	};

	const handleToday = (e) => {
		const useToday = e.target.checked;//returns true or false depending on whether the checkbox is clicked or not
		
		if (useToday){
			const todayDate = new Date().toLocaleDateString();
			const todayDateISO = formatToday(todayDate);
			setUserInput({...userInput, date_time_applied:todayDateISO, useToday:true});
		}

		else{
			setUserInput({...userInput, date_time_applied:'', useToday:false});
		}
	};

        return(
		<div className="container has-text-centered">
			<form id="jobForm" className='box user-input-top-bottom-margins'>
               			{successfulAdd && <p className="has-text-success">Job Successfully Added!</p>}
				<div class="form-section">
                    			<div class="columns is-mobile">
                        			<div class="column">
                            				<div class="field is-small">
                                				<label class="label">Company</label>
                                				<div class="control">
                                    					<input
										class="input is-small" 
										type="text" 
										placeholder="Company"
										value={userInput.company}
										onChange={(e) => setUserInput({...userInput, company:e.target.value})}
									/>
                               					</div>
								{errors.company && (<p className="help is-danger">{errors.company}</p>)}
                         				</div>
                        			</div>

						<div class="column">
                            				<div class="field is-small">
                                				<label class="label">Job Title</label>
                                				<div class="control">
                                    					<input 
										class="input is-small" 
										type="text" 
										placeholder="Title"
										value={userInput.position}
										onChange={(e)=> setUserInput({...userInput, position:e.target.value})}
									/>
                               					</div>
								{errors.position && (<p className="help is-danger">{errors.position}</p>)}
                          				</div>
                        			</div>
                        
                        			<div class="column date-column user-input-date">
                            				<div class="field is-small">
                               					<label class="label">Date Applied</label>
                               					<div class="control">
                                 					<input
										class="input is-small"
										type="date"
										value={userInput.date_time_applied}
										onChange={(e) => setUserInput({...userInput, date_time_applied:e.target.value})}
									/>
                                				</div>
								{errors.date_time_applied && (<p className="help is-danger"> {errors.date_time_applied}</p>)}
								
								<div class="control mt-2">
									<label class="checkbox">
                                                                        	<input type="checkbox" onChange={handleToday} checked={userInput.useToday}/>
                                                                        	<span class="ml-2">Today</span>
                                                                	</label>
								</div>
                            				</div>
                        			</div>
                        
                        			<div class="column is-narrow">
                            				<div class="field is-small">
                                				<label class="label">Location</label>
                                				<div class="control">
                                    					<input
										class="input is-small" 
										type="text" 
										placeholder="City, State"
										value={userInput.location}
										onChange={(e)=> setUserInput({...userInput, location:e.target.value})}
									/>
                               					</div>
								{errors.location && (<p className="help is-danger"> {errors.location}</p>)}
                           				</div>
                        			</div>
                        
                        			<div class="column">
                            				<div class="field is-small">
                                				<label class="label">URL</label>
                                				<div class="control">
                                    					<input 
										class="input is-small"
										type="text" 
										placeholder="https://" 
										value={userInput.url}
										onChange={(e) => setUserInput({...userInput, url:e.target.value})}
									/>
                                				</div>
								{errors.url && (<p className="help is-danger"> {errors.url}</p>)}
                            				</div>
                        			</div>
						<div className="column is-narrow">
                					<div className="buttons is-flex is-flex-direction-column">
                    						<button type="submit" onClick={handleAddJob} className="button is-link is-small mb-2">Add</button>
                    						<button type="button" onClick={handleClear} className="button is-link is-light is-small">Clear</button>
                					</div>
              					</div>
					</div>
				</div>
            		</form>
		</div>
        );
};

export default UserInput;
