import React from "react";
import { Link, withRouter } from "react-router-dom";

import Card from "../../components/card/card";

class Breadcrumbs extends React.PureComponent {
  render() {
    const { location, selectedLanguage } = this.props;
    const breadcrumbs = generateBreadcrumbs(
      location.pathname,
      selectedLanguage
    );

    if (!breadcrumbs) {
      return "";
    }

    return (
      <div className="card--breadcrumbs">
        <div className="breadcrumbs">{breadcrumbs}</div>
      </div>
    );
  }
}

const generateBreadcrumbs = (path, selectedLanguage) => {
  let paths = path.split("/").slice(2);
  paths.unshift("");
  // remove the last element if there was a / at the end of the url
  paths =
    paths[paths.length - 1] === "" ? paths.slice(0, paths.length - 1) : paths;

  // remove the first element if the second one is an empty string which means that we are in the root of the website
  paths = paths[1] === "" ? paths.slice(1) : paths;

  const breadcrumbs = paths
    .map((path, index) => {
      // Add the > symbol only between two links
      const arrow =
        index !== paths.length - 1 ? <span className="arrow">{">"}</span> : " ";

      // do not show any breadcrumbs if on root
      if (index === 0 && index === paths.length - 1) {
        return;
      }

      // Create the first link
      if (index === 0) {
        return (
          <li className="breadcrumbs__links__link" key={index}>
            <a href={`/${selectedLanguage}`}>Home</a>
            {arrow}
          </li>
        );
      }

      // Build the path for the current URL
      const url = `/${selectedLanguage}` + paths.slice(0, index + 1).join("/");

      if (index === paths.length - 1) {
        return (
          <li className="breadcrumbs__links__link" key={index}>
            <span>{paths[index].replace(/-/g, " ")}</span>
            {arrow}
          </li>
        );
      }

      // HTML structure for every link except the first
      return (
        <li className="breadcrumbs__links__link" key={index}>
          <a href={url}>{paths[index]}</a>
          {arrow}
        </li>
      );
    })
    .filter(n => n);

  if (breadcrumbs.length) {
    return <ul className="breadcrumbs__links">{breadcrumbs}</ul>;
  }

  return "";
};

export default withRouter(Breadcrumbs);
