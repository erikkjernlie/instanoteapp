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
import ChatAnimation from './ChatAnimation';


export class Header extends Component {

    state = {
        listName: '',
        date: new Date(),
        loading: false,
        errorMessage: '',
        words: ['a list in 2 seconds', 'shopping lists', 'notes', 'wishing lists'],
        index: 0,
        show: true,

    }
    handleChange = (e) => {
        
        this.setState({
            [e.target.id]: e.target.value,
            loading: false,
            errorMessage: '',
        });
        if (this.props.listError && this.state.show) {
            this.setState({
                show: false,
            })
        } 
        // this.props.getLists(); THIS ONE NEEDS TO BE COMMMENTED OUT RIGHT????
    }

    componentDidMount() {
        setInterval(() => {
            if ((this.state.index + 1) < this.state.words.length ) {
                this.setState({
                    index: (this.state.index+1),
                })
            } else {
                this.setState({
                    index: 0,
                })
            }
            
        }, 3000);
    }



    navigateUser = () => {
        window.location.href = this.state.listName;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // MAKE SURE LISTS IT NOT EMPTY WHEN TRYING TO CREATE
        if (this.state.listName !== "") {
            if (this.state.listName.indexOf(" ") > 0) {
                this.setState({
                    errorMessage: 'List name cannot contain space.'
                })
            } else if (this.state.listName.toLowerCase() === 'dashboard' || this.state.listName.toLowerCase() === 'signin' || this.state.listName.toLowerCase() === 'signup') {
                this.setState({
                    errorMessage: 'Invalid name.'
                })
            } else {
                this.setState({
                    loading: true
                })
                this.props.createList(this.state);
                    this.setState({
                        show: true,
                    })
            }


        }

        // add to the list here
        // console.log(this.state);
    }

    render() {
        const { profile, listError, lists } = this.props;
        let i = 0;

        return (
            <div className="z">
                <div className="z_1">
                    <div className="new__header_text">
                        You only need the name of your list:
                    </div>
                    <div className="header">
                        <div className="header_form">
                            <form onSubmit={this.handleSubmit} className="project_form">
                                <div className="header__input">
                                    <input className="input_field__header" type="text" id="listName" placeholder="Your list" onChange={this.handleChange} autoFocus />
                                </div>

                                <div className="header__button">
                                    <Button type="submit" className="create_list__btn__header">
                                        Create list
                                    </Button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="z_2">
                    <Fade left>
                        <div className="header__column1">
                            <div className="header_text">
                                <div className="header__uppercase">Create <span className="changeofwords">{this.state.words[this.state.index]}</span></div>
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
                                    <div className="header__input">
                                        <input className="input_field__header" type="text" id="listName" placeholder="Your list" onChange={this.handleChange} autoFocus />
                                    </div>

                                    
                                    {(!listError && this.state.loading) ? 
                                    
                                        <div className="header__button">
                                        <Button type="submit" className="create_list__btn__header"> 
                                            <span className="padding-right">Creating list</span>   <Spinner intent="warning" size={Spinner.SIZE_SMALL} />
                                    </Button>
                                    
                                    </div>
                                    
                                     : 
                                    <div className="header__button">
                                        <Button type="submit" className="create_list__btn__header">
                                            Create list
                                    </Button>
                                    </div>}

                                </form>
                            </div>
                            <div className="header_error_div">
                            {this.state.errorMessage ? 
                            <div className="header_error">{this.state.errorMessage}</div> : 
                            null}
                            
                            </div>


                            <div className="header__loading">
                                <div className="error__message">
                                    {(listError && this.state.show) ? <p>Sorry, this list already exist. To go to {this.state.listName}, press <span className="here" onClick={this.navigateUser}>here</span>.</p> : null}
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