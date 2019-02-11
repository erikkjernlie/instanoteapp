// class state component
import React, { Component } from 'react'
import Header from './Header';
import step1 from '../../assets/images/step1.jpg'
import step2 from '../../assets/images/step2.jpg'
import step3 from '../../assets/images/step3.jpg'
import what_personal from '../../assets/images/what_personal.jpg'
import what_shopping from '../../assets/images/what_shopping.jpg'
import what_wishinglist from '../../assets/images/what_wishinglist.jpg'
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import LandingSignIn from './LandingSignIn'
import LandingSignOut from './LandingSignOut'
import { connect } from 'react-redux'

class Landingpage extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { auth } = this.props;
    // console.log(auth);
        // const links = auth.uid ? <LandingSignIn /> : <LandingSignOut />;
        // { links } down below
        // 
        // console.log(this.props)

        return (
            
            <div>
                <Header />
                <div className="section1">
                <Fade bottom>
                <div className="title">How does instanote work?</div>
                <div className="subtext">
                Instanote lets you create online shareable lists in seconds, without creating
            an account. With instanote, you can
            either create your own lists for personal use or you can share it between your friends - maybe you need a
            shareable
            shopping list for your household or your next party? Maybe you want to write down movies you want to see or
            things
            to you need to do later on? Instanote makes it easy to write down whatever you want, with access for any
            device
            you might use, without having an account. To share it, simply paste the URL and send it to whomever you
            want.

                </div>
                </Fade>
                <Fade bottom>

                    <div className="steps">
                    <img src={step1} className="step" alt="step1" />
                    <img src={step2} className="step" alt="step2" />
                    <img src={step3} className="step" alt="step3" />
                    </div>
                    </Fade>
                </div>
                <div className="section2">
                <Fade bottom>

                    <div className="title">What can I use it for?</div>

                    <div className="subtext">Use it for whatever you want blabla</div>
                </Fade>

                <Fade bottom>

                    <div className="steps">
                        <img src={what_personal} className="step" alt="personal" />
                        <img src={what_shopping} className="step" alt="shopping" />
                        <img src={what_wishinglist} className="step" alt="wishing list" />
                    </div>
                    </Fade>
                </div>
                <div className="section3">
                <Fade bottom>

                    <div className="title">Contact or questions</div>
                    </Fade>
                <Fade bottom>

                    <div className="contact-text">
                        <div className="contact-instanote">
                        takeinstantnotesatinstanote@gmail.com

                        </div>
                        <div className="contact-space">
                        or if the email address was too long

                        </div>
                        <div className="contact-instanote">
                        www.instanote.no/feedback

                        </div>
                    </div>
                    </Fade>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    // console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Landingpage)