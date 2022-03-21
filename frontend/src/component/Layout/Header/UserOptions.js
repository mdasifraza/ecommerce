import React, { useState } from 'react';
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { logout } from '../../../actions/userAction';

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    };

    function dashboard() {
        history("/dashboard")
    }

    function orders() {
        history("/orders")
    }

    function account() {
        history("/profile");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logged out successfully");
        history("/login");
    }

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                icon={<img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="profile"
                />}
            >
                {options.map((item, index) => (
                    <SpeedDialAction key={index}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions