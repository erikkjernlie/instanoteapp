import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Spinner } from "@blueprintjs/core";

export class SignIn extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    componentDidMount() {

    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        console.log('PRESSED SUBMIT')
        e.preventDefault();
        this.setState({
            loading: true,
        })
        this.props.signIn(this.state)
    }
    render() {
        const { authError, auth, loadingUser } = this.props;
        const { loading } = this.state;
        if (auth.uid) {
            // returning redirect 
            return <Redirect to='/dashboard' />
        }
        return (

            <div className="login_container">
                <form onSubmit={this.handleSubmit}>
                    <div className="login__title--popover">Sign in</div>
                    <div className="login_component">
                        <label className="field a-field a-field_a2 page__field margin__bottom">
                            <input className="field__input a-field__input" type="email" id="email" autoFocus placeholder="email" onChange={this.handleChange} required />
                            <span className="a-field__label-wrap">
                                <span className="a-field__label">E-mail</span>
                            </span>
                        </label>
                        <label className="field a-field a-field_a2 page__field margin__bottom">
                            <input className="field__input a-field__input" type="password" placeholder="password" id="password" onChange={this.handleChange} required />
                            <span className="a-field__label-wrap">
                                <span className="a-field__label">Password</span>
                            </span>
                        </label>
                    </div>
                    <div className="btn_container--fullwidth">
                        <Button type="submit" className="btn--fullwidth">
                            Login
                        </Button>
                    </div>
                    <div className="display__error">
                        {(authError && !loadingUser) ? <p>{authError}</p> : null}
                    </div>
                    <div className="display__error">
                        {loadingUser ? <Spinner intent="warning" /> : null}
                    </div>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // auth property in auth reducer
        authError: state.auth.authError,
        auth: state.firebase.auth,
        loadingUser: state.auth.loadingUser
    }
}

// map dispatch from this component
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
// first parameter is mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)