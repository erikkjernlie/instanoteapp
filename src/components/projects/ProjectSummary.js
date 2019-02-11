import React from 'react'
import './project_styling.css'

/*
    PROJECT SUMMARY WILL CONTAIN ALL THE LIST ITEMS
    So it will be
    
    name: [],
    List-items: [],
    completed: [],
    timesincelastupdate: be deleted if it is more than 3 months e.g.
    public: true or false (public when initiated), can set to private

*/

const ProjectSummary = ({project}) => {
    console.log(project.title)
    return (
        <div className="note">
                <div className="note_date">{project.title}</div>
                <div className="note_info">{project.content}</div>
                <p>Posted on {project.createdAt}</p>
            <hr /> 
        </div>
    )
}

export default ProjectSummary