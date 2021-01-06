import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';


import {fetchPosts} from '../actions/posts';
import {Home, Navbar, Page404, Login, Signup, Settings, UserProfile} from './';
import jwtDecode from 'jwt-decode';
import {authenticateUser } from '../actions/auth';
import {getAuthTokenFromLocalStorage} from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';


// const Login = () => <div>Login</div>
// const Signup = () => <div>Signup</div>
// const Home = (props) => {
//   console.log('Home', props)
//   return <div>Home</div>
// }

// const Settings= () => <div>Settings</div>
const PrivateRoute = (privateRouteProps) => {
  const {isLoggedIn, path, component: Component} = privateRouteProps;
  return <Route path={path} render={(props)=> {
    return isLoggedIn ? <Component {...props} /> : <Redirect to={{
      pathname: '/login',
      state: {
        from: props.location,
      }
    }} />
  }} />
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();
    console.log(token);

    if (token) {
      const user = jwtDecode(token);
      console.log(user)
      this.props.dispatch(authenticateUser({
        email: user.email,
        _id: user._id,
        name: user.name
      }));
      this.props.dispatch(fetchUserFriends());
    }
  }
  

  render() {
    //console.log('Props', this.props);
    const {posts, auth, friends} = this.props;
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
              return <Home {...props} posts={posts} friends={friends} isLoggedIn={auth.isLoggedIn} />     // we are passing props to pass the default props of the Route like location, history,etc
            }} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/settings" component={Settings} isLoggedIn={auth.isLoggedIn} />
            <PrivateRoute path="/user/:userId" component={UserProfile} isLoggedIn={auth.isLoggedIn} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>

    );
  }
}

function mapStateToProps (state) {   // we are basicall mapping all our redux state to our store
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(App);
 
