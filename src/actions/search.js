import { APIUrls } from "../helpers/url";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes"

export function searchUsers (searchText) {
    return (dispatch) => {
        const url = APIUrls.userSearch(searchText);
        fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
        })
        .then((response) => response.json())
        .then ((data) => {
            console.log('SEARCH DATA',data)
            if(data.success) {
                // action to save user
                dispatch(searchResultSuccess(data.data.users));
                return;
            } else {
                dispatch(searchResultSuccess([]));
            }
        })
    }
}

export function searchResultSuccess (users) {
    return {
        type: FETCH_SEARCH_RESULTS_SUCCESS,
        users
    }
}