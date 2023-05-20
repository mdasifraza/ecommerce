import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/userContant';
import axios from 'axios';
import { baseUrl, STORAGE } from '../config';

const authToken = sessionStorage.getItem("token")

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        const { data } = await axios.post(`${baseUrl}/api/v1/login`,
            { email, password },
            config
        );
        // console.log(data)
        sessionStorage.setItem(STORAGE, JSON.stringify(data))
        sessionStorage.setItem("token", JSON.stringify(data.token))
        // const { data } = await axios.post(`/api/v1/login`,
        //     { email, password },
        //     config
        // );
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
        const { data } = await axios.post(`${baseUrl}/api/v1/register`,
            userData,
            config
        );
        // const { data } = await axios.post(`/api/v1/register`,
        //     userData,
        //     config
        // );
        sessionStorage.setItem(STORAGE, JSON.stringify(data))
        sessionStorage.setItem("token", JSON.stringify(data.token))
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
};

// checks if the user is already loggedIn
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.get(`${baseUrl}/api/v1/me`, config);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

//logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${baseUrl}/api/v1/logout`, { withCredentials: true });
        sessionStorage.clear()
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

//get all users for admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.get(`${baseUrl}/api/v1/admin/users`, config);
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

//get  user's details for admin
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(authToken)}`, 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        };
        const { data } = await axios.get(`${baseUrl}/api/v1/admin/user/${id}`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};