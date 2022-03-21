import React, { useState, useEffect } from 'react';
import './UpdateProfile.css';
import Loader from '../Layout/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { clearErrors, loadUser, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PROFILE_RESET } from '../../constants/profileConstant';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    const { user } = useSelector(state => state.user);
    const { loading, error, isUpdated } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }

    const registerDataChange = (e) => {
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
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            history("/profile");
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, error, alert, isUpdated, history, user])

    return (
        <div>UpdateProfile</div>
    )
}

export default UpdateProfile