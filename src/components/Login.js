import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {clearAuthState, login} from '../actions/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.emailInputRef = React.createRef();
        // this.passswordInputRef = React.createRef();
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    handleEmailChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            password: e.target.value
        })
    }
    handelFormSubmit = (e) => {
        e.preventDefault();
        // console.log('this.emailInputRef', this.emailInputRef);
        // console.log('this.passswordInputRef', this.passswordInputRef);
        const {email, password} = this.state;
        
        if (email && password) {
            this.props.dispatch(login(email, password));
        }
    }
    render() {
        const {error, inProgress, isLoggedIn} = this.props.auth;
        const{from} = this.props.location.state || {from: {pathname: '/'}}

        if (isLoggedIn) {
            return <Redirect to={from} />
        }
        return (
            <form className="login-form">
                <span className="login-signup-header">Login In</span>
                {error && <div className="alert error-dailog">{error}</div>}
                <div className="field">
                    <input type="email" placeholder="Email" 
                        //required ref={this.emailInputRef} 
                        onChange= {this.handleEmailChange}
                        value= {this.state.email}
                    />
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" required 
                        //ref={this.passswordInputRef} 
                        onChange= {this.handlePasswordChange}
                        value= {this.state.password}
                    />
                </div>
                <div className="field">
                    {inProgress ? 
                        <button onClick={this.handelFormSubmit} disabled={inProgress}>Logging In...</button> :
                        <button onClick={this.handelFormSubmit} disabled={inProgress}>Login</button>
                    }
                </div>
            </form>
        );
    }
}

function mapStateToProps (state) {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(Login);