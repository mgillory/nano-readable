import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { fetchPosts } from './actions/postAction';

class App extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      <div className="App">
        {this.props.posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <h6>{post.category}</h6>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items
});

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { fetchPosts })(App);
