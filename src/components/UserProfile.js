import React, { Component } from 'react';
import { fetchUserProfile } from '../actions/profile';
import {connect} from 'react-redux';
import { APIUrls } from '../helpers/url';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {addFriend, removeFriend} from '../actions/friends';

class UserProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            success: null,
            error: null,
            successMessage: null,
        }
    }
    componentDidMount() {
        const {match} = this.props;

        if(match.params.userId) {
            // dispatch an action
            this.props.dispatch(fetchUserProfile(match.params.userId))
        }
    }
    componentDidUpdate(prevProps) {
        // console.log('Previous props',prevProps);
        const {match: {params: prevParams}} = prevProps;
        const {match: {params: currentParams}} = this.props;
        if (prevParams && currentParams && prevParams.userId !== currentParams.userId) {
            this.props.dispatch(fetchUserProfile(currentParams.userId));
        }
    }
    

    checkIfUserIsFriend = () => {
        console.log('check friend',this.props);
        const {match, friends} = this.props;
        const userId = match.params.userId;
        const index = friends.map(friend => friend.to_user._id).indexOf(userId);

        if(index !== -1) {
            return true;
        }
        return false;
    }

    handleAddFriendClick = async () => {
        const userId = this.props.match.params.userId;
        const url = APIUrls.addFriend(userId);

        const optons = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
        };
        const response = await fetch(url, optons);
        const data = await response.json();

        if (data.success) {
            this.setState ({
                success: true,
                successMessage: 'Addded Friend Successfully.'
            });

            this.props.dispatch(addFriend(data.data.friendship))
        } else {
            this.setState ({
                success: null,
                error: data.message
            });
        }
    }

    handleRemoveFriendClick = async () => {
        const {match} = this.props;
        const url = APIUrls.removeFriend(match.params.userId);

        const optons2 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
        };
        const response = await fetch(url, optons2);
        const data = await response.json();
        console.log('Remove Friend Await data', data)

        if (data.success) {
            this.setState ({
                success: true,
                successMessage: 'Removed Friend Successfully.'
            });

            this.props.dispatch(removeFriend(match.params.userId))
        } else {
            this.setState ({
                success: null,
                error: data.message
            });
        }
    }

    render() {
        // console.log('User profile', this.props);
        const {match: {params}, profile} = this.props;
        const user = profile.user;
        console.log(params)

        if (profile.inProgress) {
            return <h1>Loding ...</h1>
        }
        if (profile.error) {
            return <h1> <div className="alert error-dailog">{profile.error}</div></h1>
        }
        const isUserFriend = this.checkIfUserIsFriend();
        const {success, error, successMessage} = this.state;
        return (
            <div className="settings">
            <div className="img-container">
                <img src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"  alt="user-dp" />
            </div>

            <div className="field">
                <div className="field-label">Name</div>
                <div className="field-value">{user.name}</div>
            </div>

            <div className="field">
                <div className="field-label">Email</div>
                <div className="field-value">{user.email}</div>
            </div>

            <div className="btn-grp">
                {!isUserFriend ? 
                    <button className="button save-btn" onClick={this.handleAddFriendClick}>Add Friend</button> :
                    <button className="button save-btn" onClick={this.handleRemoveFriendClick}>Remove Friend</button> 
                    
                }
                {success && <div className="alert success-dailog">{successMessage}</div>}
                {error && <div className="alert error-dailog">{error}</div>}
            </div>
        </div>
        );
    }
}

function mapStateToProps (state) {   // we are basicall mapping all our redux state to our store
    return {
        profile: state.profile,
        friends: state.friends
    }
}
export default connect(mapStateToProps)(UserProfile);