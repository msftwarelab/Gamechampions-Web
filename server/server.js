/*
 * Root component on the server-side
 */
import React, { Suspense } from "react";
import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { fromJS } from "immutable";

import { configureStore } from "../src/js/util/store";
import { getLanguageFromUrlWithDefault } from "../src/js/util/util";
import Routes from "../src/js/containers/routes";
import { getRouteComponent } from "../src/js/containers/routes/config";
import { defaultPathConfig } from "./helpers/pathConfig";
import Header from "../src/js/containers/header";
import Footer from "../src/js/containers/footer";
import PageNotFound from "../src/js/containers/pageNotFound";
import LanguageSelector from "../src/js/containers/multiLanguage";
import initLang from "../src/js/i18n";
import { I18nextProvider } from "react-i18next";
import Loader from "../src/js/components/loader/loader";

export function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore();

  Routes.fetchData(store).then(routes => {
    // Retrieve data for all components on the current route
    const { path, url, query } = req;
    const promises = [];
    let is404 = true;
    const language = getLanguageFromUrlWithDefault(url);

    LanguageSelector.fetchData(store, { language }).then(() => {
      // Iterate through the routes and prepare fetchData and reducers
      routes.forEach(route => {
        const match = matchPath(path, {
          path: route.url,
          exact: route.exact
        });

        if (match) {
          is404 = false;

          const routeComponent = getRouteComponent(route.name);

          // Add the promise to fetch the route data
          routeComponent.fetchData.forEach(fn => {
            promises.push(
              fn(store, {
                path: match.path,
                url: match.url,
                params: match.params,
                query,
                route,
                language
              })
            );
          });

          return true;
        }
      });

      // No page matches
      if (is404) {
        promises.push(PageNotFound.fetchData(store, { language }));
        // Page not found is rendered later using React Router, but we need to set the correct status code
        res.status(404);
      }

      if (Header) {
        promises.push(Header.fetchData(store, { language }));
      }
      if (Footer) {
        promises.push(Footer.fetchData(store, { language }));
      }

      Promise.all(promises)
        .then(response => {
          const staticContext = {};

          initLang(language)
            .then(i18n => {
              const app = (
                <Suspense fallback={<Loader />}>
                  <I18nextProvider i18n={i18n}>
                    <Provider store={store}>
                      <div id="app">
                        <StaticRouter context={staticContext} location={url}>
                          <Routes routes={fromJS(routes)} />
                        </StaticRouter>
                      </div>
                    </Provider>
                  </I18nextProvider>
                </Suspense>
              );

              // Render the app to a string on the server
              const html = renderToString(app);

              // Grab the initial state from our Redux store
              const preloadedState = store.getState();

              let _preloadedState = JSON.parse(
                JSON.stringify(preloadedState.toJS()).replace(/</g, "\\u003c")
              );

              const data = Object.assign(defaultPathConfig, {
                html: html,
                preloadedState: JSON.stringify(_preloadedState)
              });

              const helmet = Helmet.renderStatic();

              res.render("index", {
                htmlAttributes: helmet.htmlAttributes,
                bodyAttributes: helmet.bodyAttributes,
                head: `${helmet.title} ${helmet.meta} ${helmet.link}`,
                data
              });
            })
            .catch(error => {
              console.error(error);
              throw error;
            });
        })
        .catch(error => {
          console.error(error);
          throw error;
        });
    });
  });
}
