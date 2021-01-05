import {UPDATE_POSTS} from './actionTypes';
import {APIUrls} from '../helpers/url'

export function fetchPosts () {
     return (dispatch) => {
         const url = APIUrls.fetchPosts();
         fetch(url)
            .then((response) => {
                console.log(response);
                return response.json();
            }).then((data) => {
                console.log(data);
                dispatch(updatePosts(data.data.posts));
            });
     };
};

export function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts
    }
}