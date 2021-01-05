import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {
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
                    <input placeholder="Search" />

                    <div className="search-results">
                    <ul>
                        <li className="search-results-row">
                        <img src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"  alt="user-dp" />
                        <span>Partha Sarathi</span>
                        </li>
                        <li className="search-results-row">
                        <img src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"  alt="user-dp" />
                        <span>Partha Sarathi</span>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="right-nav">
                    <div className="user">
                    <img src="https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"  alt="user-dp" id="user-dp" />
                    <span>Partha Sarathi</span>
                    </div>
                    <div className="nav-links">
                    <ul>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/logout'>Logout</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;