import React from 'react';
import pandora from "@faizaanceg/pandora";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import FormComponent from "../FormComponent/FormComponent";
import { Button, Card } from '@material-ui/core';
//import "./ProfilePage.css";

function ProfilePage() {
    const userLists = pandora.get('users');
    const loggedIn = pandora.get('loggedInUser', -1);

    return loggedIn === -1 ? <Redirect to='/login' /> : (

        <div className='container'>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to='/'><Navbar.Brand >Home</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }} id="responsive-navbar-nav">
                    <Nav>
                        <Link style={{ textDecoration: 'none' }} to='/'>
                            <Button variant="contained" color="secondary" onClick={() => pandora.remove('loggedInUser')}>Logout</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h2>Profile Page</h2>
            <br />
            <br />
            <br />
            <nav className='nav-link'>

            </nav>
            {userLists.map((userList, id) => {
                return (
                    <div>
                        <Card >
                            <FormComponent userId={id} isEditable={loggedIn === id} userList={userList} />
                        </Card>
                        <br></br>
                    </div>

                )
            })}
        </div>
    )
}

export default ProfilePage;