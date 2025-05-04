//App.js
import React from 'react';
import DashboardHome from './components/DashboardHome';
import ApplicationDropdown from './components/ApplicationDropdown';
import ProfileDropdown from './components/ProfileDropdown';

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
								
								<ApplicationDropdown className="navbar-item gray-background has-text-white" />
			    				</div>
						</div>

						<div className="navbar-end">
							<ProfileDropdown className="navbar-item gray-background has-text-white" />
						</div>
                    			</div>
                		</div>
            		</nav>
        	</div>
		</section>
	);
}

export default App;
