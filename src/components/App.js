import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import {fetchPosts} from '../actions/posts';
import {PostsList} from './'

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  

  render() {
    //console.log('Props', this.props);
    const {posts} = this.props;
    return (
      <div>
        <nav className="nav">
          <div className="left-nav">
            <img src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-articleLarge-v4.jpg?quality=75&auto=webp&disable=upscale" style={{width:40}} alt="logo" />
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
                <li>Log In</li>
                <li>Log Out</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </nav>
        <PostsList posts= {posts}/>
      </div>
    );
  }
}

function mapStateToProps (state) {   // we are basicall mapping all our redux state to our store
  return {
    posts: state.posts
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(App);
 
