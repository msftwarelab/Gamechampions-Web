import React from "react";
import { connect } from "react-redux";

import { selectSelectedLanguage } from "../multiLanguage/reducer";
import Card from "../../components/card/card";
import { fetchPageNotFound } from "./actions";
import { selectTitle, selectHtml } from "./reducer";
import { createStructuredSelector } from "reselect";

const URL = "/page-not-found/";

class PageNotFound extends React.PureComponent {
  componentDidMount() {
    const { selectedLanguage, onLoadPageNotFound, title } = this.props;
    if (!title) {
      onLoadPageNotFound({
        url: `/${selectedLanguage}/${URL}`,
        language: selectedLanguage
      });
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { title, html } = this.props;
    return (
      <section className="pageNotFound">
        {!!html && (
          <section className="content">
            <Card title={title} html={html} />
          </section>
        )}
      </section>
    );
  }

  static fetchData(store, { language }) {
    return store.dispatch(
      fetchPageNotFound({ url: `/${language}/${URL}`, language })
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = createStructuredSelector({
  title: selectTitle,
  html: selectHtml,
  selectedLanguage: selectSelectedLanguage
});

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadPageNotFound: data => dispatch(fetchPageNotFound(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
