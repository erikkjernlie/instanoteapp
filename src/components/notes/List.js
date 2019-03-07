import React, { Component } from 'react'

import moment from 'moment'
// class state component
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { getList } from '../../store/actions/projectActions'

/*
    PROJECT SUMMARY WILL CONTAIN ALL THE LIST ITEMS
    So it will be
    
    name: [],
    List-items: [],
    completed: [],
    timesincelastupdate: be deleted if it is more than 3 months e.g.
    public: true or false (public when initiated), can set to private

*/

class List extends Component {

    componentDidMount() {
        console.log('GrandChild did mount.');
        var address = window.location.pathname
        var newAddress = address.substring(1);
        console.log(newAddress)
        this.setState({
            urlName: newAddress
        })
        console.log(this.state, "STATE")
        this.props.getList(this.state)
    }

    state = {
        item: '',
        urlName: window.location.pathname.substring(1)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // MAKE SURE LISTS IT NOT EMPTY WHEN TRYING TO CREATE
        // add to the list here
        //this.props.history.push('/');
        // console.log(this.state);
    }
    render() {
        // console.log(this.props)
        const { lists, auth, profile, listError, urlName, listData } = this.props; // object

        console.log(listData, "listData");
        if (listData) {
            console.log(listData.goals, "goals")
        }
        // if not access and public
        if (!auth.uid) {
            // returning redirect 
            return <Redirect to='/signin' />
        }
        return (
            <div>

                <div>
                    <form onSubmit={this.handleSubmit} className="project_form">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input className="input_field" type="text" id="item" placeholder="item" onChange={this.handleChange} />
                        </div>
                        <div>
                            <button className="btn_create">
                                Create
                    </button>
                        </div>
                    </form>
                </div>

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
        listData: state.project.listData

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        getList: (list) => dispatch(getList(list))
    }
}
// connect dashboard componenet to redux store
export default connect(mapStateToProps, mapDispatchToProps)(List)
