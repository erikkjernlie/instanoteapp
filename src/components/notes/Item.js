import React, { Component } from 'react'
import './notes_style.scss'
import doneIcon from '../../assets/done.png'
import deleteIcon from '../../assets/delete-icon.png'
import NumberPicker from './NumberPicker'
import { connect } from 'react-redux'
import { deleteItem } from '../../store/actions/projectActions'
import { recoverItem } from '../../store/actions/projectActions'
import { updateItem } from '../../store/actions/projectActions'
import Fade from 'react-reveal/Fade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditableText } from "@blueprintjs/core";
// SUMMARIZER - use firebase
// https://firebase.google.com/docs/functions/get-started


// make text shorter:
// https://30secondsofcode.org/string#truncatestring

const Msg = ({ closeToast }) => (
    <div>
        Deleted item.
        Do you wish to recover it?
      <button onClick={closeToast}>Yes</button>
    </div>
)
class Item extends Component {

    state = {
        updateText: false,
        inputText: this.props.text,
        urlName: this.props.urlName,
        oldText: this.props.text,
        numberPicker: false,
        showText: '',

    }

    constructor(props) {
        super(props);
        console.log(props)
        if (this.props.text.startsWith('..Numberpicker..')) {
            var res = this.props.text.substring(16);
            this.setState({
                numberPicker: true,
                showText: res
            })

            // UPDATE THE OTHER ONES; show only the other

        }

    }

    handleChange = (e) => {
        console.log(e)
        this.setState({
            "inputText": e
        });
        console.log("HEREITCOMES: ", this.state.inputText, this.state.oldText);
    }

    changeItem = () => {

        // CALL A FUNCTION TO UPDATE IT
        // this.props(updateItem(this.state, lastItem (or something, need to remember what to delete)))
    }

    updateItem = () => {
        this.editItem(this.state);
        this.props.updateItem(this.state);
        this.setState({
            oldText: this.state.inputText
        });

    }

    editItem = () => {

        let newUpdateText = !this.state.updateText
        this.setState({
            updateText: newUpdateText,
        })
    }

    deleteItem = () => {
        this.props.deleteItem(this.state);

        toast.error(({ closeToast }) => <div onClick={closeToast} className="toast__div">
            Deleted item.
            Do you wish to recover it?
        <button className="toast__button" onClick={this.recoverItem}>Yes</button>
        </div>, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
    }

    recoverItem = () => {
        this.props.recoverItem(this.state);
        toast.info("Recovered item", {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }

    render() {


        return (
            <div>
                {this.props.type ?
                    <Fade right>
                        <div>{this.state.updateText ?
                            <div className={"item__wrapper " + (this.props.type ? 'yellow' : 'black')}>
                                <div className="item__input">
                                    <div className="icon__wrapper" onClick={this.deleteItem}>
                                        <img src={deleteIcon} className="input__deleteIcon" alt="Done" />
                                    </div>
                                    <div className="TEST_INPUT_CONTAINER">
                                    
                                        <EditableText id="inputText" className="TEST_INPUT" onChange={this.handleChange} value={this.state.inputText} multiline={true} minLines={1} maxLines={12}  placeholder="Write whatever you want"/>

                                    </div>
                                    <div className="icon__wrapper" onClick={this.updateItem}>
                                        <img src={doneIcon} className="input__doneIcon" alt="Done" />
                                    </div>
                                </div>
                            </div>
                            :
                            <div>

                                {
                                    this.props.type ? <div className="item__wrapper yellow" onClick={this.editItem}>
                                        {this.state.inputText}
                                    </div> : <div className="item__wrapper black" onClick={this.recoverItem}>{this.state.inputText}</div>
                                }
                            </div>


                        }

                        </div>

                    </Fade> :
                    <Fade right>
                        <div>{this.state.updateText ?
                            <div className={"item__wrapper " + (this.props.type ? 'yellow' : 'black')}>
                                <div className="item__input">
                                    <div className="icon__wrapper" onClick={this.deleteItem}>
                                        <img src={deleteIcon} className="input__deleteIcon" alt="Done" />
                                    </div>
                                    <div className="TEST_INPUT_CONTAINER">
                                        <textarea className="TEST_INPUT" type="text" id="inputText" placeholder="Write whatever you want" onChange={this.handleChange} value={this.state.inputText} />
                                    </div>
                                    <div className="icon__wrapper" onClick={this.updateItem}>
                                        <img src={doneIcon} className="input__doneIcon" alt="Done" />
                                    </div>
                                </div>
                            </div>
                            :
                            <div>

                                {
                                    this.props.type ? <div className="item__wrapper yellow" onClick={this.editItem}>
                                        {this.state.inputText}
                                    </div> : <div className="item__wrapper black" onClick={this.recoverItem}>{this.state.inputText}</div>
                                }
                            </div>


                        }

                        </div>

                    </Fade>

                }

            </div>
        )
    }
}
// create projects property. project property of the state
const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (information) => dispatch(deleteItem(information)),
        recoverItem: (information) => dispatch(recoverItem(information)),
        updateItem: (information) => dispatch(updateItem(information)),

    }
}
// connect dashboard componenet to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Item)
