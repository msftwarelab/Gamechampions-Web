import { fromJS } from "immutable";

import { SET_NEWS_DETAIL, REDUCER_NAME, SET_RELATED_NEWS } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  newsDetail: {},
  relatedNews: []
});

export const newsDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_DETAIL:
      return state.set("newsDetail", fromJS(action.data));
    case SET_RELATED_NEWS:
      return state.set("relatedNews", fromJS(action.data));
    default:
      return state;
  }
};

export const getNewsDetailState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectNewsDetail = state =>
  getNewsDetailState(state).get("newsDetail");
export const selectRelatedNews = state =>
  getNewsDetailState(state).get("relatedNews");

reducerRegistry.register(REDUCER_NAME, newsDetailReducer);
