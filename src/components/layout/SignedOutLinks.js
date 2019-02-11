import React from 'react';
import { NavLink } from 'react-router-dom';


const SignedOutLinks = () => {
    return(
        <div className="link_elements">
            <div className="link_element"><NavLink to='/signup'>Get started for free</NavLink></div>
            <div className="link_element"><NavLink to='/signin'>Login</NavLink></div>
        </div>
    )
}

export default SignedOutLinks