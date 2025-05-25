//Header.js

import React, {useContext}  from 'react';
import ApplicationDropdown from './ApplicationDropdown.js';
import DashboardHome from './DashboardHome.js';
import ProfileDropdown from './ProfileDropdown.js';

import { UserProvider, UserContext } from '../../context/UserContext.js';

function Username() {
	const { username } = useContext(UserContext);

	return <>{username}</>;
}

const Header = () => {
	return (
	<UserProvider>
	<div class="hero-head">
            	<nav class="navbar">
                	<div class="container">
                    		<div id="navbarDashboard" class="navbar-menu">
					<div class="navbar-start">
			    			<DashboardHome className="navbar-item gray-background has-text-white" />
						
	       					<div class="navbar-item has-dropdown is-hoverable">
							<a class="navbar-link gray-background has-text-white">
                                				Applications
        				                </a>
							
	
	       						<ApplicationDropdown className="navbar-item gray-background has-text-white" />
			    			</div>
	       				</div>
					
					<div class="navbar-center">
						<div class="navbar-item navbar-app-name-centered">
							<strong className="has-text-white is-size-3">Applied Jobs</strong>
						</div>
					</div>

	       				<div className="navbar-end">
						<div class="navbar-item has-dropdown is-hoverable">
							<a class="navbar-link gray-background  has-text-white">
				    				<Username />
							</a>
							<ProfileDropdown className="navbar-item gray-background has-text-white" />
						</div>
					</div>
                    		</div>
               		</div>
          	</nav>
        </div>
	</UserProvider>
	);
};

export default Header;
