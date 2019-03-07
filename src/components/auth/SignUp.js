import React, { Component } from 'react'
import './style.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Spinner } from "@blueprintjs/core";

export class SignUp extends Component {

    componentDidMount() {
    }
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        lists: []
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signUp(this.state);
    }
    render() {
        const { auth, authError, loadingUser } = this.props;
        if (auth.uid) {
            // returning redirect 
            return <Redirect to='/dashboard' />
        }
        return (
            <div className="login_wrapper">
                
                <div className="signup_container">
                    <form className="login_form" onSubmit={this.handleSubmit}>
                        <div className="signup_title">Sign up</div>
                        <div className="signup_subtitle">for creating private lists</div>
                        <div className="login_component">
                            <label class="field a-field a-field_a1 page__field">
                                <input class="field__input a-field__input" type="text" id="firstName" autoFocus placeholder="first name" onChange={this.handleChange} required autofocus />
                                <span class="a-field__label-wrap">
                                    <span class="a-field__label">First name</span>
                                </span>
                            </label>
                            <label class="field a-field a-field_a2 page__field">
                                <input class="field__input a-field__input" type="text" id="lastName" placeholder="last name" onChange={this.handleChange} required />
                                <span class="a-field__label-wrap">
                                    <span class="a-field__label">Last name</span>
                                </span>
                            </label>
                        </div>

                        <div className="login_component">
                            <label class="field a-field a-field_a3 page__field">
                                <input class="field__input a-field__input" type="email" id="email" placeholder="email" onChange={this.handleChange} required />
                                <span class="a-field__label-wrap">
                                    <span class="a-field__label">E-mail</span>
                                </span>
                            </label>
                            <label class="field a-field a-field_a3 page__field">
                                <input class="field__input a-field__input" type="password" placeholder="password" id="password" onChange={this.handleChange} required />
                                <span class="a-field__label-wrap">
                                    <span class="a-field__label">Password</span>
                                </span>
                            </label>
                        </div>
                        <div className="btn_container">
                            <button className="btn">
                                Sign up
                            </button>

                        </div>
                        <div className="display__error">
                            {(authError && !loadingUser) ? <p>{authError}</p> : null}
                        </div>
                        <div className="display__error">
                            {loadingUser ? <Spinner intent="warning" /> : null}
                        </div>
                    </form>
                </div>

                <div className="login_picture">
                    <div className="login_title">INSTANOTE</div>
                    <div className="login_item">Why sign up?</div>
                    <div className="login_item">Make lists private</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
            loadingUser: state.auth.loadingUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)