
import {
  GET_ALL_USERCLIENTS,
  GET_USERCLIENT,
  GET_USER_CLIENTS_BY_NAME,
  LOGIN_CLIENT,
  CREATE_CLIENT,
  GET_ALL_PSYCHOLOGIST,
  GET_USER_PSYCHOLOGISTS_BY_NAME,
  CLEAR_PSYCHOLOGIST_LIST,
  FILTER_PSICHOLOGIST_BY_SPECIALTIES,
  ORDER_PSICHOLOGIST_BY_RATING,
  GET_POSTS,
  CLEAR_CLIENT,
  GET_PAYMENT,
  GET_ONE_PAYMENT,
  GET_PAYMENT_PSY,
  GET_PAYMENT_CLIENT,
  CLEAR_PSYCHOLOGIST,
  CLEAR_CLIENT_LIST,
  ADMIN_SEARCHBAR
} from "../actions/types";

const initialState = {
  userPsichologistDetail: {},
  allUsersPsichologists: [], // actual 
  UserPsichologists: [], // nuevo
  userClientDetail: [],
  usersClients: [],
  posts: [],
  categories: [],
  postDetail: {},
  schedule: {},
  paymentDetailsClient: [],
  paymentDetailsPsychologist: [],
  allPayments: [],
  email: {},
  adminSearchbar: ""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    /*-----------CLIENTS-----------*/
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
    case LOGIN_CLIENT:
      return {
        ...state,
      };
    case CREATE_CLIENT:
      return {
        ...state,
      };

    /*-----------PSYCHOLOGISTS-----------*/
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
    case FILTER_PSICHOLOGIST_BY_SPECIALTIES:
      const psichologists = state.UserPsichologists
      const filterBySpecialties = psichologists.filter(el => {
        let specialties = el.Specialties.map(el => el)
        return specialties.includes(action.payload)
      })
      return {
        ...state,
        allUsersPsichologists: action.payload === "Todas" ? psichologists : filterBySpecialties,
      };
    case ORDER_PSICHOLOGIST_BY_RATING:

      return {
        ...state,
        allUsersPsichologists: action.payload
      }

    /*-----------POSTS-----------*/
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
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(posts => posts.id !== action.payload)
      }

    /*-----------CLEAR-----------*/
    case CLEAR_CLIENT:
      return {
        ...state,
        userClientDetail: [],
      };
    case CLEAR_PSYCHOLOGIST:
      return {
        ...state,
        userPsichologistDetail: {},
      };
    case CLEAR_CLIENT_LIST:
      return {
        ...state,
        allUsersPsichologists: [],
      };
    case CLEAR_PSYCHOLOGIST_LIST:
      return {
        ...state,
        allUsersPsichologists: [],
      };
    case ADMIN_SEARCHBAR:
      return {
        ...state,
        adminSearchbar: action.payload,
      };
    case GET_PAYMENT:
      return {
        ...state,
        allPayments: [],
      };
    case GET_PAYMENT_CLIENT:
      return {
        ...state,
        paymentDetailsClient: action.payload,
      };
    case GET_PAYMENT_PSY:
      return {
        ...state,
        paymentDetailsPsychologist: action.payload
      }
    default:
      return { ...state };
  }
}

export default rootReducer;
