import { fromJS } from "immutable";
import { createSelector } from "reselect";
import { combineReducers } from "redux-immutable";

import { SET_PAGE, REDUCER_NAME, RESET_SCROLL } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";
import pageReducerRegistry from "./pageReducerRegistry";

const initialState = fromJS({
  id: 0,
  title: "",
  html: "",
  summary: "",
  url: "",
  thumbnail: "",
  view: "",
  meta: {},
  banners: [],
  footerBanners: [],
  children: [],
  resetScroll: false
});

export const createPageReducerWithNamedType = (reducerName = "") => {
  return (state = initialState, action) => {
    switch (action.type) {
      case `${SET_PAGE}/${reducerName}`:
        return state
          .set("id", action.data.id)
          .set("title", action.data.title)
          .set("summary", action.data.summary)
          .set("html", action.data.html)
          .set("url", action.data.url)
          .set("thumbnail", fromJS(action.data.thumbnail))
          .set("view", action.data.view)
          .set("meta", action.data.meta)
          .set("banners", fromJS(action.data.banners))
          .set("footerBanners", fromJS(action.data.footerBanners))
          .set("children", fromJS(action.data.children));
      case RESET_SCROLL:
        return state.set("resetScroll", true);
      default:
        return state;
    }
  };
};

const getPageState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectPage = createSelector(getPageState, n => n);

export const createReducer = reducerName => {
  const reducer = createPageReducerWithNamedType(reducerName);
  pageReducerRegistry.register(reducerName, reducer);

  const pageReducer = pageReducerRegistry.getReducers();

  reducerRegistry.register(
    REDUCER_NAME,
    combineReducers({
      ...pageReducer
    })
  );
};

reducerRegistry.register(REDUCER_NAME, () => null);
