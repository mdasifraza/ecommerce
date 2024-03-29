import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/profileConstant.js';
import axios from 'axios';
import { API_BASE_URL } from '../config/index.js';

const authToken = sessionStorage.getItem("token")

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.put(`${API_BASE_URL}/api/v1/me/update`,
            userData,
            config
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
    }
};

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.put(`${API_BASE_URL}/api/v1/password/update`,
            passwords,
            config
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.post(`${API_BASE_URL}/api/v1/password/forgot`,
            email,
            config
        );
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.put(`${API_BASE_URL}/api/v1/password/reset/${token}`,
            passwords,
            config
        );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

//updat user for admin
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.put(`${API_BASE_URL}/api/v1/admin/user/${id}`,
            userData,
            config
        );
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
    }
};

//delete user for admin
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.delete(`${API_BASE_URL}/api/v1/admin/user/${id}`, config);
        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};