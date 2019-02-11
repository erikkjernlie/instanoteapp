import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

export class SignIn extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        textSum: ''
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var texting = 'So cool. Damageplan was an American heavy metal supergroup from Dallas, Texas, formed in 2003. Following the demise of their previous group Pantera, brothers Dimebag Darrell and Vinnie Paul started a new band with bassist Bob Kakaha and vocalist Patrick Lachman, a guitarist formerly with Diesel Machine and Halford. They released their only studio album, New Found Power, in the United States on February 10, 2004; it debuted at number 38 on the Billboard 200. Later that year Damageplan was promoting the album at a concert at the Alrosa Villa in Columbus, Ohio, when a man climbed on stage, killed Darrell and three others, and wounded another seven before being fatally shot by a police officer. Some witnesses said that the assailant blamed the brothers for Pantera. why?';
        var summarizer = require('nodejs-text-summarizer')
        var text = summarizer(texting)
        this.setState({
            loading: true,
            textSum: text
          })
        this.props.signIn(this.state)
    }
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) {
            // returning redirect 
            return <Redirect to='/create' />
        }
        const { loading, textSum } = this.state;
        return (
            <div className="login_container">
                <form className="login_form" onSubmit={this.handleSubmit}>
                
                    <div className="signup_title">Sign in</div>

                    <h3>{textSum}</h3>
                    <div className="input_field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="email" onChange={this.handleChange} />
                    </div>
                    <div className="input_field">
                        <label htmlFor="password">Passsword</label>
                        <input type="password" placeholder="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input_field">
                        <button className="btn">
                            Login
                        </button>
                        { loading && authError==null ? <div class="lds-facebook"><div></div><div></div><div></div></div> : null }

                        <div>
                            { authError ? <p>{authError}</p> : null }
                        </div>
                    </div>
                </form>
                <div className="login_picture">
                hehe
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // auth property in auth reducer
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

// map dispatch from this component
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
// first parameter is mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps )(SignIn)