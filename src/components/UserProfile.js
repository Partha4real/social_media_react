import React, { Component } from 'react';
import { fetchUserProfile } from '../actions/profile';
import {connect} from 'react-redux';

class UserProfile extends Component {
    componentDidMount() {
        const {match} = this.props;

        if(match.params.userId) {
            // dispatch an action
            this.props.dispatch(fetchUserProfile(match.params.userId))
        }
    }
    
    render() {
         console.log('User profile', this.props);
        const {match: {params}, profile} = this.props;
        const user = profile.user;
        console.log(params)

        if (profile.inProgress) {
            return <h1>Loding ...</h1>
        }
        if (profile.error) {
            return <h1> <div className="alert error-dailog">{profile.error}</div></h1>
        }
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
                <button className="button save-btn">Add Friend</button>
            </div>
        </div>
        );
    }
}

function mapStateToProps (state) {   // we are basicall mapping all our redux state to our store
    return {
        profile: state.profile
    }
}
export default connect(mapStateToProps)(UserProfile);