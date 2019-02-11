// functional component
import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

// props received
const ProjectList = ({ projects }) => {
    return (
        <div className="project-list">

            {projects && projects.map(project => {
                //projects in case we don't have any projects
                return (
                    <Link to={'/project/'+project.id} key={project.id}>
                        <ProjectSummary project={project}  />

                    </Link>
                )
            })}
            {/*
            <Zoom>
                <ProjectSummary />
            </Zoom>
            <Fade bottom>
                <ProjectSummary />
            </Fade>
            */
            }

        </div>
    )
}

export default ProjectList