// functional component
import React, { Component } from 'react'
import NoteItem from './NoteItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


// props received - BAD WAY? Component etc. here instead?
class NotesList extends Component {

    constructor(props) {
        super(props);
    }
   
    render() {
        const { profile } = this.props;
        console.log("JESD")
        console.log("LISTS:", profile.lists)
        return (
            <div className="full_width">
                <div>Example</div>
                <div>

                    {profile.lists && profile.lists.map(list => {
                        //projects in case we don't have any projects
                        // IF CORRECT ID HERE
                        // let newList = lists[list]
                        //console.log(newList)
                        // let firestoreList = ..
                        return (
                            <div key={list}>
                                <NoteItem list={list} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}




export default (NotesList)