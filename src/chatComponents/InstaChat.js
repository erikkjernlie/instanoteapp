import React, { Component } from 'react'
import { connect } from 'react-redux'
import './chat.css'


class InstaChat extends Component {

    constructor(props) {
        super(props);
    }

  
    render() {
        return(
            <div className="chat__container">
                Need anonymous chat? or just what to chat with a random person? InstaChat
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

export default connect(mapStateToProps, mapDispatchToProps)(InstaChat)