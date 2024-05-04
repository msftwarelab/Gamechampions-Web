/*
 * Root component for client-side
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import OfflineManager from "../../util/offlineManager";
import { configureStore } from "../../util/store";
import { selectRoutes } from "../routes/reducer";
import Routes from "../routes/index";
import { TopLevelErrorBoundary } from "../errorBoundary";
import { setDeferredPrompt } from "./actions";
import {
  AFFILIATE_SOURCE_QUERY_PARAM,
  AFFILIATE_MEDIUM_QUERY_PARAM,
  AFFILIATE_COOKIE_NAME,
  AFFILIATE_COOKIE_TTL,
  AFFILIATE_COOKIE_DOMAIN
} from "./constants";

import {
  setCookie,
  getCookie,
  getQueryStringParamByName
} from "../../util/util";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    // grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__;

    // allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__;

    this.store = configureStore(preloadedState);
  }

  componentDidMount() {
    // install service worker
    initServiceWorker();
    initOffline();
    initNoJSObserver();
    initAffilicate();

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // store the event so it can be triggered later.
      this.store.dispatch(setDeferredPrompt(e));

      return false;
    });
  }

  render() {
    const routes = selectRoutes(this.store.getState());
    return (
      <Provider store={this.store}>
        <div id="app">
          <TopLevelErrorBoundary>
            <BrowserRouter>
              <Routes routes={routes} />
            </BrowserRouter>
          </TopLevelErrorBoundary>
        </div>
      </Provider>
    );
  }
}

const initNoJSObserver = () => {
  let targetNode = document.querySelector("html");

  const config = { attributes: true, childList: false, subtree: false };

  const callback = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type == "attributes") {
        if (targetNode.classList.contains("no-js")) {
          targetNode.classList.remove("no-js");
        }
      }
    }
  };

  let observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
};

const initServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Successfully registered service worker", reg);
      })
      .catch(err => {
        console.warn("Error whilst registering service worker", err);
      });
  }
};

const initOffline = () => {
  window.addEventListener(
    "online",
    e => {
      OfflineManager.setOffline(false);
    },
    false
  );

  window.addEventListener(
    "offline",
    e => {
      OfflineManager.setOffline(true);
    },
    false
  );

  if (!navigator.onLine) {
    OfflineManager.setOffline(true);
  }
};

const initAffilicate = () => {
  const source = getQueryStringParamByName(
    AFFILIATE_SOURCE_QUERY_PARAM,
    location && location.search
  );
  const medium = getQueryStringParamByName(
    AFFILIATE_MEDIUM_QUERY_PARAM,
    location && location.search
  );

  if (source) {
    const exitingSource = getCookie(AFFILIATE_COOKIE_NAME);

    if (!exitingSource) {
      const affiliateObj = {};

      affiliateObj[AFFILIATE_SOURCE_QUERY_PARAM] = source;

      if (medium) {
        affiliateObj[AFFILIATE_MEDIUM_QUERY_PARAM] = medium;
      }

      // set cross-domain cookie for affiliate
      setCookie(
        AFFILIATE_COOKIE_NAME,
        JSON.stringify(affiliateObj),
        AFFILIATE_COOKIE_TTL,
        AFFILIATE_COOKIE_DOMAIN
      );
    }
  }
};
