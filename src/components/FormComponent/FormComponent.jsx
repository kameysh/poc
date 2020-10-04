import React, { useState } from 'react';
import pandora from "@faizaanceg/pandora";
import validation from "../../validation";

export default function FormComponent(props) {
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState();

    function handleSubmit(e) {
        const values = {};
        values.email = e.target.email.value;
        values.username = e.target.username.value;
        e.preventDefault();
        let errors = validation(values);
        if (!errors.email && !errors.username) {
            Submit(values);
        }
        setErrors(errors);
    }

    function Submit(values) {
        const users = pandora.get('users');
        let currentUser = users[props.userId];
        users[props.userId] = { ...currentUser, ...values };
        pandora.set('users', users);
        setSaved('Saved successfully');
    }

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>
                <div className='fle'>
                </div>
                <br></br>
                <div className='card'>
                    <div className='flexx'>
                        <span>Email:</span><br />
                        <input readOnly={!props.isEditable} type='email' defaultValue={props.userList.email} name='email'></input>
                        <div className='err-msg'> {errors.email && <p>{errors.email}</p>} </div>
                        <span>Username: </span>
                        <input readOnly={!props.isEditable} type='text' defaultValue={props.userList.username} name='username'></input>
                        <div className='err-msg'> {errors.username && <p>{errors.username}</p>} </div>
                        {props.isEditable ? <div className='btn-flex'>
                            <button type='submit'>Save</button>
                            {saved ? <p>{saved}</p> : null}
                        </div> : null}
                    </div>
                </div>
            </form>
        </div>
    )
}
