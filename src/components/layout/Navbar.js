import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import './Layout.css'
import { connect } from 'react-redux'


const Navbar = (props) => {
    const { auth, profile } = props;
    // console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    return (
        <div>
            <div className="navbar_elements">
                <div className="navbar_element">
                    <Link to="/">Instanote</Link>
                </div>
                { links }
            </div>
        </div>


    )
}

const mapStateToProps = (state) =>{
    console.log(state);
    // console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)