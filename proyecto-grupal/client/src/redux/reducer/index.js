import { FETCH_USERCLIENT } from "../actions/types";
const initialState = {
   userClientDetail: [],
}

function rootReducer(state = initialState, action) {
    switch(action.type){
       case FETCH_USERCLIENT:
          return {
             ...state,
             userClientDetail: action.payload
          }
    }
}

export default rootReducer;
