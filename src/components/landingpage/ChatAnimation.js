import React, { Component } from 'react';

import './ChatAnimation.scss';
import add_note from '../../assets/add_note.png'
import Fade from 'react-reveal/Fade';

export default class ChatAnimation extends Component {

  state = {
    messages: [
      'My first message',
      'My second message',
      'My third message',
    ],
    number0: false,
    number1: false,
    number2: false,
    clicked: false,
    addNote: false,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentDidUpdate(prevState, prevProps) {
    console.log("PROPS CHANGED", this.props.showChat)
    if (prevProps !== this.props.showChat) {
      setTimeout(() => {
        this.setState({
          clicked: true,
        })
        setTimeout(() => {
          this.setState({
            addNote: true,
          })
        }, 4000);
      }, 15000);
    }
  }

  change = (id) => {
    console.log(id)
  }


  render() {

    return (
      <div>
        <div className="landing__title__chat">Chat system</div>
        
        <div className="landing__subtext">We implemented a simple chat system so you can easily chat with whomever 
        you want - without creating a user. You can easily store messages to your notes by clicking on them.</div>
        
        <div  className="chatAnimation">
                <div className="weight">
                  <div className="chat__cont">

                    <div className="item__wrapper yellow">
                      Remember there is a party at our place in 5472 Del Playa road tonight at 6pm.
                    </div>
                    <div className="item__wrapper yellow">
                      Can you buy milk for me on the way home from school?
                    </div>
                    <div className="item__wrapper yellow">
                      Remember to buy a calculator to the exam
                    </div>
                    <div className="item__wrapper yellow">
                      Every message can be stored here
                    </div>
                    
                    {this.state.addNote ? 
                      <Fade bottom>
                    
                    <div className="item__wrapper yellow">
                      
                    Simply click on a message you want to remember in your instanote-page to store it to your notes.
                    </div> 
                    </Fade>: null}
                  </div>
                </div>
                <div className="chat_wrapper weight2">

                  <div class="container__chat__landingpage">
                    <div class="card">
                      <div class="card-body">
                        <div class="chat-thread">
              
                          <div class="message" id="1">
                            <div class="message-content">
                              <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                              <p>Welcome to Instanote.</p>
                            </div>
                          </div>


                          <div class="message message-reply" id='2'>
                            <div class="message-content">
                              <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                              <p>Thanky you! Seems like this website has a lot of bugs</p>
                            </div>
                          </div>


                          <div class="message" id='3'>
                            <div class="message-content">
                              <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                              <p>That's correct, but did you know there is a chat system at every instanote-page?</p>


                            </div>
                          </div>

                          <div class="message" id='4'>
                            
                            <div class="message-content">
                              <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                              {this.state.clicked
                                ?
                                <div className="flex_messenger">
                                  <div className="flex_messenger__text">
                                    <div>Simply click on a message you want to remember in your instanote-page to store it to your notes.</div>
                                  </div>
                                  <div className="flex_messenger__click" onClick={this.change("hello")}>
                                    <img src={add_note} className="add_note_img" alt="add note" />
                                  </div>
                                </div>
                                : <div>
                                <p>Simply click on a message you want to remember in your instanote-page to store it to your notes. </p> 
                                </div>

                              }
                            </div>
                          </div>





                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
      </div>

    )
  }
}





