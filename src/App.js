import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import { fetchPosts } from './actions/postAction';
import { fetchCategories } from './actions/categoryAction';
import { sortFunction, formatDate } from './utils/helpers';
import NewPost from './components/NewPost';

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

  handleClick = (e) => {
    e.preventDefault();
    console.log('NewPost | MODAL HERE');
  }

  renderPosts = (arr) => {
    const { categories } = this.props;
    return (
      <div>
        {categories.map(cat => (
          <div key={cat.path}>
            <Link to={`/${cat.path}`}>
              {cat.name}
            </Link>
          </div>
        ))}
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="vote-desc">Vote Descending</option>
          <option value="vote-asc">Vote Ascending</option>
          <option value="date-desc">Date Descending</option>
          <option value="date-asc">Vote Ascending</option>
        </select>
        <button onClick={this.handleClick}>
          New Post
        </button>
        {arr.sort(sortFunction(this.state.value)) && arr.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <h6>{post.category}</h6>
            <p>Vote Score: {post.voteScore}</p>
            <p>Date: {formatDate(post.timestamp)}</p>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { posts } = this.props;
    console.log(this.props.posts);
    return (
      <div className="App">
        <Route exact path="/" component={() => this.renderPosts(posts)} />
        <Route path="/:catPath" component={({ match }) => this.renderPosts(posts.filter(post => post.category === match.params.catPath))} />
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

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchCategories })(App));
