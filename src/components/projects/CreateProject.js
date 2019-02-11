import React, { Component } from 'react'
import './project_styling.css'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

export class CreateProject extends Component {
    state = {
        title: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state)
        // console.log(this.state);
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) {
            // returning redirect 
            return <Redirect to='/signin' />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="project_form">
                    <h3>Create project</h3>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input className="input_field" type="text" id="title" placeholder="title" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="content">Project Content</label>
                        <input className="input_field" type="text" placeholder="content" id="content" onChange={this.handleChange} />
                    </div>
                    <div>
                        <button className="btn_create">
                            Create
                        </button>
                    </div>
                </form>
                <div>
                    Managing lists
                    <div className="management">
                        <div className="my_lists">
                        Have small cards for each list?
                        <ul>
                        <li>
                            <div>
                            instanote-listname
                                <ul>
                                    <li>
                                        last-updated: date
                                    </li>
                                    <li>
                                        number-of-items: 23
                                    </li>
                                    <li>
                                        public or private: TOGGLE BUTTON FOR THIS OPTION
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>List 2</li>
                        </ul>
                        </div>
                        <div className="create_new_list">
                        content 2
                        <input placeholder="create list" />
                        <button>create list</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToPros = (state) => {
    return {
        auth: state.firebase.auth
    }
}

// dispatch() is the method used to dispatch actions and trigger state changes to the store
const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        createProject: (project) => dispatch(createProject(project))
    }
}
// first parameter is mapStateToProp, therefore null
export default connect(mapStateToPros, mapDispatchToProps)(CreateProject)