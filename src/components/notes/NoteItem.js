import React, { Component } from 'react'
import './notes_style.css'
export class NoteItem extends Component {

    render() {
        return (
            
            <div className="item__container">
                <div className="item__date">
                    Date
                </div>
                <div className="item__content">
                    Here comes the text
                </div>
                <div className="item__garbage">
                    <img src={require('../../images/delete-icon.svg')}
                        className="item__garbage-icon" alt="garbage icon" />
                </div>
            </div>
        )
    }
}

export default NoteItem