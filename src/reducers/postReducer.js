import { FETCH_POSTS, FETCH_POST_DETAIL } from '../actions/types';

const initialState = {
  items: [],
  comments: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      }
    case FETCH_POST_DETAIL:
      return {
        ...state,
        comments: action.payload
      }
    default: return state;
  }
}