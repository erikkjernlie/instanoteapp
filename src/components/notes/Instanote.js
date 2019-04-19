import React, { Component } from 'react'

import moment from 'moment'
// class state component
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { getList } from '../../store/actions/projectActions'
import { addItem } from '../../store/actions/projectActions'
import Item from './Item'
import Message from './Message'
import { ToastContainer, toast } from 'react-toastify';
import { Intent, Icon, Popover, Classes, PopoverInteractionKind, Position, Drawer } from "@blueprintjs/core";
import copy from '../../assets/copy.png'
import send from '../../assets/send.svg'
import { Spinner } from "@blueprintjs/core";
import { joinChat } from '../../store/actions/chatActions'
import { sendMessage } from '../../store/actions/chatActions'
import { subToChat } from '../../store/actions/chatActions'
import { firestoreConnect } from 'react-redux-firebase'

import {
    FacebookShareButton,
    FacebookIcon,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TwitterIcon,
    WhatsappIcon,
    GooglePlusIcon,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
} from 'react-share';
/*
    PROJECT SUMMARY WILL CONTAIN ALL THE LIST ITEMS
    So it will be
    
    name: [],
    List-items: [],
    completed: [],
    timesincelastupdate: be deleted if it is more than 3 months e.g.
    public: true or false (public when initiated), can set to private

*/


/***
 * 
 * PROBLEM ::: 
 * SITE DOES NOT ATUOMATICALLY UPDATE
 */

class Instanote extends Component {

    state = {
        item: '',
        urlName: window.location.pathname.substring(1),
        displayDeletedData: false,
        message: '',
        numberOfItems: 0,
        changedFirstTime: false,
        messages: [],
        didMount: false,
        isOpen: false,
        password: '',
        correctPassword: false,
        passwordMessage: '',
        size: Drawer.SIZE_STANDARD,
        width: window.innerWidth,

    }

    /* FOR CHAT COMPONENT
    componentDidUpdate(prevProps, prevState) {

        if (this.state.width < 700 && this.state.size !== Drawer.SIZE_LARGE) {
            this.setState({
                size: Drawer.SIZE_LARGE,
            })
        } else {
            if (this.state.width >= 700 && this.state.size !== Drawer.SIZE_STANDARD) {
                this.setState({
                    size: Drawer.SIZE_STANDARD,
                })
            }
        }

        if (this.state.messages.length > 10 && this.state.numberOfItems === 0) {
            this.setState({
                numberOfItems: (this.state.messages.length - 10),
            })

        }

        if (prevState.isOpen !== this.state.isOpen) {
            var objDiv = document.getElementById("message_div");
            console.log("obdjdiv", objDiv)
            if (objDiv) {
                console.log("AUTOMATIC SCROLL YEAH")

                objDiv.scrollTop = objDiv.scrollHeight;

            }
        }

        if (prevProps.newMessage !== this.props.newMessage) {
            let newm = this.state.messages;
            newm.push(this.props.newMessage);
            this.setState({
                messages: newm,
            }, () => {
                window.requestAnimationFrame(function () {
                    var objDiv = document.getElementById("message_div");
                    if (objDiv) {
                        objDiv.scrollTop = objDiv.scrollHeight;

                    }

                });
            })
        }
    }
    */

