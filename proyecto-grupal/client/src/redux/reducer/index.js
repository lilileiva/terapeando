import {
  GET_ALL_USERCLIENTS,
  GET_USERCLIENT,
  GET_USER_CLIENTS_BY_NAME,
  CREATE_CLIENT,
  GET_ALL_PSYCHOLOGIST,
  GET_USER_PSYCHOLOGISTS_BY_NAME,
  CLEAR_PSYCHOLOGIST_LIST,
  GET_POSTS,
  CLEAR,
  CLEAR_CLIENT,
  CLEAR_CLIENT_LIST,
  ADMIN_SEARCHBAR,
  ADMIN_SEARCHBAR_CLEAR
} from "../actions/types";

const initialState = {
  userPsichologistDetail: {},
  allUsersPsichologists: [],
  userClientDetail: [],
  usersClients: [],
  posts: [],
  categories: [],
  postDetail: {},
  schedule: {},
  email: {},
  adminSearchbar: ""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERCLIENTS:
      return {
        ...state,
        usersClients: action.payload,
      };
    case GET_USER_CLIENTS_BY_NAME:
      return {
        ...state,
        usersClients: action.payload,
      };
    case GET_USERCLIENT:
      return {
        ...state,
        userClientDetail: action.payload,
      };
    case CREATE_CLIENT:
      return {
        ...state,
      };
    case GET_ALL_PSYCHOLOGIST:
      return {
        ...state,
        allUsersPsichologists: action.payload,
      };
    case GET_USER_PSYCHOLOGISTS_BY_NAME:
      return {
        ...state,
        allUsersPsichologists: action.payload,
      };
    case "GET_PSYCHOLOGISTS_ONE":
      return {
        ...state,
        userPsichologistDetail: action.payload,
      };
    case "CREATE_PSYCHOLOGIST":
      return {
        ...state,
      };
    case "GET_EMAIL_PSY":
      return {
        ...state,
        email: action.payload,
      };
    case GET_POSTS:
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
        posts: []
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_BY_CATEGORY_POST":
      return {
        ...state,
        posts: action.payload,
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
    case CLEAR_CLIENT_LIST:
      return {
        ...state,
        allUsersPsichologists: [],
      };
    case CLEAR_PSYCHOLOGIST_LIST:
      return {
        ...state,
        usersClients: [],
      };
    case ADMIN_SEARCHBAR:
      return {
        ...state,
        adminSearchbar: action.payload,
      };
    case ADMIN_SEARCHBAR_CLEAR:
      return {
        ...state,
        adminSearchbar: ""
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
