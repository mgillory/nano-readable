import { FETCH_POSTS, NEW_POST } from './types';

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