import React, { Component } from 'react';
import {connect} from 'react-redux'
import { clearAuthState, editUser } from '../actions/auth';

class Settings extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: props.auth.user.name,
            password: '',
            confirmPassword: '',
            editMode: false
        }
    }

    handleChange = (fieldname, val) => {
        this.setState({
            [fieldname]: val
        })
    }

    handleSave = () => {
        const {password, confirmPassword, name} = this.state;
        const {user} = this.props.auth;
        this.props.dispatch(editUser(name, password, confirmPassword, user._id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }
    

    render() {
        const {user, error} = this.props.auth;
        const {editMode} =this.state;
        return (
            <div className="settings">
                <div className="img-container">
                    <img src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"  alt="user-dp" id="user-dp" />
                </div>
                {error && <div className="alert error-dailog">{error}</div>}
                {error === false && <div className="alert success-dailog">Successfully Updated.</div>}
                <div className="field">
                    <div className="field-label">Email</div>
                    <div className="field-value">{user.email}</div>
                </div>
                <div className="field">
                    <div className="field-label">Name</div>
                    {editMode ? (
                        <input type= "text" onChange={(e)=> this.handleChange('name', e.target.value)} value={this.state.name} />
                    ) : (
                        <div className="field-value">{user.name}</div>
                    )}
                </div>

                {editMode && <div className="field">
                    <div className="field-label">New Password</div>
                    <input type= "password" onChange={(e)=> this.handleChange('password', e.target.value)} value={this.state.password} />
                </div>}

                {editMode && <div className="field">
                    <div className="field-label">Confirm Password</div>
                    <input type= "password" onChange={(e)=> this.handleChange('confirmPassword', e.target.value)} value={this.state.confirmPassword} />
                </div>}

                <div className="btn-grp">
                    {editMode ? (
                        <button className="button save-btn" onClick={this.handleSave}>Save</button>
                    ) : (
                        <button className="button edit-btn" onClick={()=> this.handleChange('editMode', true)}>Edit</button>
                    )
                    }

                    {editMode && <div className="go-back" onClick={()=> this.handleChange('editMode', false)}>
                        Go Back
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {   // we are basicall mapping all our redux state to our store
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Settings);