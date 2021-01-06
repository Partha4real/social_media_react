import { APIUrls } from "../helpers/url"
import { USER_PROFILE_FAILED, USER_PROFILE_START, USER_PROFILE_SUCCESS } from "./actionTypes";
import {getAuthTokenFromLocalStorage} from '../helpers/utils';


export function userProfileStart () {
    return{
        type: USER_PROFILE_START,
    }
}

export function userProfileSuccess (user) {
    return{
        type: USER_PROFILE_SUCCESS,
        user
    }
}

export function userProfileFailed (error) {
    return{
        type: USER_PROFILE_FAILED,
        error
    }
}

export function fetchUserProfile (userId) {
    return (dispatch) => {
        dispatch(userProfileStart());

        const url = APIUrls.userProfile(userId);
        fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                dispatch(userProfileSuccess(data.data.user))
            }

            dispatch(userProfileFailed(data.message));
        })
    }
}