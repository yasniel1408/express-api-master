import { ActionTypes } from "../actions";

const initialState = {
  loading: false,
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_FETCH: {
      return {
        ...state,
        data: null,
        loading: true,
      };
    }
    case ActionTypes.USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.user,
        loading: false,
      };
    }
    case ActionTypes.USER_STOP_FETCH: {
      return {
        ...state,
        data: null,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
