import React from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard.js';

const Cart = () => {

    const item = {
        product: "productId",
        price: 200,
        name: "lappy",
        quantity: 1,
        image: "https://picsum.photos/200/300"
    }
    return (
        <>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>
                <div className="cartContainer">
                    <CartItemCard item={item} />
                    <div className="cartInput">
                        <button>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button>+</button>
                    </div>
                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                </div>
            </div>
        </>
    )
}

export default Cart