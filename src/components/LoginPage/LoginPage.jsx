import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import validation from "../../validation";
import pandora from "@faizaanceg/pandora";
import "./LoginPage.css";

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
        <div className='wrap'>
            <h2>Login Page</h2>
            <br></br>
            <br></br>
            <div>
                <form onSubmit={HandleSubmit} noValidate>
                    <div className='form-group'>
                        <label>Email</label>
                        <div className='form-group-field'>
                            <input type='email'
                                name='email'
                                placeholder='email'
                                value={values.email}
                                onChange={HandleChange}
                            />
                            <br></br>
                            <div className='err-msg'> {errors.email && <p>{errors.email}</p>} </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <div className='form-group-field'>
                            <input type='password'
                                name='password1'
                                placeholder='password'
                                value={values.password}
                                onChange={HandleChange}
                            />
                            <br></br>
                            <div className='err-msg'> {errors.password1 && <p>{errors.password1}</p>} </div>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button type='submit'>Login</button>
                        <Link to='/signup'>
                            <button>Switch to signup</button>
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage;