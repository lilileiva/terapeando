const initialState = {
    userPsichologistDetail:{},
    usersPsichologists:[],
    userClientDetail:{},
    usersClients:[],
    posts:[],
    schedules:[],
    schedule:{}
}


function rootReducer(state = initialState,action) {
    switch (action.type) {
        case "GET_POSTS":
            return{
                ...state,
                posts: action.payload
            }
        case "ORDER_POSTS":
            return{
                ...state,
                posts: action.payload
            }
        case "SEARCH_POSTS_BY_TITLE":
            return {
                ...state,
                posts: action.payload
            }
        case 'GET_PSYCHOLOGISTS':
            return {
                ...state,
                usersPsichologists: action.payload
            }
        case 'GET_PSYCHOLOGISTS_ONE':
            return {
                ...state,
                userPsichologistDetail: action.payload
            }
        default:
           return{...state}
    }
}

export default rootReducer;
