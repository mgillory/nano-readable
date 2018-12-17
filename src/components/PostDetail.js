import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPostComments } from '../actions/postAction';

class PostDetail extends Component {
  componentWillMount() {
    this.props.fetchPostComments(this.props.post.id);
  }

  render() {
    console.log('comments ', this.props.comments);
    return (
      <div>asdasd</div>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.posts.comments
});

PostDetail.propTypes = {
  fetchPostComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
}

export default withRouter(connect(mapStateToProps, { fetchPostComments })(PostDetail));