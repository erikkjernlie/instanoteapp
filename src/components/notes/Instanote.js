import React, { Component } from 'react'

import moment from 'moment'
// class state component
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { getList } from '../../store/actions/projectActions'
import { addItem } from '../../store/actions/projectActions'
import Item from './Item'
import { ToastContainer, toast } from 'react-toastify';
import { Intent, Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";
import copy from '../../assets/copy.png'
import { Spinner } from "@blueprintjs/core";

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
    }
    componentWillMount() {
        var address = window.location.pathname
        var newAddress = address.substring(1);
        this.setState({
            urlName: newAddress,
        })
        this.props.getList(this.state)
        setTimeout(() => {
            
        }, 5000)
    }

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

    copyToClipboard = str => {
        navigator.clipboard.writeText(str)
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.item != "") {
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
    render() {
        // console.log(this.props)
        const { lists, auth, profile, listError, urlName, listData, goals, listCreatedError } = this.props; // object
        if (listData) {
            console.log(listData, "deleted and goals")
        }
        // if not access and public
        if (profile) {
            console.log(profile);
        }
        return (
            <div className="instanote__container">
                <div className="instanote__wrapper">
                </div>
                {listData && (listData.public || listData.madeBy === auth.uid) ? 

                <div className="instanote__outerdiv">
                    <div className="instanote__column">
                        <form onSubmit={this.handleSubmit} className="instanote__form">

                            <input className="instanote__input" type="text" id="item" placeholder="Add a note" value={this.state.item} onChange={this.handleChange} />
                            <div onClick={this.handleSubmit} className="instanote__button">Add note</div>

                            <Popover
                                interactionKind={PopoverInteractionKind.CLICK}
                                popoverClassName="bp3-popover-content-sizing"
                                position={Position.BOTTOM}
                            >
                                <div className="instanote__button color2">Share your list</div>

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
                            <div className="instanote__button color3" onClick={this.displayDeletedData}>See completed notes</div>

                        </form>
                        {(listData && this.state.displayDeletedData) ? <div>
                            {listData.deleted && listData.deleted.map(deletedItem => {
                                //projects in case we don't have any projects
                                // IF CORRECT ID HERE
                                // let newList = lists[list]
                                //console.log(newList)
                                // let firestoreList = ..
                                return (
                                    <Item type="" key={deletedItem} text={deletedItem} urlName={this.state.urlName} />
                                )
                            })}

                        </div>

                            : null}
                    </div>
                    <div className="instanote__column__notes">
                        {listData ? <div>
                            {listData.goals && listData.goals.map(goal => {
                                //projects in case we don't have any projects
                                // IF CORRECT ID HERE
                                // let newList = lists[list]
                                //console.log(newList)
                                // let firestoreList = ..
                                return (
                                    <Item type="goal" key={goal} text={goal} urlName={this.state.urlName} />
                                )
                            })}

                        </div> : <Spinner intent="warning" />}


                    
                </div>
                <ToastContainer />
                </div> : <div className="instanote__loading-data">{listCreatedError ? 
                <div className="title">List does not exist</div>
                 :  <div>{ (listData.public || !listData) ? <Spinner intent="warning" /> : <div className="title">We are sorry. This list is marked as private.</div>  }</div>    }</div>} 

                 
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

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        getList: (list) => dispatch(getList(list)),
        addItem: (information) => dispatch(addItem(information))
    }
}
// connect dashboard componenet to redux store
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'lists' }
    ])
)(Instanote)
