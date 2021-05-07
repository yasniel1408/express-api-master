import { USER_FETCH, USER_SUCCESS, USER_STOP_FETCH } from "../actions/actionTypes";

const initialState = {
    data: null,
    loading:false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_FETCH: {
            return {
                ...state,
                loading:true,
            };
        }
        case USER_SUCCESS: {
            return {
                ...state,
                data: action.payload.user,
                loading: false
            };
        }
        case USER_STOP_FETCH: {
            return {
                ...state,
                loading:false,
            };
        }
        default:
            return state;
    }
}