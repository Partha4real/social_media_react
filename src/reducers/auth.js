import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED, AUTHENTICATE_USER, LOG_OUT, CLEAR_AUTH_STATE} from '../actions/actionTypes'

const initialAuthState = {
    user: {},
    error: null,
    isLoggedIn: false,
    inProgress: false
}
export default function auth (state= initialAuthState, action) {
    switch(action.type) {
        case CLEAR_AUTH_STATE:
            return {
                ...state,
                error: null
            }
        case SIGNUP_START:
        case LOGIN_START:
            return {
                ...state,
                inProgress: true
            }
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
                inProgress: false,
                error: null
            }
        case SIGNUP_FAILED: 
        case LOGIN_FAILED:
            return {
                ...state,
                inProgress: false,
                error: action.error
            }
        case AUTHENTICATE_USER:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true
            }
        case LOG_OUT:
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }
        default: 
            return state;
    }
}