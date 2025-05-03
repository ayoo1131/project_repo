//App.js
import React from 'react';
import LogoutButton from './components/LogoutButton'; 
import DashboardHome from './components/DashboardHome';

function App() {
	return (
		<section class="hero is-fullheight">
        	<div class="hero-head">
            		<nav class="navbar">
                		<div class="container">
                    			<div id="navbarDashboard" class="navbar-menu">
						<div class="navbar-start">
			    				<DashboardHome className="navbar-item gray-background has-text-white" />
			    
			    				<div class="navbar-item has-dropdown is-hoverable">
			    					<a class="navbar-link has-text-white">
				    					Applications
								</a>

								<div class="navbar-dropdown">
				    					<a href="{{ url_for('dashboard.cover_letter.cover_letter_home')}}" class="navbar-item gray-background has-text-white">
										Cover Letter
				    					</a>
				   
				   	 				<a href="{{ url_for('dashboard.cover_letter.cover_letter_home')}}"  class="navbar-item gray-background has-text-white">
										Applied Jobs
				    					</a>
								</div>
			    				</div>
						</div>

						<div className="navbar-end">
					    		<div className="navbar-item">
						    		<LogoutButton className="button is-danger"/>
			    				</div>
						</div>
                    			</div>
                		</div>
            		</nav>
        	</div>
		</section>
	);
}

export default App;
