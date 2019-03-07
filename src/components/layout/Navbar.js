import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import './Layout.css'
import { connect } from 'react-redux'
import SignIn from '../auth/SignIn'
import { signOut } from '../../store/actions/authActions'
import { Intent, Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";





class Navbar extends Component {

    constructor(props) {
        super(props);
    }
    // console.log(auth);
    componentWillMount() {
        if (window.location.href.includes('/chat/')) {
            this.setState({
                instaChat: true,
            })
        } else if (window.location.href.endsWith('/chat')) {
            this.setState({
                instaChat: true,
            })
        }

    }

    state = {
        hamburger: false,
        login: false,
        instaChat: false,
    }
    viewHamburger = () => {
        this.setState({
            hamburger: !this.state.hamburger,
        })
    }

    viewLogin = () => {
        this.setState({
            login: !this.state.login,
        })
    }
    render() {

        const links = this.props.auth.uid ? <SignedInLinks profile={this.props.profile} /> : <SignedOutLinks />;
        return (
            <div className="navbar_elements">
                <div className="navbar_element type__nav">
                    <Link to="/"><div className="type"><h3>{this.state.instaChat ? <span>Instachat</span> : <span>Instanote</span>}</h3></div></Link>
                </div>
                <div className="navbar__links">
                    {links}
                </div>
                {this.props.auth.uid ?
                    <div className={"navbar__hamburger" + (this.state.hamburger ? " active" : " inactive")}>
                        <div className="div" onClick={this.viewHamburger}>
                            <svg className={"ham hamRotate ham4" + (this.state.hamburger ? " active" : "")} viewBox="0 0 100 100" width="80">
                                <path
                                    className="line top"
                                    d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                                <path
                                    className="line middle"
                                    d="m 70,50 h -40" />
                                <path
                                    className="line bottom"
                                    d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                            </svg>

                        </div>
                        <div className="navbar__content">
                            {this.state.hamburger ? <div className="hamburger__items">


                                <div className="hamburger__item"><a href="dashboard">Your lists</a></div>
                                <div className="hamburger__item"><a onClick={this.props.signOut}>Sign out</a></div>
                            </div> : null}
                        </div>
                    </div>


                    :

                    <div className={"navbar__hamburger" + (this.state.hamburger ? " active" : " inactive")}>
                        <div className="div" onClick={this.viewHamburger}>
                            <svg className={"ham hamRotate ham4" + (this.state.hamburger ? " active" : "")} viewBox="0 0 100 100" width="80">
                                <path
                                    className="line top"
                                    d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                                <path
                                    className="line middle"
                                    d="m 70,50 h -40" />
                                <path
                                    className="line bottom"
                                    d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                            </svg>

                        </div>
                        <div className="navbar__content">
                            {this.state.hamburger ? <div className="hamburger__items">
                                <div className={(this.state.login) ? "" : "hamburger__item"} onClick={this.viewLogin}>{(this.state.login) ?
                                    <div className={(this.state.login) ? "hamburger__signin" : "hamburger__signin__not"}>
                                        <SignIn />
                                    </div> : <div>Sign in</div>}</div>


                                <div className="hamburger__item"><a href="signup">Get started for free</a></div>
                            </div> : null}
                        </div>
                    </div>
                }
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)