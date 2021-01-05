import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';


import {fetchPosts} from '../actions/posts';
import {Home, Navbar, Page404, Login, Signup} from './';
import jwtDecode from 'jwt-decode';
import {authenticateUser } from '../actions/auth';

// const Login = () => <div>Login</div>
// const Signup = () => <div>Signup</div>
// const Home = (props) => {
//   console.log('Home', props)
//   return <div>Home</div>
// }


class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      const user = jwtDecode(token);
      console.log(user)
      this.props.dispatch(authenticateUser({
        email: user.email,
        _id: user._id,
        name: user.name
      }))
    }
  }
  

  render() {
    //console.log('Props', this.props);
    const {posts} = this.props;
    return (
      <Router>      
        <div>
          <Navbar />
          {/* <PostsList posts= {posts}/>  */}
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul> */}
          <Switch>
            <Route exact={true} path="/" render={(props) => {
              return <Home {...props} posts={posts} />
            }} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>

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
 
