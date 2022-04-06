import React, { useEffect, useRef, useState } from 'react';
import './payment.css';
import CheckoutSteps from '../Cart/CheckoutSteps.js';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../Layout/MetaData.js';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EventIcon from '@material-ui/icons/Event';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { createOrder, clearErrors } from '../../actions/orderAction.js';
import { useNavigate } from 'react-router-dom';



const Payment = () => {
    const history = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const payBtn = useRef(null);

    const submitHandler = () => {

    }

    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}

export default Payment