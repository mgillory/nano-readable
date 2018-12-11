import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { fetchPosts } from './actions/postAction';
import { fetchCategories } from './actions/categoryAction';
import { sortFunction, formatDate } from './utils/helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'vote-desc'
    }
  }

  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { posts, categories } = this.props;
    const { value } = this.state;
    return (
      <div className="App">
        {categories.map(cat => (
          <div key={cat.path}>
            {cat.name}
          </div>
        ))}
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="vote-desc">Vote Descending</option>
          <option value="vote-asc">Vote Ascending</option>
          <option value="date-desc">Date Descending</option>
          <option value="date-asc">Vote Ascending</option>
        </select>
        {posts.sort(sortFunction(value)) && posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <h6>{post.category}</h6>
            <p>Vote Score: {post.voteScore}</p>
            <p>Date: {formatDate(post.timestamp)}</p>
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
