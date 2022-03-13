import React from 'react';
import './LoginSignUp.css';
import Loader from '../Layout/Loader/Loader';

const LoginSignUp = () => {
    return (
        <>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form ref={loginTab} onSubmit={loginSubmit} className="loginForm">
                    
                </form>
            </div>
        </>
    )
}

export default LoginSignUp