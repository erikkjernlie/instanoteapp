import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Intent, Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { Button, Form } from 'react-bootstrap';
import SignIn from '../auth/SignIn'
import './Layout.css'

class SignedOutLinks extends Component {

    render() {
        return (
            <div className="link_elements">
                <div className="link_element">
                        <Button href="signup" type="submit" className="header__btn">Get started for free</Button>
                </div>

                <Popover
                    interactionKind={PopoverInteractionKind.CLICK}
                    popoverClassName="bp3-popover-content-sizing"
                    position={Position.BOTTOM_RIGHT}
                >
                    <Button type="submit" className="header__btn" intent={Intent.PRIMARY}>Login</Button>
                    
                    <div>
                        <SignIn />
                    </div>
                </Popover>

            </div>
        )
    }


}

export default SignedOutLinks

