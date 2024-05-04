import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { connect } from "react-redux";
import { compose } from "redux";
import { pathToRegexp } from "path-to-regexp";

import { selectSelectedLanguage } from "../multiLanguage/reducer";
import { selectPage, createReducer } from "./reducer";
import { renderPage } from "./actions";
import { REDUCER_NAME } from "./constants";
import { setTitle, setMeta, setUrl, setOGImg } from "../app/actions";
import { selectUrl } from "../app/reducer";
import { createStructuredSelector } from "reselect";

const withPage = (WrappedComponent, getData, reducerName) => {
  createReducer(reducerName);

  class Page extends React.PureComponent {
    componentDidMount() {
      const {
        url,
        onLoadPage,
        match,
        onSetTitle,
        onSetMeta,
        onSetUrl,
        selectedLanguage,
        onSetOGImg
      } = this.props;

      // test if url changed since the last call of onLoadPage
      const pageData = this.props[REDUCER_NAME].get(reducerName);
      const previousUrl = pageData ? pageData.get("url") : undefined;

      if (!pathToRegexp(match.path).test(previousUrl)) {
        // content doesn't exist in store
        onLoadPage(reducerName, getData, {
          url: match.url,
          language: selectedLanguage
        });
      } else if (!pathToRegexp(match.path).test(url)) {
        // content exists in store and user has navigated to a new URL
        onSetTitle(pageData.get("title"));
        onSetMeta(pageData.get("meta"));
        onSetUrl(pageData.get("url"));
        onSetOGImg();
      }
    }

    render() {
      const { page, ...rest } = this.props;

      return <WrappedComponent page={page.get(reducerName)} {...rest} />;
    }
  }
  hoistNonReactStatic(Page, WrappedComponent);
  return Page;
};

// maps the redux store state to the props related to the data from the store
const mapStateToProps = createStructuredSelector({
  page: selectPage,
  url: selectUrl,
  selectedLanguage: selectSelectedLanguage
});

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => ({
  onLoadPage: (reducerName, get, data) =>
    dispatch(renderPage({ reducerName, get, data })),
  onSetTitle: data => dispatch(setTitle(data)),
  onSetMeta: data => dispatch(setMeta(data)),
  onSetUrl: data => dispatch(setUrl(data)),
  onSetOGImg: data => dispatch(setOGImg(data))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withPage);
