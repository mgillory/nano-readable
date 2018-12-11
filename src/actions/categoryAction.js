import { FETCH_CATEGORIES } from './types';

export const fetchCategories = () => dispatch => {
  fetch('http://localhost:3001/categories', {
    headers: { 'Authorization': 'whatever-you-want' }
  })
    .then(res => res.json())
    .then(category => dispatch({
      type: FETCH_CATEGORIES,
      payload: category
    }));
}