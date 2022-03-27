import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import Loader from '../Layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { clearErrors, resetPassword } from '../../actions/profileAction';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';

const ResetPassword = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
    
    // const { user } = useSelector(state => state.user);
    const { loading, error, success } = useSelector(state => state.forgotPassword);
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        console.log(token);
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
            console.log("error clear")
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            console.log("successs clear")
            alert.success("Password Updated Successfully");
            history("/login");
        }
    }, [dispatch, error, alert, history, success])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Reset Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Reset Password</h2>
                            <form className="resetPasswordForm" encType="multipart/form-data" onSubmit={resetPasswordSubmit}>

                                <div>
                                    <LockOpenIcon />
                                    <input type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <LockIcon />
                                    <input type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Update" className="resetPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ResetPassword