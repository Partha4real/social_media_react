import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED, AUTHENTICATE_USER, LOG_OUT, CLEAR_AUTH_STATE, EDIT_USER_SUCCESSFUL, EDIT_USER_FAILED } from './actionTypes';
import {APIUrls} from '../helpers/url';
import {getFormBody, getAuthTokenFromLocalStorage} from '../helpers/utils';
import { func } from 'prop-types';

// LOGIN
export function login (email, password) {
    return (dispatch) => {
        dispatch(startLogin());
        const url = APIUrls.login();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:getFormBody({email, password}),
        })
        .then((response) => response.json())
        .then ((data) => {
            console.log(data)
            if(data.success) {
                // action to save user
                localStorage.setItem('token', data.data.token);
                dispatch(loginSuccess(data.data.user));
                return;
            }
            dispatch(loginFailed(data.message));
        })
    }
}

export function startLogin () {
    return {
        type: LOGIN_START
    }
}

export function loginFailed (errorMessage) {
    return {
        type: LOGIN_FAILED,
        error: errorMessage,
    }
}

export function loginSuccess (user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    }
}

// SIGNUP
export function signupuser (email, password, confirmPassword, name) {
    return (dispatch) => {
        const url = APIUrls.signup();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:getFormBody({email, password, confirm_password: confirmPassword, name}),
        })
        .then((response) => response.json())
        .then ((data) => {
            console.log('signup',data)
            if(data.success) {
                // action to save user
                localStorage.setItem('token', data.data.token);
                dispatch(signupSuccessful(data.data.user));
                return;
            }
            dispatch(signupFailed(data.message));
        })
    }
}

export function startSignup () {
    return {
        type: SIGNUP_START
    }
}

export function signupFailed (error) {
    return {
        type: SIGNUP_FAILED,
        error,
    }
}

export function signupSuccessful (user) {
    return {
        type: SIGNUP_SUCCESS,
        user,
    }
}

export function authenticateUser (user) {
    return {
        type: AUTHENTICATE_USER,
        user
    }
}

export function logout (user) {
    return {
        type: LOG_OUT 
    }
}

export function clearAuthState () {
    return{
        type: CLEAR_AUTH_STATE
    }
}

// Settings
export function editUserSuccessful (user) {
    return{
        type: EDIT_USER_SUCCESSFUL,
        user
    }
}

export function editUserFsiled (error) {
    return{
        type: EDIT_USER_FAILED,
        error
    }
}

export function editUser (name, password, confirmPassword, userId) {
    return (dispatch) => {
        const url = APIUrls.editProfile();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
            body:getFormBody({name, password, confirm_password: confirmPassword, id:userId}),
        })
        .then((respponse)=> respponse.json())
        .then((data)=> {
            console.log('Edit Data', data);
            if(data.success) {
                dispatch(editUserSuccessful(data.data.user))
                if(data.data.token) {
                    localStorage.setItem('token', data.data.token);
                }
                return;
            }

            dispatch(editUserFsiled(data.message))
        })
    }
}