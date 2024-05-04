import Modernizr from "modernizr";
import React from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import {
  getParameterByName,
  updateQueryStringParameter,
  removeQueryParameter,
  isElementInViewport
} from "../../util/util";
import Overlay from "./overlay";
import NavTree from "./navTree";
import LanguageSelector from "../../containers/multiLanguage";
import { DASHBOARD_URL } from "../../containers/app/constants";

const NAV_MENU_QUERY_PARAM = "_nav";
const SWIPE_SLOPE = 5; // reciprocal of the swipe slope (1 means 45 deg, 5 means approx 11 deg)

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);

    const { history, onSetNavItemActive } = this.props;

    history.listen((location, action) => {
      onSetNavItemActive({
        href: location.pathname
      });
    });

    this.onLinkClick = this.onLinkClick.bind(this);
    this.onExternalLinkClick = this.onExternalLinkClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.nav !== this.props.nav) {
      this.removeNavQueryParam();
    }
  }

  render() {
    const { currentUrl, nav, logo, t, selectedLanguage } = this.props;

    return (
      <div>
        <nav className="nav checkbox">
          <div className="nav__hamburger">
            <input
              type="checkbox"
              id="hamburger"
              ref={n => (this.element = n)}
            />
            <label htmlFor="hamburger">{t("NavToggleMenu")}</label>
            <div className="nav__side-nav" ref={n => (this.sideBarEl = n)}>
              <div className="nav__header">
                {!process.env.SHOW_HEADER_LOGO && (
                  <div className="nav__logo">
                    <img src={logo.src} alt={logo.alt} title={logo.title} />
                  </div>
                )}
              </div>
              <div className="nav__side-nave__auth-section">
                <a
                  className="login-btn"
                  href={`${DASHBOARD_URL}${selectedLanguage}?url=${currentUrl}`}
                >
                  {t("NavTreeLogIn")}
                </a>
                <a
                  className="signup-btn"
                  href={`${DASHBOARD_URL}${selectedLanguage}/registration?url=${currentUrl}`}
                >
                  {t("NavLogInSignUp")}
                </a>
              </div>
              <div className="nav__body">
                <div className="nav__section">
                  <NavTree
                    currentUrl={currentUrl}
                    nav={nav}
                    onLinkClick={this.onLinkClick}
                    onExternalLinkClick={this.onExternalLinkClick}
                    selectedLanguage={selectedLanguage}
                  />
                </div>
              </div>
              <div className="language-selector__wrapper">
                <p>{t("SelectLanguageLabel")}</p>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </nav>
        <Overlay className="nav-overlay" ref={n => (this.overlay = n)} />
      </div>
    );
  }

  init() {
    const self = this;
    self.isVisible = false;
    self.startX = 0;
    self.currentX = 0;
    self.touchingSideNav = false;

    this.removeNavQueryParam();

    self.element.addEventListener("click", e => {
      // toggle the overlay on click of the burger icon
      self.toggle();
    });

    self.overlay.addEventListener("click", e => {
      self.toggle();
    });

    // handle touch gestures to allow swipe out
    let touchX = 0;
    let touchY = 0;

    document.body.addEventListener(
      "touchstart",
      event => {
        if (!self.isVisible) {
          // slide out
          touchX = event.changedTouches[0].clientX;
          touchY = event.changedTouches[0].clientY;
        } else {
          // slide in/slide animation
          self.startX = event.touches[0].pageX;
          self.currentX = self.startX;
          self.touchingSideNav = true;
          self.sideBarEl.classList.add("touching");
          requestAnimationFrame(() => {
            self.updateSlide(self);
          });
        }
      },
      Modernizr.passiveeventlisteners ? { passive: true } : false
    );

    document.body.addEventListener(
      "touchmove",
      event => {
        if (!self.touchingSideNav) {
          return;
        }
        self.currentX = event.touches[0].pageX;
      },
      Modernizr.passiveeventlisteners ? { passive: true } : false
    );

    document.body.addEventListener(
      "touchend",
      event => {
        if (!self.isVisible) {
          if (
            isElementInViewport(self.element) &&
            self.element.parentElement.clientHeight
          ) {
            // calculate the difference
            let x =
              Math.abs(event.changedTouches[0].clientX) - Math.abs(touchX);
            let y =
              Math.abs(event.changedTouches[0].clientY) - Math.abs(touchY);

            if (
              Math.abs(x) > SWIPE_SLOPE * Math.abs(y) &&
              x > 20 &&
              Math.abs(touchX) < window.innerWidth
            ) {
              // swiped right - TODO: disabled in this project because it conflicts with Slick carousel swipe
              // self.toggle();
            }
          }
        } else {
          if (!self.touchingSideNav) {
            return;
          }
          self.touchingSideNav = false;
          self.sideBarEl.classList.remove("touching");

          const translateX = Math.min(0, self.currentX - self.startX);
          self.sideBarEl.style.transform = "";

          // user slided left by more than 1/3 the width of the sidebar
          if (translateX + self.sideBarEl.clientWidth / 3 < 0) {
            self.toggle();
          }
        }
      },
      Modernizr.passiveeventlisteners ? { passive: true } : false
    );

    window.onpopstate = function(event) {
      // user pressed back/forward button
      if (
        !getParameterByName(NAV_MENU_QUERY_PARAM, location.search) &&
        self.isVisible
      ) {
        // hide
        self.toggle(true);
      } else if (
        getParameterByName(NAV_MENU_QUERY_PARAM, location.search) &&
        !self.isVisible
      ) {
        // show
        self.toggle(true);
      }
    };
  }

  onLinkClick(e) {
    // hide navigation menu
    this.toggle(true);

    const href = e.target.getAttribute("href");

    this.props.onSetNavItemActive({
      href
    });
  }

  onExternalLinkClick(e) {
    // hide navigation menu
    this.toggle(true);
    this.removeNavQueryParam();
  }

  updateSlide(self) {
    if (!self.touchingSideNav) {
      return;
    }
    requestAnimationFrame(() => {
      self.updateSlide(self);
    });

    const translateX = Math.min(0, self.currentX - self.startX);
    self.sideBarEl.style.transform = `translateX(${translateX}px)`;
  }

  updateHistory() {
    if (!this.isVisible) {
      // hide
      this.removeNavQueryParam();
    } else {
      // show
      window.history.pushState(
        null,
        "",
        updateQueryStringParameter(location.search, NAV_MENU_QUERY_PARAM, "1")
      );
    }
  }

  removeNavQueryParam() {
    history.replaceState(
      null,
      "",
      location.pathname +
        removeQueryParameter(location.search, NAV_MENU_QUERY_PARAM)
    );
  }

  // toggle the overlay and the state of the navigation
  toggle(isFromHistory) {
    const self = this;

    if (
      isElementInViewport(self.element) &&
      self.element.parentElement.clientHeight
    ) {
      self.isVisible = !self.isVisible;

      if (self.isVisible) {
        self.element.checked = true;
      } else {
        self.element.checked = false;
      }

      if (self.isVisible) {
        self.overlay.setVisible(true);
        document.body.style.overflowY = "hidden";
      } else {
        // delay hiding the element to show animation
        setTimeout(() => {
          self.overlay.setVisible(false);
          document.body.style.overflowY = "visible";
        }, 300);
      }

      self.overlay.toggle();
    }

    if (!isFromHistory) {
      self.updateHistory();
    }
  }
}

export default withTranslation()(withRouter(Nav));
