import React, { Component } from 'react'
import { connect } from 'react-redux'
import './chat.css'
import { Button } from 'react-bootstrap';
import { joinChat } from '../store/actions/chatActions'
import { addMessage } from '../store/actions/chatActions'
import { subToChat } from '../store/actions/chatActions'



class Chat extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        message: '',
        name: window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1),
    }

    componentWillMount() {
        this.props.subToChat(this.state);

        this.props.joinChat({
            name: window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)
        })
        console.log('MOUNTING');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('SUBMMIT')
        this.props.addMessage(this.state)
        this.setState({
            message: ''
        });

    }


    render() {
        const { requestingChat, joinChatFailureMessage, messages, data } = this.props;
        return (
            <div className="chat__wrapper">
                <div className="chat__title">Title</div>
                <div className="chat__container">
                    <div>
                        Chat
                    {requestingChat ? <p>Trying to join chat</p> : <p>Joined chat</p>}
                        <div>{data ? <div>got data</div> : <div>do not have data</div>}</div>

                        {data.messages && data.messages.map(message => {
                            //projects in case we don't have any projects
                            // IF CORRECT ID HERE
                            // let newList = lists[list]
                            //console.log(newList)
                            // let firestoreList = ..
                            return (
                                <div key={message}>
                                    {message}
                                </div>
                            )
                        })}
                    </div>

                    
                </div>
                <div className="chat__form">
                <form onSubmit={this.handleSubmit} className="project_form">
                        <div>
                            <input className="input_field" type="text" id="message" placeholder="type text" onChange={this.handleChange} autoFocus />
                        </div>

                        <div>
                            <Button type="submit" className="create_list__btn">
                                Send message
                                    </Button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        // number: state.project.number;
        requestingChat: state.chat.requestingChat,
        messages: state.chat.messages,
        joinChatFailureMessage: state.chat.joinChatFailureMessage,
        data: state.chat.data,

    }
}

// dispatch() is the method used to dispatch actions and trigger state changes to the store
const mapDispatchToProps = (dispatch) => {
    return {
        // change the value here
        joinChat: (chat) => dispatch(joinChat(chat)),
        addMessage: (message) => dispatch(addMessage(message)),
        subToChat: (sub) => dispatch(subToChat(sub)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)