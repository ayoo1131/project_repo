//DashboardHome.js
import React from 'react';

const DashboardHome = ({className}) => { //Defines a functional component called LogoutButton
        const handleDashboardHome = () =>{
                window.location.href='/dashboard'
        };

        return (
                <a className={className} onClick={handleDashboardHome}>Home</a>
        );
};

export default DashboardHome;