    componentDidMount() {
        this.setState({
            changedFirstTime: true,
            didMount: true
        })

        toast.success("Welcome. To share this list - send www.instanote.no/" + this.state.urlName + " to whomever you want", {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        var address = window.location.pathname
        var newAddress = address.substring(1);
        this.setState({
            urlName: newAddress,

        })
        this.props.getList(this.state)
        // this.props.subToChat(this.state);
        /*
        FOR CHAT COMPONENT
        this.props.joinChat({
            urlName: window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1),
            messages: this.props.messages,
        })
        */
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    /* FOR CHAT COMPONENT
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth })
    }
*/
    displayDeletedData = () => {
        this.setState({
            displayDeletedData: !this.state.displayDeletedData,
        })
    }

    copy = () => {

        toast.success("www.instanote.no/" + this.state.urlName + " added to your note to clipboard!", {
            position: toast.POSITION.BOTTOM_CENTER,
        });

        this.copyToClipboard('www.instanote.no/' + this.state.urlName);

    }

    handlePassword = () => {
        if (this.state.password.length > 0) {
            console.log("TRYING TO JOIN CHAT")
            if (this.props.listData.password === this.state.password) {
                this.setState({
                    correctPassword: true,
                    passwordMessage: '',
                })
            } else {
                this.setState({
                    passwordMessage: 'Wrong password.'
                })
            }
        }
    }

    copyToClipboard = str => {
        navigator.clipboard.writeText(str)
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    /*

    FOR CHAT COMPONENT

    handleMessageSubmit = (e) => {
        e.preventDefault();
        console.log("...", this.props.auth);
        if (this.props.auth.isEmpty !== true && this.state.message !== "") {
            if (this.props.auth.uid !== null) {
                console.log("ACTION WITH USER")
                this.props.sendMessage(this.state.message, new Date(), (this.props.profile.firstName + " " + this.props.profile.lastName), this.props.auth.uid, this.state.urlName, this.props.messages);

            }
        } else {
            console.log("ACTION WITHOUT USER")
            if (this.state.message !== "") {
                this.props.sendMessage(this.state.message, new Date(), "Guest", null, this.state.urlName, this.props.messages);

            }
        }

        this.setState({
            message: ''
        });


    }

    

    showMoreMessages = () => {

        let numberOfMessages = this.state.messages.length;
        if (this.state.numberOfItems - 5 > 0) {
            this.setState({
                numberOfItems: (this.state.numberOfItems - 5),
            })
        } else {
            this.setState({
                numberOfItems: 0,
            })
        }
    }

    showDrawer = () => {

    }

    */

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.item !== "") {
            this.props.addItem(this.state);
            this.setState({
                item: ''
            })
        }

        // MAKE SURE LISTS IT NOT EMPTY WHEN TRYING TO CREATE
        // add to the list here
        //this.props.history.push('/');
        // console.log(this.state);

    }

    handleOpen = () => {
        console.log("Handle open")


        this.setState({ isOpen: true });



    };
    handleClose = () => this.setState({ isOpen: false });
    render() {
        // console.log(this.props)
        const { lists, auth, profile, listError, urlName, listData, goals, listCreatedError, newMessage } = this.props; // object
        const { requestingChat, joinChatFailureMessage, messages, data } = this.props;
        console.log("LIST DATA", listData)
        // if not access and public

        return (
            <div className="instanote__container">
                <div className="instanote__wrapper">
                </div>

                {listData && (listData.public || listData.madeBy === auth.uid || this.state.correctPassword) ?

                    <div className="instanote__outerdiv">
                        <div className="instanote__column">
                            <form onSubmit={this.handleSubmit} className="instanote__form">

                                <input className="instanote__input" type="text" id="item" placeholder="Add a note" value={this.state.item} onChange={this.handleChange} />
                                <div onClick={this.handleSubmit} className="instanote__button">Add note

                                 <Icon icon={"add-to-artifact"} iconSize={Icon.SIZE_STANDARD} />

                                </div>

                                <Popover
                                    interactionKind={PopoverInteractionKind.CLICK}
                                    popoverClassName="bp3-popover-content-sizing"
                                    position={Position.BOTTOM}
                                >
                                    <div className="instanote__button color2">Share your list
                                 <Icon icon={"share"} iconSize={Icon.SIZE_STANDARD} />

                                    </div>

                                    <div>

                                        Do you wish to share your list?

                                    <div className="instanote__icon">
                                            <div className="instanote__share-icon-standard">
                                                <FacebookShareButton url={'www.appear.in/' + this.state.urlName} quote="Press the link to access my notes">
                                                    <FacebookIcon size={24} round={true} />
                                                </FacebookShareButton>
                                            </div>
                                            <div className="instanote__share-icon-standard">
                                                <TwitterShareButton url={'www.instanote.no/' + this.state.urlName}>
                                                    <TwitterIcon size={24} round={true} />
                                                </TwitterShareButton>
                                            </div>
                                            <div className="instanote__share-icon-standard">

                                                <LinkedinShareButton url={'www.instanote.no/' + this.state.urlName}>
                                                    <LinkedinIcon size={24} round={true} />
                                                </LinkedinShareButton>
                                            </div>
                                            <div className="instanote__share-icon-standard">

                                                <GooglePlusShareButton url={'www.instanote.no/' + this.state.urlName}>
                                                    <GooglePlusIcon size={24} round={true} />
                                                </GooglePlusShareButton>
                                            </div>
                                            <div className="instanote__share-icon-standard">

                                                <WhatsappShareButton url={'www.instanote.no/' + this.state.urlName}>
                                                    <WhatsappIcon size={24} round={true} />
                                                </WhatsappShareButton>
                                            </div>
                                            <div className="instanote__share-icon-standard">

                                                <EmailShareButton url={'www.instanote.no/' + this.state.urlName}>
                                                    <EmailIcon size={24} round={true} />
                                                </EmailShareButton>
                                            </div>

                                        </div>
                                        <div className="instanote__share-icon-copy-wrapper" onClick={this.copy}>
                                            Press here to copy your link
                                            <img className="instanote__share-icon" src={copy} alt="Copy link" />

                                        </div>
                                    </div>
                                </Popover>
                                <div className="instanote__button color3" onClick={this.displayDeletedData}>
                                    {this.state.displayDeletedData ?  <span>Hide completed notes</span> : <span>See completed notes</span>} 
                                    <Icon icon={"history"} iconSize={Icon.SIZE_STANDARD} />
                                </div>
                                {/*
                                FOR CHAT COMPONENT
                                
                                <div className="instanote__button color4" onClick={this.handleOpen}>
                                    Show chat
                                 <Icon icon={"chat"} iconSize={Icon.SIZE_STANDARD} />

                                </div> 
                                <Drawer
                                    icon="chat"
                                    onClose={this.handleClose}
                                    title="INSTANOTE CHAT"
                                    {...this.state}
                                >
                                    <div className={"testing" + Classes.DRAWER_BODY}>
                                        <div className={Classes.DIALOG_BODY}>
                                            <p>
                                                <strong>
                                                    Instachat incorporated a chat so you can easily chat with whomever you want - with one advantage compared to other chats:
                                                    store the messages you want to remember - simply click on a message and press the "add note"-button, and it will automatically be stored to your notes.
                                </strong>
                                            </p>
                                            <div className="instanote__column__chat">

                                                <div className="instanote__column__chat__div">
                                                    <div className="instanote__messages" id="message_div">

                                                        <div>
                                                            <div className="welcome_chat">Welcome to this chat</div>
                                                            <div onClick={this.showMoreMessages} className="welcome_more">Show more messages</div>

                                                            {this.props.messages && this.state.didMount && this.state.messages && this.state.messages.slice(this.state.numberOfItems, this.state.messages.length).map((message, b) => {
                                                                //projects in case we don't have any projects
                                                                // IF CORRECT ID HERE
                                                                // let newList = lists[list]
                                                                //console.log(newList)
                                                                // let firestoreList = ..
                                                                return (
                                                                    <div key={b}>
                                                                        <Message info={message} profile={profile} auth={auth} />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>

                                                    </div>
                                                    <form onSubmit={this.handleMessageSubmit} className="instanote__type__messages">

                                                        <input className="instanote__input__message" type="text" id="message" value={this.state.message} placeholder="Write a message..." onChange={this.handleChange} />
                                                        <div onClick={this.handleSubmit} className="instanote__button__message">
                                                            <img className="instanote__send-icon" src={send} alt="Copy link" />



                                                        </div>
                                                    </form>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Classes.DRAWER_FOOTER}>{this.props.auth.isEmpty ? <div>Sign in to use your own name in the chat.</div> : null}</div>
                                </Drawer>
*/}






                            </form>



                        </div>
                        <div className="instanote__column__notes">
                            {listData ? <div>
                                {listData.goals && listData.goals.map((goal, j) => {
                                    //projects in case we don't have any projects
                                    // IF CORRECT ID HERE
                                    // let newList = lists[list]
                                    //console.log(newList)
                                    // let firestoreList = ..
                                    console.log("GOAL:", goal, j);
                                    return (
                                        <Item type="goal" key={j} text={goal} urlName={this.state.urlName} />
                                    )
                                })}

                            </div> : <Spinner intent="warning" />}
                            {(listData && this.state.displayDeletedData) ? <div>
                                {listData.deleted && listData.deleted.map((deletedItem, i) => {
                                    //projects in case we don't have any projects
                                    // IF CORRECT ID HERE
                                    // let newList = lists[list]
                                    //console.log(newList)
                                    // let firestoreList = ..
                                    return (
                                        <Item type="" key={i} text={deletedItem} urlName={this.state.urlName} />
                                    )
                                })}

                            </div>

                                : null}



                        </div>
                        <ToastContainer />
                        {/*
                        <div className="instanote__column__chat">
                            <div className="instanote__column__chat__div">
                                <div className="instanote__messages" id="message_div">

                                    <div>
                                        Chat
                                        {requestingChat ? <p>Trying to join chat</p> : <p>Joined chat</p>}
                                        <div>{messages ? <div>got data</div> : <div>do not have data</div>}</div>
                                        <div onClick={this.showMoreMessages}>Show more messages</div>

                                        {this.props.messages && this.state.didMount && this.state.messages && this.state.messages.slice(this.state.numberOfItems, this.state.messages.length).map(message => {
                                            //projects in case we don't have any projects
                                            // IF CORRECT ID HERE
                                            // let newList = lists[list]
                                            //console.log(newList)
                                            // let firestoreList = ..
                                            return (
                                                <div key={message.time}>
                                                    <Message info={message} profile={profile} auth={auth} />
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                                <form onSubmit={this.handleMessageSubmit} className="instanote__type__messages">
                                    <input className="instanote__input__message" type="text" id="message" value={this.state.message} placeholder="type text" onChange={this.handleChange} />
                                    <div onClick={this.handleSubmit} className="instanote__button__message">
                                        <img className="instanote__send-icon" src={send} alt="Copy link" />
                                    </div>
                                </form>
                            </div>

                        </div>*/}
                    </div> : <div className="instanote__loading-data">{listCreatedError ?
                        <div className="title">List does not exist</div>
                        : <div>{(listData.public || !listData || this.state.correctPassword) ? <Spinner intent="warning" /> :
                            <div className="password__container">
                                <div className="password__warningText">We are sorry. This list is marked as private.</div>

                                <form onSubmit={this.handlePassword} className="handle__password__form">

                                    <input className="password__input" type="text" id="password" value={this.state.password} placeholder="Write a message..." onChange={this.handleChange} />
                                    <div onClick={this.handlePassword} className="password__button">
                                        Enter password



                                    </div>
                                </form>
                                {this.state.passwordMessage ? <div className="password__errorText">{this.state.passwordMessage}</div> : null}
                            </div>

                        }</div>}</div>}


            </div>
        )
    }
}
// create projects property. project property of the state
const mapStateToProps = (state) => {
    return {
        lists: state.firestore.ordered.lists,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        listError: state.project.listError,
        listData: state.project.listData,
        listCreatedError: state.project.listCreatedError,
        requestingChat: state.chat.requestingChat,
        messages: state.chat.messages,
        joinChatFailureMessage: state.chat.joinChatFailureMessage,
        data: state.chat.data,
        newMessage: state.chat.newMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        getList: (list) => dispatch(getList(list)),
        addItem: (information) => dispatch(addItem(information)),
        joinChat: (chat) => dispatch(joinChat(chat)),
        sendMessage: (message, time, createdBy, uid, urlName, messages) => dispatch(sendMessage(message, time, createdBy, uid, urlName, messages)),
        subToChat: (sub) => dispatch(subToChat(sub)),
    }
}
// connect dashboard componenet to redux store
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'lists'
        }
    ])
)(Instanote)
