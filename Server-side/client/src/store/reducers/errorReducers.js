import * as types from "../actions/types";

const initialState = {};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};