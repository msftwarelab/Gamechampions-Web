import { fromJS } from "immutable";

import {
  SET_SUCCESS,
  SET_ERROR,
  REDUCER_NAME,
  RESET_ERROR,
  SET_LANDING_PAGE
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  isSuccess: false,
  isError: false,
  errorMessage: "",
  landingPage: {}
});

export const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESS:
      return state.set("isSuccess", true).set("isError", false);
    case SET_ERROR:
      return state
        .set("isError", true)
        .set("errorMessage", action.data.errorMessage);
    case SET_LANDING_PAGE:
      return state.set("landingPage", fromJS(action.data));
    case RESET_ERROR:
      return state
        .set("isError", initialState.get("isError"))
        .set("errorMessage", initialState.get("errorMessage"));
    default:
      return state;
  }
};

export const getLandingState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectIsError = state => getLandingState(state).get("isError");
export const selectIsSuccess = state => getLandingState(state).get("isSuccess");
export const selectErrorMessage = state =>
  getLandingState(state).get("errorMessage");
export const selectLandingPage = state =>
  getLandingState(state).get("landingPage");

reducerRegistry.register(REDUCER_NAME, landingReducer);
