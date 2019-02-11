import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


const ProjectDetails = (props) => {
    const { project, auth } = props;
    if (!auth.uid) {
        // returning redirect 
        return <Redirect to='/signin' />
    }
    if (project) {
        return (
            <div>
                <div>
                    <span>{project.title}</span>
                    <p>
                        {project.content}
                    </p>
                </div>
                <div>
                    <div>
                        {project.authorFirstName} {project.authorLastName}
                    </div>
                    <div>
                        2nd september, 2am
                </div>
                </div>
            </div>
        );
    } else {
        return (
            <p>Loading project....</p>
        )

    }

}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects
    // making sure we have the projects
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails)