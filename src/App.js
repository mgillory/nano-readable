import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import {
  Card, Button, CardSubtitle, CardBody,
  CardTitle, CardText
} from 'reactstrap';
import PropTypes from 'prop-types';
import './App.css';
import { fetchPosts } from './actions/postAction';
import { sortFunction, formatDate } from './utils/helpers';
import Header from './components/Header';
import PostDetail from './components/PostDetail';
import PostCard from './components/PostCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.post = {};
    this.state = {
      value: 'vote-desc'
    }
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log('NewPost | MODAL HERE');
  }

  onDetails = (post) => {
    this.post = post;
  }

  renderPosts = (arr) => {
    return (
      <div>
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
          <PostCard key={post.id} post={post} onClick={this.onDetails} />
        ))}
      </div>
    )
  }

  render() {
    const { posts } = this.props;
    console.log(this.props.posts);
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={() => this.renderPosts(posts)} />
        <Route exact path="/:catPath" component={({ match }) => this.renderPosts(posts.filter(post => post.category === match.params.catPath))} />
        <Route exact path="/:catPath/:postId" render={() => (
          <PostDetail post={this.post} />
        )} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
});

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
}

export default withRouter(connect(mapStateToProps, { fetchPosts })(App));
