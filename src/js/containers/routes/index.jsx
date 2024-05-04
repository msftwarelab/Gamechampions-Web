import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter, matchPath } from "react-router-dom";

import { fetchRoutes } from "./actions";
import AppAbstract from "../app/abstract";
import Layout from "../layout/";
import PageNotFound from "../pageNotFound/";
import { ErrorBoundary } from "../errorBoundary";
import { getRouteComponent } from "./config";
import { isQueryParamExist } from "../../util/util";
import { NATIVE_MOBILE_QUERY_PARAM } from "./constants";
import redirectData from "../../../../server/redirectData.json";

const redirects = {};
redirectData.forEach(item => {
  redirects[item["OLD URL"]] = item["NEW URL"];
});

class Routes extends React.PureComponent {
  constructor(props) {
    super(props);

    const { routes } = this.props;
    this.layoutRoutes = routes.filter(n => !n.get("modal"));
    this.modalRoutes = routes.filter(n => n.get("modal"));

    this.previousLocation = this.props.location;
  }

  componentDidUpdate(nextProps) {
    let { location, routes } = this.props;

    if (nextProps.history.action !== "POP") {
      let route = routes.find(item => {
        return matchPath(location.pathname, {
          path: item.get("url"),
          exact: true
        });
      });

      if (route && !route.get("modal")) {
        this.previousLocation = this.props.location;
      }
    }
  }

  render() {
    const { params, location, routes } = this.props;

    let isModal = false;

    if (location) {
      isModal = this.modalRoutes.some(item => {
        return matchPath(location.pathname, {
          path: item.get("url"),
          exact: true
        });
      });
    }

    const currentLocation = isModal ? this.previousLocation : location;
    const newUrl = redirects[currentLocation.pathname];
    const isNativeMobile = isQueryParamExist(
      NATIVE_MOBILE_QUERY_PARAM,
      currentLocation.search
    );
    const islolpickem = location.pathname.indexOf("lolpickem") > -1;

    const isShowBreadcrumbs = this.layoutRoutes.some(item => {
      return matchPath(location.pathname, {
        path: item.get("url"),
        exact: true
      });
    });

    return (
      <Switch>
        <Route>
          <Layout
            isNativeMobile={isNativeMobile}
            showBreadcrumbs={isShowBreadcrumbs}
            islolpickem={islolpickem}
          >
            <Route component={AppAbstract} />
            {newUrl ? (
              <Redirect to={newUrl} />
            ) : (
              <Switch location={currentLocation}>
                {this.layoutRoutes.map(route => {
                  const Component = getRouteComponent(route.get("name"))
                    .component;
                  return (
                    <Route
                      key={route.get("url")}
                      path={route.get("url")}
                      render={props => (
                        <ErrorBoundary>
                          <Component
                            {...props}
                            {...params}
                            isNativeMobile={isNativeMobile}
                            routeName={route.get("name")}
                          />
                        </ErrorBoundary>
                      )}
                      exact={route.get("exact")}
                    />
                  );
                })}
                {!isModal && (
                  <Route
                    render={props => (
                      <ErrorBoundary>
                        <PageNotFound {...props} routeName={"PageNotFound"} />
                      </ErrorBoundary>
                    )}
                  />
                )}
              </Switch>
            )}
            {isModal
              ? this.modalRoutes.map(route => {
                  const Component = getRouteComponent(route.get("name"))
                    .component;
                  return (
                    <Route
                      key={route.get("url")}
                      path={route.get("url")}
                      render={props => (
                        <ErrorBoundary>
                          <Component
                            {...props}
                            {...params}
                            routeName={route.get("name")}
                          />
                        </ErrorBoundary>
                      )}
                      exact={route.get("exact")}
                    />
                  );
                })
              : null}
          </Layout>
        </Route>
      </Switch>
    );
  }

  static fetchData(store) {
    return store.dispatch(fetchRoutes());
  }
}

export default withRouter(Routes);
