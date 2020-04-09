import axios from 'axios';
import {history} from "../browserHistory"

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_REGISTER_FAIL = 'AUTH_REGISTER_FAIL';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authStart = () => {
    return {
        type: AUTH_START
    }
};

export const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        token
    }
};

export const authRegisterFail = error => {
    return {
        type: AUTH_REGISTER_FAIL,
        error
    }
};

export const authLoginFail = error => {
    return {
        type: AUTH_LOGIN_FAIL,
        error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_LOGOUT
    }
};

export const authLogin = (username, password, redirect) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://mysite478474.com/rest-auth/login/', {username, password})
            .then(res => {
                const token = res.data.key;
                localStorage.setItem('token', token);
                dispatch(authSuccess(token));
                history.replace(redirect || '/')
            })
            .catch(error => {
                dispatch(authLoginFail(error.response.data));
            });
    };
};

export const authRegister = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://mysite478474.com/rest-auth/registration/',
            {username, email, password1, password2})
            .then(res => {
                    const token = res.data.key;
                    localStorage.setItem('token', token);
                    dispatch(authSuccess(token));
                    history.replace('/')
                }
            )
            .catch(error => {
                dispatch(authRegisterFail(error.response.data));
            });
    };
};

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (token === undefined) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
        }
    };
};