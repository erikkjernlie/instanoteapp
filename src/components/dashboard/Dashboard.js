// class state component
import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import './dashboard_style.css'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        // console.log(this.props)
        const { projects, auth } = this.props; // object
        if (!auth.uid) {
            // returning redirect 
            return <Redirect to='/signin' />
        }
        
        return (
            <div>
                <div className="dashboard_row">
                    <div>
                        <ProjectList projects={projects} />
                    </div>
                    <div>
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}
// create projects property. project property of the state
const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
// connect dashboard componenet to redux store
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(Dashboard)