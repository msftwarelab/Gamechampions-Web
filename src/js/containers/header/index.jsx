import React from "react";
import { connect } from "react-redux";

import Nav from "../../components/nav/nav";
import NavDesktop from "../../components/nav/navDesktop";
import NavLogin from "../../components/nav/navLogin";
import Breadcrumbs from "../breadcrumbs";
import { fetchHeader, setNavItemActive } from "./actions";
import { selectSelectedLanguage } from "../multiLanguage/reducer";
import {
  selectNavName,
  selectNavTitle,
  selectNavIcon,
  selectNavUrl,
  selectNavChildren,
  selectNavIsActive
} from "./reducer";
import { createStructuredSelector } from "reselect";

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logo: {
        src: `${process.env.STORAGE_URL}/images/linear_logo.svg`,
        alt: process.env.NAME,
        title: process.env.NAME
      }
    };
  }

  componentDidMount() {
    const { onSetNavItemActive } = this.props;

    onSetNavItemActive({
      href: location.pathname
    });
  }

  render() {
    const {
      currentUrl,
      title,
      name,
      icon,
      url,
      isActive,
      children,
      onSetNavItemActive,
      showBreadcrumbs,
      selectedLanguage
    } = this.props;
    return (
      <div
        ref={n => (this.scrollAnchor = n)}
        style={{
          height: "1px"
        }}
      >
        <header className="header">
          <NavLogin
            currentUrl={currentUrl}
            selectedLanguage={selectedLanguage}
          />
          <NavDesktop
            selectedLanguage={selectedLanguage}
            currentUrl={currentUrl}
            logo={this.state.logo}
            nav={{ name, title, icon, url, isActive, children }}
            onSetNavItemActive={onSetNavItemActive}
          />
        </header>
        {showBreadcrumbs && <Breadcrumbs selectedLanguage={selectedLanguage} />}
        <Nav
          currentUrl={currentUrl}
          logo={this.state.logo}
          nav={{ name, title, icon, url, isActive, children }}
          onSetNavItemActive={onSetNavItemActive}
          selectedLanguage={selectedLanguage}
        />
      </div>
    );
  }

  static fetchData(store, { language }) {
    return store.dispatch(fetchHeader({ language }));
  }
}

const mapStateToProps = createStructuredSelector({
  name: selectNavName,
  title: selectNavTitle,
  url: selectNavUrl,
  icon: selectNavIcon,
  isActive: selectNavIsActive,
  children: selectNavChildren,
  selectedLanguage: selectSelectedLanguage
});

const mapDispatchToProps = dispatch => ({
  onSetNavItemActive: data => dispatch(setNavItemActive(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
