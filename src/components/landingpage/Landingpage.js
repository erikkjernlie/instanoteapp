// class state component
import React, { Component } from 'react'
import Header from './Header';
import ImageSlider from './ImageSlider';
import step1 from '../../assets/images/step1.jpg'
import step2 from '../../assets/images/step2.jpg'
import step3 from '../../assets/images/step3.jpg'
import user from '../../assets/images/user.png'
import user1 from '../../assets/images/user_1.png'
import user2 from '../../assets/images/user_2.png'
import user3 from '../../assets/images/user_3.png'

import what_personal from '../../assets/images/what_personal.jpg'
import what_shopping from '../../assets/images/what_shopping.jpg'
import what_wishinglist from '../../assets/images/what_wishinglist.jpg'
import Fade from 'react-reveal/Fade';
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

            <div className="landingpage__container">
                <div className="landingpage__wrapper">
                </div>

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
                        <div className="section_imageslider">
                            <ImageSlider />

                        </div>
                        <div className="steps__image__slider">
                            <img src={step1} className="step" alt="personal" />
                            <img src={step2} className="step" alt="shopping" />
                            <img src={step3} className="step" alt="wishing list" />
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
                <div className="section4">
                    <Fade bottom>

                        <div className="title">Do I need to create a user?</div>

                        <img src={user} className="user" alt="wishing list" />
                        <div className="users">
                            <img src={user1} className="small_user" alt="wishing list" />
                            <img src={user2} className="small_user" alt="wishing list" />
                            <img src={user3} className="small_user" alt="wishing list" />

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
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Landingpage)