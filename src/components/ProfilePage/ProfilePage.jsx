import React from 'react';
import pandora from "@faizaanceg/pandora";
import { Link, Redirect } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";
import "./ProfilePage.css";

function ProfilePage() {
    const userLists = pandora.get('users');
    const loggedIn = pandora.get('loggedInUser', -1);

    return loggedIn === -1 ? <Redirect to='/login' /> : (

        <div className='wrapper'>
            <h2>Profile Page</h2>
            <br />
            <br />
            <br />
            <nav className='nav-link'>
                <Link to='/'>
                    <button onClick={() => pandora.remove('loggedInUser')}>Logout</button>
                </Link>
            </nav>
            {userLists.map((userList, id) => {
                return (
                    <div>
                        <FormComponent userId={id} isEditable={loggedIn === id} userList={userList} />
                    </div>
                )
            })}
        </div>
    )
}

export default ProfilePage;