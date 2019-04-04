import React, { Component } from 'react'
import './notes_style.scss'
import { Switch } from "@blueprintjs/core";
import { Spinner } from "@blueprintjs/core";
import { bindActionCreators } from 'redux';
import goToIcon from '../../assets/goto.png'
import copy from '../../assets/copy.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import { makeListPrivateAndPublic } from '../../store/actions/projectActions'
import { setPassword } from '../../store/actions/projectActions'
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookShareCount,
} from 'react-share';
import { EditableText } from "@blueprintjs/core";

class NoteItem extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        inputText: "",
    }

    componentWillMount() {
        //DO SOMETHING LIKE THIS
        //this.props.getValue(this.state)
        this.props.makeListPrivateAndPublic(this.props.d.name, this.props.d.public, this.props.d.name, true)
        /*
THIS IS WHY THE VALUE CHANGES
        */
    }


    notify = () => {
        toast.success("www.instanote.no/" + this.props.d.name + " added to your note to clipboard!", {
            position: toast.POSITION.BOTTOM_CENTER,
        });

        this.copyToClipboard('www.instanote.no/' + this.props.d.name);

    }

    handleChange = (e) => {
        console.log(e)
        console.log("state", this.state.inputText)
        this.setState({
            "inputText": e
        });
    }

    handleSubmit = () => {
        if (this.state.inputText.length > 0) {
            this.props.setPassword(this.state.inputText, this.props.d.name)
            console.log("SETTING PASSWORD")
        }
        
    }


    copyToClipboard = str => {
        navigator.clipboard.writeText(str)
    };
    handlePublicChange = () => {
        let name = this.props.d.name;
        console.log('HANDLE PUBLIC CHANGE HETERERERERERE', this.props.d.public, !this.props.d.public)
        if (this.props.d.public !== null) {
            console.log("inside")
            this.props.makeListPrivateAndPublic(name, !this.props.d.public, this.props.d.name, false)
        }
        console.log("STATE AFTER CAHNGE", this.props.d.public)

    }

    navigateUser = () => {
        window.location.replace(this.props.d.name);
    }


    // REMEMBER TO REMOVE CHANGING YOUR VALUE TO THE FIRST
    render() {
        console.log("this.props.d.public", this.props.d.public)
        return (
            <div className="mylist__outercontainer">

                <div className="mylist__container">
                    <div className="mylist__nameOfTheList">
                        <div className="mylist__date--bold">Name of the list:</div> <div>{this.props.d.name}</div>
                    </div>
                    <div className="mylist__date">
                        <div className="mylist__date--bold">Created on:</div>
                        {this.props.d.createdOn ? <div>{new Date(this.props.d.createdOn.toDate()).toDateString().substr(new Date(this.props.d.createdOn.toDate()).toDateString().indexOf(" ") + 1)}</div> : <div></div>}
                    </div>
                    <div className="mylist__content">
                        <div className="mylist__date--bold"> Number of items:</div>
                        <div>{this.props.d.goals.length}</div>
                    </div>
                    <div className="mylist__toggle">
                        {this.props.isFetchingUpdate && (this.props.keyVal === this.props.d.name) ? <div className="toggle__loading"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> </div> : <div></div>}
                        <Switch defaultChecked={this.props.d.public} innerLabel="public" onChange={this.handlePublicChange} />
                    </div>
                    <div className="mylist__goto" onClick={this.notify}>
                        <img className="mylist__goto--image" src={copy} alt="Copy link" />
                    </div>

                    <div className="mylist__goto">
                        <FacebookShareButton url={'www.instanote.no/' + this.props.d.name} quote="Press the link to access my notes">
                            <FacebookIcon size={24} round={true} />
                        </FacebookShareButton>
                    </div>
                    <div className="mylist__goto" onClick={this.navigateUser}>
                        <img className="mylist__goto--image" src={goToIcon} alt="Go To" />
                    </div>

                </div>
                <form onSubmit={this.handleSubmit} className="mylist__password">
                    <div className="mylist__password-column1">
                        <div>If your list is <strong>private</strong>, you can enter a password others can access it with: </div>
                    </div>
                    <div className="mylist__password__column">
                        <EditableText id="inputText" className="TEST_INPUT_2" onChange={this.handleChange} value={this.state.inputText} multiline={false} placeholder={this.props.d.password ? ("Your password: " + this.props.d.password) : "Set a password"}/>

                        <div onClick={this.handleSubmit} className="instanote__setpassword">
                        
                        
                        {(this.props.isFetchingPassword) ? <div className="flexing">
                            <Spinner intent="warning" size={Spinner.SIZE_SMALL} />
                        Setting password</div> : <div>
                        
                        Set password</div>}
                        
                        
                        </div>
                        
                    </div>
                    </form>
                
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        publicValue: state.project.publicValue,
        errorMessage: state.project.errorMessage,
        isFetchingUpdate: state.project.isFetchingUpdate,
        isFetchingPassword: state.project.isFetchingPassword,
        keyVal: state.project.key,
        

    }
}

// dispatch() is the method used to dispatch actions and trigger state changes to the store
const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        makeListPrivateAndPublic: (payload, val2, key, mounting) => dispatch(makeListPrivateAndPublic(payload, val2, key, mounting)),
        setPassword: (password, urlName) => dispatch(setPassword(password, urlName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
