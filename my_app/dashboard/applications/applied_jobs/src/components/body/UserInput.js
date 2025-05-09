//UserInput.js

import React from 'react';

const UserInput = () =>{
        return(
		<div class='container has-text-centered'>
			<form id="jobForm" class="box">
               			<div class="form-section">
                    			<div class="columns is-mobile is-vcentered">
                        			
                        			<div class="column">
                            				<div class="field is-small">
                                				<label class="label">Company</label>
                                				<div class="control">
                                    					<input class="input is-small" type="text" placeholder="Company"/>
                               					</div>
                         				</div>
                        			</div>

						<div class="column">
                            				<div class="field is-small">
                                				<label class="label">Job Title</label>
                                				<div class="control">
                                    					<input class="input is-small" type="text" placeholder="Title"/>
                               					</div>
                          				</div>
                        			</div>
                        
                        			<div class="column date-column">
                            				<div class="field is-small">
                               					<label class="label">Date</label>
                               					<div class="control">
                                 					<input class="input is-small" type="date" required/>
                                				</div>
								<div class="control mt-2">
									<label class="checkbox">
                                                                        	<input type="checkbox"/>
                                                                        	<span class="ml:ewq-2">Today</span>
                                                                	</label>
								</div>
                            				</div>
                        			</div>
                        
                        			<div class="column is-narrow">
                            				<div class="field is-small">
                                				<label class="label">City</label>
                                				<div class="control">
                                    					<input class="input is-small" type="text" placeholder="City"/>
                               					</div>
                           				</div>
                        			</div>
                        
                        			<div class="column">
                            				<div class="field is-small">
                                				<label class="label">URL</label>
                                				<div class="control">
                                    					<input class="input is-small" type="url" placeholder="https://"/>
                                				</div>
                            				</div>
                        			</div>
						<div className="column is-narrow">
                					<div className="buttons is-flex is-flex-direction-column">
                    						<button type="submit" className="button is-link is-small mb-2">Save</button>
                    						<button type="reset" className="button is-link is-light is-small">Clear</button>
                					</div>
              					</div>
					</div>
				</div>
            		</form>
		</div>
        );
};

export default UserInput;

