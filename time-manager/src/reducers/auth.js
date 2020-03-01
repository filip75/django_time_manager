import {AUTH_REGISTER_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, AUTH_LOGIN_FAIL} from "../actions/auth";

const initialState = {
    token: null,
    registerError: {},
    loginError: {},
    loading: false
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {...state, ...{registerError: {}, loginError: {}, loading: true}};
        case AUTH_SUCCESS:
            return {...state, ...{token: action.token, registerError: {}, loginError: {}, loading: false}};
        case AUTH_REGISTER_FAIL:
            return {...state, ...{registerError: action.error, loading: false}};
        case AUTH_LOGIN_FAIL:
            return {...state, ...{loginError: action.error, loading: false}};
        case AUTH_LOGOUT:
            return {...state, ...{token: null}};
        default:
            return state;
    }
};