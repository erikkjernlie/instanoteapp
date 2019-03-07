import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'
import './Layout.css'


const SignedInLinks = (props) => {
    return(
        <div className="link_elements">
            <div className="link_element"><NavLink to='/dashboard'>Your lists</NavLink></div>
            <div className="link_element"><a onClick={props.signOut}>Log out</a></div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)