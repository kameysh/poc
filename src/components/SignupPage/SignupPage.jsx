import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import validation from "../../validation";
import pandora from "@faizaanceg/pandora";
import "./SignupPage.css";


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
            { submitted ? <Redirect to='/login' /> : <div className='wrap'>
                <h2>This is signup page</h2>
                <br></br>
                <br></br>
                <div>
                    <form onSubmit={HandleSubmit} noValidate>
                        <div className='form-group'>
                            <label>Username</label>{' '}
                            <div className='form-group-field'>
                                <input type='text'
                                    name='username'
                                    placeholder='username'
                                    value={values.username}
                                    onChange={HandleChange}
                                />
                                <br></br>
                                <div className='err-msg'> {errors.username && <p>{errors.username}</p>} </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Email</label>{' '}
                            <div className='form-group-field'>
                                <input type='email'
                                    name='email'
                                    placeholder='email'
                                    value={values.email}
                                    onChange={HandleChange}
                                />
                                <br></br>
                                <div className='err-msg'>{errors.email && <p>{errors.email}</p>}</div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>{' '}
                            <div className='form-group-field'>
                                <input type='password'
                                    name='password1'
                                    placeholder='password'
                                    value={values.password1}
                                    onChange={HandleChange}
                                />
                                <br></br>
                                <div className='err-msg'>{errors.password1 && <p>{errors.password1}</p>}</div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Confirm Password</label>
                            <div className='form-group-field'>
                                <input type='password'
                                    name='password2'
                                    placeholder='re-enter password'
                                    value={values.password2}
                                    onChange={HandleChange}
                                />
                                <br></br>
                                <div className='err-msg'>{errors.password2 && <p>{errors.password2}</p>}</div>
                            </div>
                        </div>
                        <div className='btn-flex'>
                            <div className='btn btn-signup'><button type='submit'>Signup</button></div>
                            <Link to='/login'>
                                <div className='btn btn-log'><button>Switch to login</button></div>
                            </Link>
                        </div>
                    </form>
                </div>

            </div>}
        </div>
    )
}

export default SignupPage;