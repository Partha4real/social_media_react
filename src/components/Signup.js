import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


import {startSignup, signupuser, clearAuthState} from '../actions/auth'

class Signup extends Component {
    constructor(props) {
        super(props);
        // this.emailInputRef = React.createRef();
        // this.passswordInputRef = React.createRef();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    handleInputChange = (field, value) => {
        this.setState({
          [field]: value,
        });
      };

    onFormSubmit = (e) => {
        e.preventDefault();
        // console.log('this.emailInputRef', this.emailInputRef);
        // console.log('this.passswordInputRef', this.passswordInputRef);
        const {email, password, confirmPassword, name} = this.state;
        
        if (email && password && confirmPassword && name) {
            this.props.dispatch(startSignup());
            this.props.dispatch(signupuser(email, password, confirmPassword, name));
        }
    }

    render() {
        const {error, inProgress, isLoggedIn} = this.props.auth;
        
        if (isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <form className="login-form">
              <span className="login-signup-header"> Signup</span>
              {error && <div className="alert error-dailog">{error}</div>}
              <div className="field">
                <input
                  placeholder="Name"
                  type="text"
                  required
                  onChange={(e) => this.handleInputChange('name', e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  placeholder="Email"
                  type="email"
                  required
                  onChange={(e) => this.handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="field">
                <input
                  placeholder="Confirm password"
                  type="password"
                  required
                  onChange={(e) =>
                    this.handleInputChange('confirmPassword', e.target.value)
                  }
                />
              </div>
              <div className="field">
                <input
                  placeholder="Password"
                  type="password"
                  required
                  onChange={(e) => this.handleInputChange('password', e.target.value)}
                />
              </div>
              <div className="field">
                <button onClick={this.onFormSubmit} disabled={inProgress}>
                  Signup
                </button>
              </div>
            </form>
          );
    }
}

function mapStateToProps ({auth}) {
    return {
        auth,
    }
}

export default connect(mapStateToProps)(Signup);