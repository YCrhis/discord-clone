import React from 'react'

/* material ui */
import { Button } from '@material-ui/core'

/* style */

import './login.css'

/* firebase */

import { auth, provider } from '../../firebase/firebase'

function Login() {

    const signIn = () =>{
        /* login with google */
        auth.signInWithPopup(provider)
        .catch(error => console.log(error))
    }

    return (
        <div className="login">

            <div className="login__logo">
                <img src="https://pbs.twimg.com/media/E0fRIpUXEAQTlUS.png" alt="" />
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
