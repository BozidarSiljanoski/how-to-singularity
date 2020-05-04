import { SET_HOWS, LIKE_HOW, UNLIKE_HOW, LOADING_DATA } from "../types";

const initialState = {
  hows: [],
  how: {},
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type){
    case LOADING_DATA:
      return {
        ...state,
        loading: true

      };
    case SET_HOWS:
      return {
        ...state,
        hows: action.payload,
        loading: false
      };
    case LIKE_HOW:
    case UNLIKE_HOW:
      let index = state.hows.findIndex((how) => how.howId === action.payload.howId);
      state.hows[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}