import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {logout } from '../actions/auth';
import { searchUsers } from '../actions/search';


class Navbar extends React.Component {
    logout = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logout());
    };
    
    handleSearch = (e) => {
        const searchText = e.target.value;
        this.props.dispatch(searchUsers(searchText));
    }
    render() {
        const {auth, results} = this.props;
        return (
            <div>
                <nav className="nav">
                    <div className="left-nav">
                        <Link to='/'>
                            <img src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-articleLarge-v4.jpg?quality=75&auto=webp&disable=upscale" style={{width:40}} alt="logo" />
                        </Link>
                    </div>
                    <div className="search-container">
                        <img className="search-icon" src="https://www.flaticon.com/svg/static/icons/svg/622/622669.svg"  alt="search-icon" />
                        <input placeholder="Search" onChange={this.handleSearch} />

                        {results.length > 0 && (
                            <div className="search-results">
                                <ul>
                                    {results.map((user) => (
                                        <Link to={`/user/${user._id}`}>
                                            <li className="search-results-row" key={user._id}>
                                                <img src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"  alt="user-dp" />
                                                <span>{user.name}</span>
                                            </li>
                                        </Link>
                                    ))}
                                    
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="right-nav">
                        {auth.isLoggedIn &&(
                            <div className="user">
                                <Link to="/settings">
                                    <img src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"  alt="user-dp" id="user-dp" />
                                </Link>
                                <span>{auth.user.name}</span>
                            </div>
                        )}
                        
                        <div className="nav-links">
                        <ul>
                            {!auth.isLoggedIn &&(
                                <li><Link to='/login'>Login</Link></li>
                            )}
                            {auth.isLoggedIn &&(
                                <li onClick={this.logout}>Logout</li>
                            )}
                            {!auth.isLoggedIn &&(
                                <li><Link to='/signup'>Signup</Link></li>
                            )}
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps (state) {   // we are basicall mapping all our redux state to our store
    return {
      auth: state.auth,
      results: state.search.results
    }
}

export default connect(mapStateToProps)(Navbar);