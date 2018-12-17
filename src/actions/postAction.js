import { FETCH_POSTS, FETCH_POST_DETAIL } from './types';

export const fetchPosts = () => dispatch => {
  fetch('http://localhost:3001/posts', {
    headers: { 'Authorization': 'whatever-you-want' }
  })
    .then(res => res.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    }));
}

export const fetchPostComments = (postId) => dispatch => {
  console.log('id ', postId);
  fetch(`http://localhost:3001/posts/${postId}/comments`, {
    headers: { 'Authorization': 'whatever-you-want' }
  })
    .then(res => res.json())
    .then(postComments => dispatch({
      type: FETCH_POST_DETAIL,
      payload: postComments
    }));
}