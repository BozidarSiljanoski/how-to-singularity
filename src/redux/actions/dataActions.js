import { LOADING_DATA, SET_HOWS } from "../types";
import axios from 'axios';

export const getUserData = (userHandle) => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios.get(`/user/${userHandle}`)
    .then( res => {
      dispatch({
        type: SET_HOWS,
        payload: res.data.hows
      });
    })
    .catch( () => {
      dispatch({
        type: SET_HOWS,
        payload: null
      })
    })
}