import { fromJS } from "immutable";

import {
  SET_FOOTER,
  REDUCER_NAME,
  SET_QUICKLINKS,
  SET_SOCIAL,
  SET_CREDITS
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  footer: {},
  quickLinks: [],
  social: [],
  credits: ""
});

export const footerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOOTER:
      return state.set("footer", fromJS(action.data));
    case SET_QUICKLINKS:
      return state.set("quickLinks", fromJS(action.data));
    case SET_SOCIAL:
      return state.set("social", fromJS(action.data));
    case SET_CREDITS:
      return state.set("credits", fromJS(action.data.credits));
    default:
      return state;
  }
};

export const getFooterState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectFooter = state => getFooterState(state).get("footer");
export const selectQuickLinks = state =>
  getFooterState(state).get("quickLinks");
export const selectSocial = state => getFooterState(state).get("social");
export const selectCredits = state => getFooterState(state).get("credits");

reducerRegistry.register(REDUCER_NAME, footerReducer);
