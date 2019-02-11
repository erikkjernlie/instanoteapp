import React from 'react';
import './landingpage.css'
import { Button, Form } from 'react-bootstrap';

const Header = () => {
    return (
        <div>
            <div className="header">
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
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control placeholder="Enter name of your list" />
                        </Form.Group>
                    </Form>
                    <Button className="orangeBtn">Create list</Button>
                    <input className="inp" type="text" placeholder="type"/>


                </div>
            </div>
        </div>
    )
}

export default Header

// <img src={header} className="header_image" alt="header" />