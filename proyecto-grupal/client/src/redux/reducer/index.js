const initialState = {
    posts:[]
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
        default:
           return{...state}
    }
}

export default rootReducer;
