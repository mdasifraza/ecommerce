import React, { useEffect, useState } from 'react';
import MetaData from '../Layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import AdminSideBar from './AdminSidebar';
import {
    getOrderDetails,
    clearErrors,
    updateOrder,
} from '../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import { useAlert } from 'react-alert';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Button } from '@material-ui/core';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import './ProcessOrder.css';

const ProcessOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    const { orders, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    };


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <>
            <MetaData title="Admin | Process Order" />
            <div className="dashboard">
                <AdminSideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: orders.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{orders.user && orders.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {orders.shippingInfo && orders.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {orders.shippingInfo &&
                                                    `${orders.shippingInfo.address}, ${orders.shippingInfo.city}, ${orders.shippingInfo.state}, ${orders.shippingInfo.pinCode}, ${orders.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    orders.paymentInfo &&
                                                        orders.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {orders.paymentInfo &&
                                                    orders.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{orders.totalPrice && orders.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    orders.orderStatus && orders.orderStatus === "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {orders.orderStatus && orders.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {orders.orderItems &&
                                            orders.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>{" "}
                                                    <span>
                                                        {item.quantity} X ₹{item.price} ={" "}
                                                        <b>₹{item.price * item.quantity}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: orders.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {orders.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {orders.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading ? true : false || status === "" ? true : false
                                        }
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProcessOrder