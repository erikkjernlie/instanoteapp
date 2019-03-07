import React, { Component } from 'react'
import './notes_style.scss'
import { connect } from 'react-redux'


class NumberPicker extends Component {

    constructor(props) {
        super(props);
    }

    add = () => {

    }
    subtract = () => {
        
    }

    render() {
        return(
            <div className="numberpicker__container">
                <div className="numberpicker__add" onClick={this.add}>+</div>
                <div className="numberpicker__number">{this.props.number}</div>
                <div className="numberpicker__subtract" onClick={this.subtract}>-</div>

            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        // number: state.project.number;

    }
}

// dispatch() is the method used to dispatch actions and trigger state changes to the store
const mapDispatchToProps = (dispatch) => {
    return {
        // change the value here
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberPicker)