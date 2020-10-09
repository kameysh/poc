import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import validation from "../../validation";
import { Navbar } from 'react-bootstrap';
import pandora from "@faizaanceg/pandora";
import { Button, TextField, Container } from '@material-ui/core';
//import "./SignupPage.css";


function SignupPage() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });
    const [regValue, setRegValue] = useState(pandora.get('users', []));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const styleError = {
        color: 'blue'
    }

    function HandleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function HandleSubmit(e) {
        e.preventDefault();
        setErrors(validation(values));
        setIsSubmitting(true);
    }

    //allowing the user to sumit only if there is no error
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            Submit();
        }
    }, [errors]);

    function Submit() {
        const newArr = regValue;
        newArr.push({ id: values.length, username: values.username, email: values.email, password: values.password1 })
        pandora.set('users', newArr);
        setRegValue(newArr);
        setSubmitted(true);
    }

    return (
        <div>
            { submitted ? <Redirect to='/login' /> : <div className='container'>
                <h2>This is signup page</h2>
                <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to='/'><Navbar.Brand>Home</Navbar.Brand></Link>
                </Navbar>
                <br></br>
                <br></br>
                <div>
                    <Container style={{textAlign: 'center'}}>
                        <form onSubmit={HandleSubmit} noValidate>
                            <div className='form-group'>
                                <label>Enter Username</label>{' '}
                                <div className='form-group-field'>
                                    <TextField type='text'
                                        required id="standard-required"
                                        name='username'
                                        label='username'
                                        value={values.username}
                                        onChange={HandleChange}
                                    />
                                    <br></br>
                                    <div style={styleError}> {errors.username && <p>{errors.username}</p>} </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>Enter Email</label>{' '}
                                <div className='form-group-field'>
                                    <TextField type='email'
                                        required id="standard-required"
                                        name='email'
                                        label='email'
                                        value={values.email}
                                        onChange={HandleChange}
                                    />
                                    <br></br>
                                    <div style={styleError}>{errors.email && <p>{errors.email}</p>}</div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>Enter Password</label>{' '}
                                <div className='form-group-field'>
                                    <TextField type='password'
                                        required id="standard-required"
                                        name='password1'
                                        label='password'
                                        value={values.password1}
                                        onChange={HandleChange}
                                    />
                                    <br></br>
                                    <div style={styleError}>{errors.password1 && <p>{errors.password1}</p>}</div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>Re-enter Password</label>
                                <div className='form-group-field'>
                                    <TextField type='password'
                                        required id="standard-required"
                                        name='password2'
                                        label='confirm password'
                                        value={values.password2}
                                        onChange={HandleChange}
                                    />
                                    <br></br>
                                    <div style={styleError}>{errors.password2 && <p>{errors.password2}</p>}</div>
                                </div>
                            </div>
                            <div className='btn-flex'>
                                <div className='btn btn-signup'><Button variant="contained" color="primary" type='submit'>Signup</Button></div>
                                <Link style={{ textDecoration: 'none' }} to='/login'>
                                    <div className='btn btn-log'><Button variant="contained" color="secondary" >Switch to login</Button></div>
                                </Link>
                            </div>
                        </form>
                    </Container>
                </div>
            </div>}
        </div>
    )
}

export default SignupPage;