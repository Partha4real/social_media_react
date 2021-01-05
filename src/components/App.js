import React from 'react';
import {connect} from 'react-redux';

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
export default connect(mapStateToProps)(App);
 
