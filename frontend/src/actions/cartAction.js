import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstant';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const authToken = sessionStorage.getItem("token")

//ADD TO CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    // const { data } = await axios.get(`/api/v1/products/${id}`);
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/products/${id}`, { withCredentials: true });
    // console.log(data);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippinInfo", JSON.stringify(data));
};