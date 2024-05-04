import { fromJS } from "immutable";
import { matchPath } from "react-router-dom";

import { SET_NAV_ITEM_ACTIVE, SET_HEADER, REDUCER_NAME } from "./constants";
import reducerRegistry from "../../util/reducerRegistry";
import { getRouteWithoutLanguage } from "../../util/util";
import { createSelector } from "reselect";

const initialState = fromJS({
  nav: {
    name: "",
    title: "",
    url: "",
    icon: "",
    isActive: false,
    children: []
  }
});

export function headerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAV_ITEM_ACTIVE:
      if (getRouteWithoutLanguage(action.data.href) === "/") {
        // home page
        return state
          .setIn(["nav", "isActive"], true)
          .updateIn(["nav", "children"], n =>
            n.map(m => m.set("isActive", false))
          );
      }
      return state
        .setIn(["nav", "isActive"], false)
        .updateIn(["nav", "children"], n =>
          n.map(m => {
            return m.set(
              "isActive",
              !!matchPath(action.data.href, {
                path: m.get("url"),
                exact: true
              })
            );
          })
        );
    case SET_HEADER:
      return state.set("nav", fromJS(action.data));
    default:
      return state;
  }
}

export const getHeaderState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};

export const selectNavIsActive = createSelector(getHeaderState, n =>
  n.getIn(["nav", "isActive"])
);

export const selectNavName = createSelector(getHeaderState, n =>
  n.getIn(["nav", "name"])
);

export const selectNavTitle = createSelector(getHeaderState, n =>
  n.getIn(["nav", "title"])
);

export const selectNavUrl = createSelector(getHeaderState, n =>
  n.getIn(["nav", "url"])
);

export const selectNavIcon = createSelector(getHeaderState, n =>
  n.getIn(["nav", "icon"])
);

export const selectNavChildren = createSelector(getHeaderState, n =>
  n.getIn(["nav", "children"])
);

reducerRegistry.register(REDUCER_NAME, headerReducer);
