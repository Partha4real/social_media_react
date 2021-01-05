import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED} from '../actions/actionTypes'

const initialAuthState = {
    user: {},
    error: null,
    isLoggedIn: false,
    inProgress: false
}
export default function auth (state= initialAuthState, action) {
    switch(action.type) {
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
        default: 
            return state;
    }
}