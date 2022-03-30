import React from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard.js';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { Link, useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';

const Cart = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)
    // const item = {
    //     product: "productId",
    //     price: 200,
    //     name: "lappy",
    //     quantity: 1,
    //     image: "https://picsum.photos/200/300"
    // }

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (quantity >= stock) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    };

    const removeCartItems = (productId) => {
        dispatch(removeItemsFromCart(productId));
    }

    const checkoutHandler = () => {
        history("/login?redirect=shipping");
    }

    return (
        <>
            <MetaData title="Cart" />
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>NO PRODUCTS IN YOUR 🛒</Typography>
                    <Link to='/products'>View Products</Link>
                </div>
            ) : (
                <>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems && cartItems.map((item) => (
                            <div key={item.product} className="cartContainer">
                                <CartItemCard item={item} removeCartItem={removeCartItems} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity)}>+</button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}
                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price, 0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Cart