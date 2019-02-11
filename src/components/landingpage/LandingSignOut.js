import React from 'react';
import { NavLink } from 'react-router-dom';

const LandingSignOut = () => {
    return(
        <div className="link_elements">
            <div className="link_element"><NavLink to='/signup'> LANDING Get started for free</NavLink></div>
            <div className="link_element"><NavLink to='/signin'> LANDING Login</NavLink></div>
        </div>
    )
}

export default LandingSignOut