import {
  GET_USERCLIENT,
  GET_ALL_PSYCHOLOGIST,
  CLEAR,
  CLEAR_CLIENT,
} from "../actions/types";

const initialState = {
  userPsichologistDetail: {},
  allUsersPsichologists: [],
  userClientDetail: [],
  usersClients: [],
  posts: [],
  postDetail: {},
  schedules: [],
  schedule: {},
};

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
    case "GET_POST_DETAIL":
      return {
        ...state,
        postDetail: action.payload,
      };
    case "ORDER_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    case "SEARCH_POSTS_BY_TITLE":
      return {
        ...state,
        posts: action.payload,
      };
    case "CLEAR_POST_DETAIL":
      return {
        ...state,
        postDetail: {},
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
    case CLEAR:
      return {
        ...state,
        userPsichologistDetail: {},
      };
    case CLEAR_CLIENT:
      return {
        ...state,
        userClientDetail: [],
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
