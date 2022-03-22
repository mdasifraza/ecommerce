import React, { useState, useEffect } from 'react';
import './UpdatePassword.css';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearErrors, updatePassword } from '../../actions/profileAction';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PASSWORD_RESET } from '../../constants/profileConstant';
import MetaData from '../Layout/MetaData';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    // const { user } = useSelector(state => state.user);
    const { loading, error, isUpdated } = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            history("/profile");
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }
    }, [dispatch, error, alert, isUpdated, history])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordeBox">
                            <h2 className="updatePasswordHeading">Update Password</h2>
                            <form className="updatePasswordForm" encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockIcon />
                                    <input type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Update" className="updatePasswordBtn" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UpdatePassword