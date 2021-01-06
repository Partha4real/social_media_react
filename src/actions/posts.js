import {ADD_POST, UPDATE_POSTS, ADD_COMMENT, UPDATE_POST_LIKE} from './actionTypes';
import {APIUrls} from '../helpers/url'
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

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

// add post
export function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function createPost (content) {
    return (dispatch) => {
        const url = APIUrls.createPost();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
            body: getFormBody({content})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Create Post Data', data);

            if(data.success) {
                // console.log('post.... data', data.data.post)
                dispatch(addPost(data.data.post));
            }
        })
    }
}

// comments
export function createComment(content, postId) {
    return (dispatch) => {
        const url = APIUrls.createComment();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
            body: getFormBody({content, post_id: postId}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Create Comment Data', data);

            if(data.success) {
                // console.log('post.... data', data.data.post)
                dispatch(addComment(data.data.comment, postId));
            }
        })
    }
}

export function addComment(comment, postId) {
    return {
        type: ADD_COMMENT,
        comment,
        postId
    }
}

// Likes
export function addLike(id, likeType, userId) {
    return (dispatch) => {
        const url = APIUrls.toggleLike(id, likeType);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Like Data', data);

            if(data.success) {
                // console.log('post.... data', data.data.post)
                dispatch(addLikeToStore(id, userId));
            }
        })
    }
}

export function addLikeToStore(postId, userId) {
    return {
        type: UPDATE_POST_LIKE,
        postId,
        userId
    }
}