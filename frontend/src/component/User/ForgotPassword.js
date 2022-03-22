import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { clearErrors, forgotPassword } from "../../actions/profileAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    const { loading, error, message } = useSelector(state => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Update Profile" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">Forgot Password</h2>
                            <form className="forgotPasswordForm" encType="multipart/form-data" onSubmit={forgotPasswordSubmit}>
                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Send" className="forgotPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ForgotPassword