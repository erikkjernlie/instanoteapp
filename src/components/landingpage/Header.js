import React, { Component } from 'react';
import './landingpage.scss'
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux'
import { createList } from '../../store/actions/projectActions'
import { getLists } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { Spinner } from "@blueprintjs/core";
import ipad from '../../assets/pictures.png'
import Fade from 'react-reveal/Fade';


export class Header extends Component {

    state = {
        listName: '',
        date: new Date(),
        loading: false
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            loading: false
        });
        this.props.getLists();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // MAKE SURE LISTS IT NOT EMPTY WHEN TRYING TO CREATE
        if (this.state.listName !== "") {
            this.setState({
                loading: true
            })
            this.props.createList(this.state);

        }
        // add to the list here
        // console.log(this.state);
    }

    render() {
        const { profile, listError, lists } = this.props;

        return (
            <div>
                <div className="header">
                <Fade left>
                    <div className="header__column1">
                        <div className="header_text">
                            <div>CREATE A LIST IN 2 SECONDS</div>
                            <div className="header_items">
                                <div className="header_item">
                                    online sharable lists in seconds
                                </div>
                                <div className="header_item">
                                    no need for login or registration
                                </div>
                                <div className="header_item">
                                    www.instanote.no/your-username
                                </div>
                            </div>
                        </div>
                        <div className="header_form">
                            <form onSubmit={this.handleSubmit} className="project_form">
                                <div>
                                    <input className="input_field" type="text" id="listName" placeholder="listName" onChange={this.handleChange} autoFocus />
                                </div>

                                <div>
                                    <Button type="submit" className="create_list__btn">
                                        Create list
                                    </Button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="header__loading">
                            <div className="subtext">
                                {(!listError && this.state.loading) ? <Spinner intent="warning" /> : null}
                                {(listError) ? <p>{listError}</p> : null}
                            </div>
                        </div>
                    </div>
                    </Fade>
                    <div className="header__column2 header__column__image">
                    <Fade right>
                        <img src={ipad} className="ipad" alt="ipad" />
                    </Fade>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        list: state.project.list,
        listError: state.project.listError,
        lists: state.project.lists
    }
}

// dispatch() is the method used to dispatch actions and trigger state changes to the store
const mapDispatchToProps = (dispatch) => {
    return {
        // createProject is a function in props. after arrow function: action createProject
        createList: (list) => dispatch(createList(list)),
        getLists: () => dispatch(getLists())
    }
}
// first parameter is mapStateToProp, therefore null
export default connect(mapStateToProps, mapDispatchToProps)(Header);