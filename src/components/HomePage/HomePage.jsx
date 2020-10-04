import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import pandora from "@faizaanceg/pandora";
//using Pandora to make the usage of local storage easy
import "./HomePage.css";

function HomePage() {

    const [isUserPresent, setIsUserPresent] = useState(false);
    //not showing login button without registration to avoid errors on screen
    useEffect(() => {
        const present = pandora.get('loggedInUser');
        if (present) {
            setIsUserPresent(false);
        }
    }, [isUserPresent])

    return (
        <div className='wrapper'>
            <h2>Welcome to Home Page</h2>
            <div className='container'>
                <div className='sides'>
                    <Link to='/signup'>
                        <div className='btn'><button>Signup</button></div>
                    </Link>
                    {/* conditionally rendering the button based on the local storage */}
                    {isUserPresent ? <Link to='/login'>
                        <div className='btn'><button>Login</button></div>
                    </Link> : null}

                </div>
            </div>
        </div>
    )
}

export default HomePage;