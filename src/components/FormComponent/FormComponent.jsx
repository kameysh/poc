import React, { useState } from 'react';
import pandora from "@faizaanceg/pandora";
import validation from "../../validation";
import { Button, TextField, Card } from '@material-ui/core';

export default function FormComponent(props) {
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState();
    const styleError = {
        color: 'blue'
    }
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
                <Card style={{ textAlign: 'center', backgroundColor:'#e0e0e0'}}>
                    <div className='flexx'>
                        <strong><span>Email</span></strong><br />
                        <TextField readOnly={!props.isEditable} type='email' defaultValue={props.userList.email} name='email'></TextField>
                        <br /><br />
                        <div style={styleError}> {errors.email && <p>{errors.email}</p>} </div>
                        <strong><span>Username</span></strong><br />
                        <TextField readOnly={!props.isEditable} type='text' defaultValue={props.userList.username} name='username'></TextField>
                        <div style={styleError}> {errors.username && <p>{errors.username}</p>} </div>
                        <br />
                        {props.isEditable ? <div className='btn-flex'>
                            <div><Button style={{marginBottom: '15px'}} color='primary' variant='contained' type='submit'>Save</Button></div>
                           <div style={{color: 'green'}}>{saved ? <p>{saved}</p> : null}</div>
                        </div> : null}
                    </div>
                </Card>
            </form>
        </div>
    )
}
