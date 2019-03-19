// class state component
import React, { Component } from 'react'
import Notifications from './Notifications'
import NoteItem from '../notes/NoteItem'
import './dashboard_style.css'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { createList } from '../../store/actions/projectActions'
import { getLists } from '../../store/actions/projectActions'
import { getListsWithInformation } from '../../store/actions/projectActions'
import { Button } from 'react-bootstrap'
import { Spinner } from "@blueprintjs/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Dashboard extends Component {

    // NEED TO GET THE LISTS HERE, as OBJECTS

    // [{listName, goals, deleted, public}, ...,]

    componentWillMount() {
        this.props.getListsWithInformation();
        setTimeout(() => {
            this.setState({
                loading: false,
            })
        }, 700)
        setTimeout(() => {
            this.setState({
                noData: true,
            })
        }, 5000)
    }

    state = {
        listName: '',
        loading: true,
        noData: false,
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        //this.props.getLists();
    }

    componentDidUpdate() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        // MAKE SURE LISTS IT NOT EMPTY WHEN TRYING TO CREATE
        this.props.createList(this.state)
        console.log("CREATING LIST!!!")
        // add to the list here
        //this.props.history.push('/');
        // console.log(this.state);
    }
    render() {
        // console.log(this.props)
        const { lists, auth, profile, listError, data_list, errorMessage, isFetching } = this.props; // object
        // console.log("dashboard", data_list, new Date())
        // THIS IS WHAT THE FUCK

        // console.log(profile)
        console.log("THIS.PROPS.noData", this.props.gotNoData)
        if (!auth.uid) {
            return <Redirect to='/' />
        }

        // PASS d to noteitem
        // WINNNNNN
        // make navbar transparent, see apear.in (looks pretty nice)
        let text;
        if (profile) {
            if (profile.lastName) {
                if (profile.lastName.substr(profile.lastName.length - 1).toLowerCase() === 's') {
                    text = profile.firstName + " " + profile.lastName + "' lists";
                } else {
                    text = profile.firstName + " " + profile.lastName + "'s lists";
                }
            }
        }
        return (
            <div className="dashboard">
                <div className="instanote__wrapper">
                </div>
                <div className="link_element initials">{text}</div>
                <div className="dashboard__container">
                    <div className="dashboard_row">
                        <div className="dashboard__maxwidth">
                            <div className="title">
                                {listError ? <p>{listError}</p> : null}
                            </div>
                            <div>
                                <form onSubmit={this.handleSubmit} className="dashboard_newlist">
                                    <div>
                                        <input className="dashboard_input_field" type="text" id="listName" placeholder="Create a new list here" onChange={this.handleChange} autoFocus />
                                    </div>

                                    <div>
                                        <Button type="submit" className="create_list__btn">
                                            Create list
                                    </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard_row">
                        {(isFetching && !this.state.loading) ? <div className="spinner__loading"><Spinner intent="warning" /> </div>: <div></div>}

                        {(this.state.loading)? <div className="spinner__loading"><Spinner intent="warning" /></div> :
                            <div>{(data_list) ? <div className="mylists">{data_list.map(
                                d => {
                                    return (
                                        <NoteItem d={d} key={d.name} publicValue={d.public} />

                                    );
                                }
                            )}</div> : <div></div>}
                            </div>
                        }

                    </div>
                    <div className="dashboard_row">
                        {(this.props.gotNoData === 'You have no data')  ? <div className="nodata"><div>It looks like you do not have any data.</div><div className="nodata__fail">If you have created any lists, we recommend you to update the page. </div></div> : <div></div>}
                    </div>
                </div>
                <ToastContainer />

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
        isFetching: state.project.isFetching,
        errorMessage: state.project.errorMessage,
        data_list: state.project.data_list,
        gotNoData: state.project.noData,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        createList: (list) => dispatch(createList(list)),
        getLists: () => dispatch(getLists()),
        getListsWithInformation: () => dispatch(getListsWithInformation())
    }
}
// connect dashboard componenet to redux store
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'lists' }
    ])
)(Dashboard)
