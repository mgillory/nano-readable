import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { fetchPosts } from './actions/postAction';
import { fetchCategories } from './actions/categoryAction';

class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="App">
        {this.props.categories.map(cat => (
          <div key={cat.path}>
            {cat.name}
          </div>
        ))}
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
  posts: state.posts.items,
  categories: state.categories.items
});

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { fetchPosts, fetchCategories })(App);
