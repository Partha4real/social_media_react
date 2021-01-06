import React from 'react';

function Comment({comment}) {
    return (
        <div className="post-comment-item">
            <div className="post-comment-header">
                <div className="post-comment-author">{comment.user.name}</div>
                <div className="post-comment-time">a minite ago</div>
                <div className="post-comment-likes">{comment.likes.length}</div>
            </div>
            <div className="post-comment-content">{comment.content}</div>
        </div>
    )
}

export default Comment;