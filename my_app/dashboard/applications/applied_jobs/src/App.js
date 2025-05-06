//App.js
import React, {useContext} from 'react';
import Header from './components/header/Header.js';
import DashboardHome from './components/header/DashboardHome.js';
import ApplicationDropdown from './components/header/ApplicationDropdown.js';
import ProfileDropdown from './components/header/ProfileDropdown.js';

import { UserProvider, UserContext } from './context/UserContext';

function Username() {
	const { username } = useContext(UserContext);

	return <>{username}</>;
}

function App() {
	return (
		<UserProvider>
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
							<a class="navbar-link has-text-white">
				    				<Username />
							</a>
							<ProfileDropdown className="navbar-item gray-background has-text-white" />
						</div>
                    			</div>
                		</div>
            		</nav>
        	</div>
		</section>
		</UserProvider>
	);
}

export default App;
