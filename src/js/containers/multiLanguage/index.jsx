import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";

import { fetchLanguages, setLanguage } from "./actions";
import { selectLanguages, selectSelectedLanguage } from "./reducer";
import { CURRENT_LANGUAGE, DEFAULT_FLAG } from "./constants";

import LanguageSelectorDropdown from "../../components/multiLanguage";
import { fetchHeader } from "../header/actions";
import { fetchQuickLinks, fetchFooter } from "../footer/actions";

class LanguageSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: CURRENT_LANGUAGE,
      openDropdown: false
    };

    this.toggling = this.toggling.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  toggling() {
    this.setState({ openDropdown: !this.state.openDropdown });
  }

  changeLanguage(value) {
    const {
      i18n,
      onSetSelectedLanguage,
      history,
      location = {},
      reLoadHeader,
      reLoadQuickLinks,
      reLoadFooter
    } = this.props;
    const { currentLanguage } = this.state;
    const title = value.get("title");

    this.setState({
      openDropdown: false,
      currentLanguage: title
    });

    const previousLanguage = "/" + currentLanguage;
    i18n.changeLanguage(title);
    onSetSelectedLanguage(title);
    let url = location.pathname;
    url = url.replace(previousLanguage, "/" + title);

    reLoadQuickLinks({ language: title });
    reLoadHeader({ language: title });
    reLoadFooter({ language: title });
    history.push(url);
  }

  componentDidMount() {
    const {
      languages,
      onLoadLanguages,
      selectedLanguage,
      onSetSelectedLanguage
    } = this.props;
    this.setState({ currentLanguage: selectedLanguage });

    if (languages.size === 0) {
      onLoadLanguages();
    }

    if (!selectedLanguage) {
      onSetSelectedLanguage(selectedLanguage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { i18n } = this.props;
    const { currentLanguage } = this.state;

    if (prevState.currentLanguage !== this.state.currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }

  render() {
    const { languages, selectedLanguage, showOnMobile = false } = this.props;
    const { openDropdown } = this.state;

    const language =
      languages.find(lang => lang.get("title") === selectedLanguage) || null;

    return (
      <LanguageSelectorDropdown
        currentFlag={(language && language.get("flagPath")) || DEFAULT_FLAG}
        openDropdown={openDropdown}
        currentLanguage={selectedLanguage}
        options={languages}
        changeLanguage={this.changeLanguage}
        toggling={this.toggling}
        showOnMobile={showOnMobile}
      />
    );
  }

  static fetchData(store, { language }) {
    return store.dispatch(fetchLanguages(language));
  }
}

const mapStateToProps = state => ({
  languages: selectLanguages(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadLanguages: () => dispatch(fetchLanguages()),
  onSetSelectedLanguage: data => dispatch(setLanguage(data)),
  reLoadHeader: data => dispatch(fetchHeader(data)),
  reLoadQuickLinks: data => dispatch(fetchQuickLinks(data)),
  reLoadFooter: data => dispatch(fetchFooter(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(LanguageSelector), LanguageSelector))
);
