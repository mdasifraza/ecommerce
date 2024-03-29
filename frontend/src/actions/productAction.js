import axios from 'axios';
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstant';
import { API_BASE_URL } from '../config/index';

const authToken = sessionStorage.getItem("token")

// export const getProduct = (keyword = "") => async (dispatch) => {
export const getProduct = (keyword = "", currentPage = 1, price = [0, 2500000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        // let link = `/api/v1/products?keyword=${keyword}`;
        let link = `${API_BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            link = `${API_BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        let link = `${API_BASE_URL}/api/v1/admin/products`;
        const { data } = await axios.get(link, config);
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(authToken)}`,
            },
            withCredentials: true
        };

        const { data } = await axios.post(`${API_BASE_URL}/api/v1/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(authToken)}`,
            },
            withCredentials: true
        };

        const { data } = await axios.put(`${API_BASE_URL}/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const removeProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(authToken)}`,
            },
            withCredentials: true
        };

        const { data } = await axios.delete(`${API_BASE_URL}/api/v1/admin/product/${id}`, config);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(authToken)}`,
            },
            withCredentials: true
        };
        const { data } = await axios.get(`${API_BASE_URL}/api/v1/products/${id}`, config);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(authToken)}`,
            },
            withCredentials: true
        };
        const { data } = await axios.put(`${API_BASE_URL}/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        })
    }
};

//get all review for admin
export const getAllReviews = (productId) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(authToken)}`,
            },
            withCredentials: true
        };

        const { data } = await axios.get(`${API_BASE_URL}/api/v1/reviews?productId=${productId}`, config);

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Review of a Product for admin
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(authToken)}`,
            },
            withCredentials: true
        };
        // const { data } = await axios.delete(
        //     `/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`
        // );
        const { data } = await axios.delete(
            `${API_BASE_URL}/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`, config
        );
        // const { data } = await axios.delete(
        //     `/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`
        // );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};