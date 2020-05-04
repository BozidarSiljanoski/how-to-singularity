import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_HOW,
  UNLIKE_HOW
} from "../types";

const initialState = {
  authenticated: false,
  lading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_HOW:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            howId: action.payload.howId
          }
        ]
      }
    case UNLIKE_HOW:
      return {
        ...state,
        likes: state.likes.filter(like => like.howId !== action.payload.howId)
      };
    default:
      return state;
  }
}