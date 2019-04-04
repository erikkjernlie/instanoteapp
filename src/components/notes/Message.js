import React, { Component } from 'react'
import moment from 'moment'
import { Button, Popover, Position, Tooltip } from "@blueprintjs/core"
import add_note from '../../assets/add_note.png'
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux'
import { addItem } from '../../store/actions/projectActions'

class Message extends Component {

    state = {
        showNote: false,
    }

    constructor(props) {
        super(props);


    }


    /*
        ON CLICK: ADD AS NOTE!!!!!
        ON CLICK: ADD AS NOTE!!!!!
        ON CLICK: ADD AS NOTE!!!!!
        ON CLICK: ADD AS NOTE!!!!!
        ON CLICK: ADD AS NOTE!!!!!
        ON CLICK: ADD AS NOTE!!!!!

    */

    showNoteOnClick = () => {
        this.setState({
            showNote: !this.state.showNote,
        })
    }


    addItem = () => {
        this.props.addItem({
            urlName: window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1),
            item: this.props.info.message,
        });
        toast.success("Added message to your note", {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }

    render() {

        return (

            <div className="message__div" onClick={this.showNoteOnClick}>
                <div className="message__container">
                        <div className={this.props.info.uid === this.props.auth.uid ? "createdby_me" : "createdby"}>

                        <div>{this.props.info.createdBy}</div>
                        {this.state.showNote ? <div>{String(moment(this.props.info.time.toDate()).fromNow())}</div> : null}

                        </div>
                        <Tooltip content={<div>{String(moment(this.props.info.time.toDate()).fromNow())}</div>} >
                        <div className={this.props.info.uid === this.props.auth.uid ? "message_me" : "message_2"}>
                            <div>{this.props.info.message}</div>
                                        {this.state.showNote ?  <div className="add_note_div_img">


                        <img src={add_note} className="add_note_img" alt="add note" onClick={this.addItem} />
                                        
                                        </div> : null}
                        </div>
                    </Tooltip>


            </div>

            

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        addItem: (information) => dispatch(addItem(information)),
    }
}

// connect dashboard componenet to redux store
export default connect(null, mapDispatchToProps)(Message)
