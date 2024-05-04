import React from "react";
import { connect } from "react-redux";

import Header from "../header";
import Footer from "../footer";
import Snackbar from "../snackbar";
import ErrorMessage from "../errorBoundary/errorMessage";
import Meta from "../../components/meta/meta";
import FadeTransition from "../../components/transitions/fade";
import ScrollToTop from "../../components/routes/scrollToTop";
import PopupModal from "../../components/popupModal/popupModal";
import {
  selectIsLoading,
  selectMeta,
  selectOGImg,
  selectUrl
} from "../app/reducer";
import { createStructuredSelector } from "reselect";
import { selectSelectedLanguage } from "../multiLanguage/reducer";

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const scrollOffset = 1800;
    if (window.scrollY > scrollOffset) {
      this.setState({ showPopup: true });
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  onModalClick() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  // returns the JSX that will be rendered for this component
  render() {
    const {
      children,
      meta,
      url,
      isLoading,
      isNativeMobile,
      showBreadcrumbs,
      islolpickem,
      ogImg,
      selectedLanguage,
      history
    } = this.props;

    const { showPopup } = this.state;
    return (
      <div className={(isLoading ? "is-loading" : "") + " layout"}>
        <ScrollToTop />
        <Meta meta={meta} url={url} ogImg={ogImg} />
        {!isNativeMobile && !islolpickem && (
          <Header currentUrl={url} showBreadcrumbs={showBreadcrumbs} />
        )}
        <PopupModal
          selectedLanguage={selectedLanguage}
          history={history}
          onModalClick={this.onModalClick}
          isVisible={showPopup}
        />
        <FadeTransition in={!isLoading} className="main-">
          <main
            id="main"
            className={`main ${isNativeMobile && "native-mobile"}`}
          >
            <Snackbar />
            <ErrorMessage />
            {children}
          </main>
        </FadeTransition>
        {!isNativeMobile && !islolpickem && <Footer />}
      </div>
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
  meta: selectMeta,
  url: selectUrl,
  ogImg: selectOGImg,
  selectedLanguage: selectSelectedLanguage
});

export default connect(mapStateToProps)(Layout);
