import { fromJS } from "immutable";
import { createSelector } from "reselect";

import {
  APP_LOADING,
  APP_ERROR,
  SET_DEFERRED_PROMPT,
  SET_META,
  SET_TITLE,
  SET_URL,
  REDUCER_NAME,
  SET_BOUNDARY_ERROR,
  SET_OG_IMG
} from "./constants";

const initialState = fromJS({
  deferredPrompt: null,
  isLoading: true,
  isError: false,
  isBoundaryError: false,
  meta: {},
  title: "",
  ogImg: null,
  url: ""
});

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return state.set("isLoading", action.data);
    case APP_ERROR:
      return state.set("isError", true);
    case SET_BOUNDARY_ERROR:
      return state.set("isBoundaryError", action.data);
    case SET_DEFERRED_PROMPT:
      return state.set("deferredPrompt", action.data);
    case SET_META:
      return state.set("meta", fromJS(action.data));
    case SET_TITLE:
      return state.set("title", action.data);
    case SET_URL:
      return state.set("url", action.data);
    case SET_OG_IMG:
      return state.set("ogImg", action.data);
    default:
      return state;
  }
};

const getAppState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectIsLoading = createSelector(getAppState, n =>
  n.get("isLoading")
);

export const selectIsError = createSelector(getAppState, n => n.get("isError"));

export const selectIsBoundaryError = createSelector(getAppState, n =>
  n.get("isBoundaryError")
);

export const selectDeferredPrompt = createSelector(getAppState, n =>
  n.get("deferredPrompt")
);

export const selectMeta = createSelector(getAppState, n => n.get("meta"));

export const selectTitle = createSelector(getAppState, n => n.get("title"));

export const selectUrl = createSelector(getAppState, n => n.get("url"));
export const selectOGImg = createSelector(getAppState, n => n.get("ogImg"));
