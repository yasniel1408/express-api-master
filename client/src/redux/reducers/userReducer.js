import { ActionTypes } from "../actions";

const initialState = {
  loading: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_FETCH: {
      return {
        ...state,
        user: null,
        loading: true,
      };
    }
    case ActionTypes.USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    }
    case ActionTypes.USER_STOP_FETCH: {
      return {
        ...state,
        user: null,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
