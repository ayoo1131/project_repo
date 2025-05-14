//UserInput.js
import React, {useState} from 'react';
import { validateUserInput } from './utils/user_input/ValidateUserInput'


const UserInput = () =>{
	const [userInput, setUserInput] = useState({ //State for user entered form values
		company:'', position:'', date:'', location:'', url:''
	});

	const [errors, setErrors] = useState({ //State for errors with user entered values
		company:'', position:'', date:'', location:'', url:''
	});

	const handleClear = () => { //Remove all the text from the input fields and clear all errors
		setUserInput({ company:'', position:'', date:'', location:'', url:''});
		setErrors({company:'', position:'', date:'', location:'', url:''});
	};

	const handleAddJob = (e) => { // 'e'=event object
		e.preventDefault(); //Stops browser's default form submission which refreshes the page. Essential for React form handling
		
		//Validate User Input
		const errors = validateUserInput(userInput);
		setErrors(errors);	
	};

        return(
		<div class='container has-text-centered'>
			<form id="jobForm" class="box">
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
                          				</div>
                        			</div>
                        
                        			<div class="column date-column">
                            				<div class="field is-small">
                               					<label class="label">Date</label>
                               					<div class="control">
                                 					<input
										class="input is-small"
										type="date"
										value={userInput.date}
										onChange={(e) => setUserInput({...userInput, date:e.target.value})}
									/>
                                				</div>
								<div class="control mt-2">
									<label class="checkbox">
                                                                        	<input type="checkbox"/>
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
