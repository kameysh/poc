import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import validation from "../../validation";
import pandora from "@faizaanceg/pandora";
import MenuComp from "../MenuComp/MenuComp";
import { Button, TextField, Container } from '@material-ui/core';
//import "./LoginPage.css";

function LoginPage() {

    const [values, setValues] = useState({
        email: '',
        password1: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    function HandleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const styleError = {
        color: 'blue'
    }

    function HandleSubmit(e) {
        e.preventDefault();
        setErrors(validation(values));
        setIsSubmitting(true);
    }

    function Submit() {
        const Lists = pandora.get('users');
        const login = Lists.findIndex(list => {
            return (list.email.toLowerCase() === values.email.toLowerCase() && list.password.toLowerCase() === values.password1.toLowerCase())
        })
        //if the user is currently logging in, we are storing the information in local storage
        if (login > -1) {
            pandora.set('loggedInUser', login);
            setSubmitted(true);
        }
    }

    useEffect(() => {
        //running the useEffect to actively look for errors change and allowing
        //the user to submit only if there is no error
        if (Object.keys(errors).length === 0 || isSubmitting) {
            Submit();
        }
    }, [errors]);

    return submitted ? <Redirect to='/profile' /> : (
        <div className='container'>
            <h2>Login Page</h2>
            <MenuComp />
            <br></br>
            <br></br>
            <div>
                <Container style={{textAlign: 'center'}}>
                    <form onSubmit={HandleSubmit} noValidate>
                        <div className='form-group'>
                            <label>Email</label>
                            <div className='form-group-field'>
                                <TextField type='email'
                                    name='email'
                                    label='email'
                                    value={values.email}
                                    onChange={HandleChange}
                                />
                                <br></br>
                                <div style={styleError}> {errors.email && <p>{errors.email}</p>} </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <div className='form-group-field'>
                                <TextField type='password'
                                    name='password1'
                                    label='password'
                                    value={values.password}
                                    onChange={HandleChange}
                                />
                                <br></br>
                                <div style={styleError}> {errors.password1 && <p>{errors.password1}</p>} </div>
                            </div>
                        </div>
                        <div className='buttons'>
                            <div className='btn btn-log'><Button variant="text" variant="contained" color="secondary" type='submit'>Login</Button></div>
                            <Link style={{ textDecoration: 'none' }} to='/signup'>
                                <div className='btn btn-signup'><Button variant="text" variant="contained" color="primary">Switch to signup</Button></div>
                            </Link>
                        </div>
                    </form>
                </Container>
            </div>

        </div>
    )
}

export default LoginPage;