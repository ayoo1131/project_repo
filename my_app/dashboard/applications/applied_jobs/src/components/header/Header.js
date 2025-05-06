//Header.js

import React from 'react';
import ApplicationDropdown from './ApplicationDropdown.js';
import DashboardHome from './DashboardHome.js';
import ProfileDropdown from './ProfileDropdown.js';

const Header = () => {
	<section class="hero is-fullheight">
        	<div class="hero-head">
            		<nav class="navbar">
                		<div class="container">
                    			<div id="navbarDashboard" class="navbar-menu">
						<div class="navbar-start">
			    				<DashboardHome className="navbar-item gray-background has-text-white" />
						</div>
                    			</div>
                		</div>
            		</nav>
        	</div>
	</section>

};

export default Header;
