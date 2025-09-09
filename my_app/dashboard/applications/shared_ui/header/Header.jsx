//Header.js
import React, {useContext}  from 'react';
import ApplicationDropdown from './ApplicationDropdown.jsx';
import DashboardHome from './DashboardHome.jsx';
import ProfileDropdown from './ProfileDropdown.jsx';

const Header =({appName}) => {
	return (
	<div className="hero-head">
            	<nav className="navbar dark-background">
                	<div className="container">
                    		<div id="navbarDashboard" className="navbar-menu">
					<div className="navbar-start">
						<DashboardHome />
	       					<ApplicationDropdown />
	       				</div>
					
					<div className="navbar-center">
						<div className="navbar-item navbar-app-name-centered">
							<strong className="has-text-white is-size-3">{appName}</strong>
						</div>
					</div>

	       				<div className="navbar-end">
						<ProfileDropdown />
					</div>
                    		</div>
               		</div>
          	</nav>
        </div>
	);
};

export default Header;
