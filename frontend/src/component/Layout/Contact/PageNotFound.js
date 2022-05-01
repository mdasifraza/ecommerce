import React from 'react';
import './Contact.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="contactContainer">
            <Link className="mailBtn" to='/'>
                <Button>You have entered wrong URL</Button>
            </Link>
        </div>
    )
}

export default PageNotFound