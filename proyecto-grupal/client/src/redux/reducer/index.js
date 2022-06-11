<<<<<<< HEAD
import { GET_USERCLIENT, GET_ALL_PSYCHOLOGIST } from "../actions/types";
=======
import { GET_ALL_PSYCHOLOGIST } from "../actions/types";
>>>>>>> 34811a5dcfa858896603d4a3fabbe005ee3e2885

const initialState = {
  userPsichologistDetail: {},
  allUsersPsichologists: [],
<<<<<<< HEAD
  userClientDetail: [],
=======
  userClientDetail: {},
  usersClients: [],
>>>>>>> 34811a5dcfa858896603d4a3fabbe005ee3e2885
  posts: [],
  schedules: [],
  schedule: {},
};
<<<<<<< HEAD

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERCLIENT:
      return {
        ...state,
        userClientDetail: action.payload,
      };
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "ORDER_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
=======

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    case "ORDER_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

>>>>>>> 34811a5dcfa858896603d4a3fabbe005ee3e2885
    case "SEARCH_POSTS_BY_TITLE":
      return {
        ...state,
        posts: action.payload,
      };

    case GET_ALL_PSYCHOLOGIST:
      return {
        ...state,
        allUsersPsichologists: action.payload,
      };
    case "CREATE_CLIENT":
      return {
        ...state,
      };
    case "CREATE_PSYCHOLOGIST":
      return {
        ...state,
      };
    case "GET_PSYCHOLOGISTS_ONE":
      return {
        ...state,
        userPsichologistDetail: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
