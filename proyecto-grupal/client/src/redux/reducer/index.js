import { clearPsychologistList } from "../actions";
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
  FILTER_PSYCHOLOGIST_BY_RATING,
  ORDER_PSICHOLOGIST_BY_RATING,
  GET_POSTS,
  GET_POSTS_BY_PSYCHOLOGIST_ID,
  PUT_POSTS,
  CLEAR_CLIENT,
  GET_PAYMENT,
  GET_PAYMENT_PSY,
  GET_PAYMENT_CLIENT,
  GET_RANGE_BY_DATE,
  CLEAR_PSYCHOLOGIST,
  CLEAR_CLIENT_LIST,
  CLEAR_ADMIN_SEARCHBAR,
  ADMIN_SEARCHBAR,
  SORT_BY_DATE,
  GET_ALL_PSYCHOLOGIST_BY_STATUS,
  FILTER_BY_STATUS,
  GET_SCHEDULE,
  GET_APPOINTMENT_AS_PSYCHOLOGIST,
  GET_APPOINTMENT_AS_CLIENT,
  GET_APPOINTMENT_BY_ID,
  DELETE_APPOINTMENT_AS_CLIENT,
  PUT_APPOINTMENT,
  CLEAR_SCHEDULE,
  SORT_BY_DATE_PSY,
  SORT_BY_DATE_CLI,
  GET_SCHEDULE_BY_ID
} from "../actions/types";

const initialState = {
  userPsichologistDetail: {},
  psychologistProfile: [],
  allUsersPsichologists: [], // actual
  UserPsichologists: [], // nuevo
  userClientDetail: [],
  usersClients: [],
  usersClientsSearch: [],
  posts: [],
  postsCopy: [],
  categories: [],
  postDetail: {},
  schedule: [],
  scheduleDetails: {},
  paymentDetailsClient: [],
  paymentDetailsPsychologist: [],
  allPayments: [],
  email: {},
  adminSearchbar: "",
  reviews: [],
  appointments: [],
  appointmentDetails: {},
  appoint: []
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
        usersClientsSearch: action.payload,
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
        posts: action.payload,
        postsCopy: action.payload,
      };

    /*-----------PSYCHOLOGISTS-----------*/
    case GET_ALL_PSYCHOLOGIST:
      return {
        ...state,
        allUsersPsichologists: action.payload,
        UserPsichologists: action.payload,

      };
    case GET_ALL_PSYCHOLOGIST_BY_STATUS:
      return {
        ...state,
        allUsersPsichologists: action.payload,
        UserPsichologists: action.payload,
      };

    case GET_USER_PSYCHOLOGISTS_BY_NAME:
      return {
        ...state,
        allUsersPsichologists: action.payload,
      };
    case "GET_PSYCHOLOGISTS_DETAILS":
      return {
        ...state,
        userPsichologistDetail: action.payload
      };
    case "GET_PSYCHOLOGISTS_ONE":
      return {
        ...state,
        psychologistProfile: action.payload,
      };
    case "GET_BY_CATEGORY_POST":
      return {
        ...state,
        posts: action.payload,
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

    case ORDER_PSICHOLOGIST_BY_RATING:
      return {
        ...state,
        allUsersPsichologists: action.payload
      };

    /*-----------RATING-----------*/
    case FILTER_PSYCHOLOGIST_BY_RATING:
      return {
        ...state,
        reviews: action.payload
      }

    /*-----------POSTS-----------*/
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsCopy: action.payload,

      };
    case GET_POSTS_BY_PSYCHOLOGIST_ID:
      return {
        ...state,
        posts: action.payload
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
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((posts) => posts.id !== action.payload),
      };
    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case PUT_POSTS:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }

    /*-----------SCHEDULE-----------*/
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload
      }
    case GET_SCHEDULE_BY_ID:
      return {
        ...state,
        scheduleDetails: action.payload
      }

    /*-----------APPOINTMENTS-----------*/
    case GET_APPOINTMENT_AS_PSYCHOLOGIST:
      return {
        ...state,
        appointments: action.payload
      }
    case GET_APPOINTMENT_AS_CLIENT:
      return {
        ...state,
        appointments: action.payload
      }
    case DELETE_APPOINTMENT_AS_CLIENT:
      return {
        ...state,
        appointments: state.appointments.filter(appo => appo._id !== action.payload)
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
        usersClients: [],
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
    /*-----------PAYMENT-----------*/
    case GET_PAYMENT:
      return {
        ...state,
        allPayments: action.payload,
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
      };
    case GET_RANGE_BY_DATE:
      const allPayments = state.allPayments;
      const filterByMonth = allPayments.filter((p) =>
        p.createdAt?.some((date) => new Date(date).getUTCMonth() + 1 === action.payload
        ));
      return {
        ...state,
        allPayments: filterByMonth
      }
    //All Payments
    case SORT_BY_DATE:
      let sortedPayments = [state.allPayments];
      sortedPayments =
        action.payload === "asc"
          ? state.allPayments.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
          : state.allPayments.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
      return {
        ...state,
        allPayments: sortedPayments,
      };
    // Only clients
    case SORT_BY_DATE_CLI:
      let sortedPaymentsCli = [state.paymentDetailsClient];
      sortedPaymentsCli =
        action.payload === "asc"
          ? state.paymentDetailsClient.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
          : state.paymentDetailsClient.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
      return {
        ...state,
        paymentDetailsClient: sortedPaymentsCli,
      };
    // Only Psy
    case SORT_BY_DATE_PSY:
      let sortedPaymentsPsy = [state.paymentDetailsPsychologist];
      sortedPaymentsPsy =
        action.payload === "asc"
          ? state.paymentDetailsPsychologist.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
          : state.paymentDetailsPsychologist.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
      return {
        ...state,
        paymentDetailsPsychologist: sortedPaymentsPsy,
      };
    case FILTER_BY_STATUS:
      let filtered = state.paymentDetailsPsychologist;
      filtered =
        action.payload === 'abonado'
          ? state.paymentDetailsPsychologist.filter((p) => p.status === true)
          : state.paymentDetailsPsychologist.filter((p) => p.status === false)
      return {
        ...state,
        paymentDetailsPsychologist: filtered,
      };

    /*-----------SEARCHBAR-----------*/
    case ADMIN_SEARCHBAR:
      return {
        ...state,
        adminSearchbar: action.payload,
      };

    /*-----------APPOINTMENTS-----------*/
    case GET_APPOINTMENT_AS_PSYCHOLOGIST:
      return {
        ...state,
        appointments: action.payload
      }
    case GET_APPOINTMENT_AS_CLIENT:
      return {
        ...state,
        appointments: action.payload
      }
    case GET_APPOINTMENT_BY_ID:
      return {
        ...state,
        appointmentDetails: action.payload
      }
    case DELETE_APPOINTMENT_AS_CLIENT:
      return {
        ...state,
        appointments: state.appointments.filter(appo => appo._id !== action.payload)
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
        usersClients: [],
      };
    case CLEAR_PSYCHOLOGIST_LIST:
      return {
        ...state,
        allUsersPsichologists: [],
      };
    case CLEAR_ADMIN_SEARCHBAR:
      return {
        ...state,
        adminSearchbar: [],
      };
    case CLEAR_SCHEDULE:
      return {
        ...state,
        schedule: [],
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
