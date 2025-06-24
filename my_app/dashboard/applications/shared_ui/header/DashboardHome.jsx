//DashboardHome.js
import React from 'react';

const DashboardHome = () => { //Defines a functional component called LogoutButton
        const handleDashboardHome = () =>{
                window.location.href='/dashboard'
        };

        return (
                <a className="navbar-item gray-background has-text-white" onClick={handleDashboardHome}>Home</a>
        );
};

export default DashboardHome;

