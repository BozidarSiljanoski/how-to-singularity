import {
  LOADING_DATA,
  SET_HOWS,
  LIKE_HOW,
  UNLIKE_HOW,
  DELETE_HOW
} from "../types";
import axios from 'axios';

export const getUserData = (userHandle) => dispatch => {
  dispatch({type: LOADING_DATA});
  axios.get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_HOWS,
        payload: res.data.hows
      });
    })
    .catch(() => {
      dispatch({
        type: SET_HOWS,
        payload: null
      })
    })
};

// GET ALL HOWS
export const getHows = () => dispatch => {
  dispatch({type: LOADING_DATA});
  axios.get('/hows')
    .then(res => {
      dispatch({
        type: SET_HOWS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_HOWS,
        payload: []
      })
    })
};

// Like a how
export const likeHow = (howId) => dispatch => {
  axios.get(`/how/${howId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_HOW,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
};

// Unlike a how
export const unlikeHow = (howId) => dispatch => {
  axios.get(`/how/${howId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_HOW,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
};

export const deleteHow = (howId) => dispatch => {
  axios.delete(`/how/${howId}`)
    .then(() => {
      dispatch({ type: DELETE_HOW, payload: howId})
    })
    .catch(err => console.log(err));
};