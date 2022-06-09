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
        default:
           return{...state}
    }
}

export default rootReducer;
