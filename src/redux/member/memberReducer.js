import { post_success } from "./memberActions"
import { FETCH_MEMBERS_FAIL, FETCH_MEMBERS_REQUEST, FETCH_MEMBERS_SUCCESS, POST_FAIL, POST_SUCCESS } from "./memberTypes"

const initialState = {
    loading: false,
    data: [],
    error: '',
    post_success:false,
    post_fail:''
}


const memberReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_MEMBERS_REQUEST:
            return { ...state, loading: true }
        case FETCH_MEMBERS_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: '' }
        case FETCH_MEMBERS_FAIL:
            return { ...state, data: [], loading: false, error: action.payload }
        //fix this to return obj and add to state on client side
        case POST_SUCCESS:
            return {...state, post_success:true}
        case POST_FAIL:
            return { ...state, post_fail: action.payload }

        default:
            return state;

    }

}

export default memberReducer