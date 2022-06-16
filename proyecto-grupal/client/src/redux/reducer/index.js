import {
  GET_USERCLIENT,
  GET_ALL_PSYCHOLOGIST,
  CLEAR,
  CLEAR_CLIENT,
  FILTER_PSICHOLOGIST_BY_SPECIALTIES,
  ORDER_PSICHOLOGIST_BY_RATING

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
  specialties: [],
  psichologistByRating: []

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
        posts: []
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
      case FILTER_PSICHOLOGIST_BY_SPECIALTIES:
      return {
        ...state,
        specialties: action.payload,
      };
      case ORDER_PSICHOLOGIST_BY_RATING:
        return{
          ...state,
          psichologistByRating: action.payload
        }
      
    default:
      return { ...state };
  }
}

export default rootReducer;
