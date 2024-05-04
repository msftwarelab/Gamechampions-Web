import { fromJS } from "immutable";

import {
  SET_NEWS,
  SET_CATEGORIES,
  REDUCER_NAME,
  SET_PAGINATION,
  RESET_NEWS
} from "./constants";
import reducerRegistry from "../../util/reducerRegistry";

const initialState = fromJS({
  title: "",
  newsList: [],
  categories: [],
  pagination: { page: 1 },
  dataTimestamp: 0,
  description: "",
  categoryUrl: "",
  categoryTitle: "",
  categoryColor: "",
  metaTitle: ""
});

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return state
        .set("title", fromJS(action.data.title))
        .set("newsList", fromJS(action.data.newsList))
        .set("categories", fromJS(action.data.categories))
        .set("metaDescription", fromJS(action.data.meta.description))
        .set("summary", fromJS(action.data.summary))
        .set("metaTitle", fromJS(action.data.meta.title))
        .set("dataTimestamp", Date.now());
    case RESET_NEWS:
      return state
        .set("title", initialState.get("title"))
        .set("newsList", initialState.get("newsList"))
        .set("metaTitle", initialState.get("metaTitle"))
        .set("categoryColor", initialState.get("categoryColor"))
        .set("dataTimestamp", initialState.get("dataTimestamp"));
    case SET_PAGINATION:
      return state.set("pagination", fromJS(action.data));
    case SET_CATEGORIES:
      return state
        .set("title", fromJS(action.data[0].title))
        .set("newsList", fromJS(action.data[0].blogItems))
        .set("categoryUrl", fromJS(action.data[0].url))
        .set("categoryTitle", fromJS(action.data[0].title))
        .set("categoryColor", fromJS(action.data[0].color))
        .set("pagination", fromJS(action.data.pagination));
    default:
      return state;
  }
};

export const getNewsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectTitle = state => getNewsState(state).get("title");
export const selectNewsList = state => getNewsState(state).get("newsList");
export const selectCategories = state => getNewsState(state).get("categories");
export const selectCategoryColor = state =>
  getNewsState(state).get("categoryColor");
export const selectCategoryUrl = state =>
  getNewsState(state).get("categoryUrl");
export const selectCategoryTitle = state =>
  getNewsState(state).get("categoryTitle");
export const selectMetaTitle = state => getNewsState(state).get("metaTitle");
export const selectSummary = state => getNewsState(state).get("summary");
export const selectDescription = state =>
  getNewsState(state).get("metaDescription");
export const selectPagination = state => getNewsState(state).get("pagination");
export const selectDateTimestamp = state =>
  getNewsState(state).get("dataTimestamp");

reducerRegistry.register(REDUCER_NAME, newsReducer);
