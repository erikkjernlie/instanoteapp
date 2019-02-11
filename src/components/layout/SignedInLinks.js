import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'


const SignedInLinks = (props) => {
    return(
        <div className="link_elements">
            <div className="link_element"><NavLink to='/create'>New project</NavLink></div>
            <div className="link_element"><a onClick={props.signOut}>Log out</a></div>
            <div className="link_element initials"><NavLink to='/'>{props.profile.initials}</NavLink></div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)