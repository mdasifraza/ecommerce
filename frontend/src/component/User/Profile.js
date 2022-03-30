import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { useSelector } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import './Profile.css';

const Profile = () => {
    const { isAthenticated, user, loading } = useSelector(state => state.user);
    const history = useNavigate();

    useEffect(() => {
        if (isAthenticated === false) {
            history("/login");
        }
    }, [history, isAthenticated])

    return (
        <>
            <MetaData title={`${user.name}'s Profile`} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to='/me/update'>Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            {/* <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substring(0, 10)}</p>
                    </div> */}
                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile