import React, { useState, useEffect } from 'react';
import './UpdateProfile.css';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { loadUser } from "../../actions/userAction";
import { clearErrors, updateProfile } from "../../actions/profileAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PROFILE_RESET } from '../../constants/profileConstant';
import MetaData from '../Layout/MetaData';
import Profile from '../../images/Profile.png';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    const { user } = useSelector(state => state.user);
    const { loading, error, isUpdated } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(Profile);
    const [avatarPreview, setAvatarPreview] = useState(Profile);
    const [checkAvatarChange, setCheckAvatarChange] = useState(false);

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        if (checkAvatarChange) {
            myForm.set("avatar", avatar);
        }
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {
        setCheckAvatarChange(true);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            setCheckAvatarChange(false);
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            history("/profile");
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, error, alert, isUpdated, history, user])

    return (
        <>
            <MetaData title="Update Profile" />
            {loading ? <Loader /> :
                <>
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>
                            <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
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
                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input type="submit" value="Update" className="updateProfileBtn" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UpdateProfile