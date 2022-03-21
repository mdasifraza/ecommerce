import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    CLEAR_ERRORS
} from '../constants/profileConstant.js';
import axios from 'axios';

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.put(`/api/v1/me/update`,
            userData,
            config
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};