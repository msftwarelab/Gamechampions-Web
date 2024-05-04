import { fromJS } from "immutable";

import { SET_ROUTES, SET_PREVIOUS_LOCATION, REDUCER_NAME } from "./constants";
import { createSelector } from "reselect";

const initialState = fromJS({
  routes: [],
  isLoading: false,
  isError: false
});

export const routesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTES:
      return state.set("routes", fromJS(action.data));
    default:
      return state;
  }
};

const getRoutesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectRoutes = createSelector(getRoutesState, n =>
  n.get("routes")
);
