import { fromJS } from "immutable";

import {
  SET_HOME,
  REDUCER_NAME,
  SET_TICKER_MATCHES,
  SET_HOME_PAGE
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  howToPlay: {},
  serviceProposition: {},
  gameSlides: {},
  tickerMatches: [],
  dataTimestamp: 0,
  homePage: {}
});

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME:
      return state
        .set("howToPlay", fromJS(action.data.howToPlay))
        .set("serviceProposition", fromJS(action.data.serviceProposition))
        .set("gameSlides", fromJS(action.data.gameSlides));
    case SET_TICKER_MATCHES:
      return state
        .set("tickerMatches", fromJS(action.data))
        .set("dataTimestamp", Date.now());
    case SET_HOME_PAGE:
      return state.set("homePage", fromJS(action.data));
    default:
      return state;
  }
};

export const getHomeState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectHowToPlay = state => getHomeState(state).get("howToPlay");

export const selectServiceProposition = state =>
  getHomeState(state).get("serviceProposition");

export const selectGameSlides = state => getHomeState(state).get("gameSlides");

export const selectTickerMatches = state =>
  getHomeState(state).get("tickerMatches");

export const selectHomePage = state => getHomeState(state).get("homePage");

reducerRegistry.register(REDUCER_NAME, homeReducer);
