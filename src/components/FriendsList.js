import React, { Component } from 'react';
import {FriendsListItem} from './';


const FriendsList = (props) => {
    return(
        <div className="friends-list">
            <div className="header">Friends</div>
            {props.friends && props.friends.length === 0 && (
                <div className="no-friends">You will DIE ALONE!</div>
            )}

            {props.friends.map((friend) => (
                <FriendsListItem friend={friend.to_user} key={friend._id} />
            ))}
        </div>
        
    )
}

export default FriendsList;