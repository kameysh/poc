import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import pandora from "@faizaanceg/pandora";
import { Button } from '@material-ui/core';
import { Nav, Navbar } from 'react-bootstrap';

export default function MenuComp() {

    const [isUserPresent, setIsUserPresent] = useState(false);
    //not showing login button without registration to avoid errors on screen
    useEffect(() => {
        const present = pandora.get('users');
        if (present !== null) {
            setIsUserPresent(true);
        }
    }, [isUserPresent]);

    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href='/'>Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }} id="responsive-navbar-nav">
                    <Nav>
                        <Link style={{ textDecoration: 'none' }} to='/signup'>
                            <div className='btn'><Button variant="contained" type='text' color='primary'>Signup</Button></div>
                        </Link>
                    </Nav>
                    <Nav>
                        {isUserPresent ? <Link style={{ textDecoration: 'none' }} to='/login'>
                            <div className='btn'><Button variant="contained" type='text' color='secondary'>Login</Button></div>
                        </Link> : null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
