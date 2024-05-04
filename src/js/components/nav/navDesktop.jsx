import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NavTree from "./navTree";

const NavDesktop = ({
  currentUrl,
  logo,
  nav,
  onSetNavItemActive,
  selectedLanguage
}) => {
  return (
    <div className="nav-desktop">
      {logo.src !== "" && (
        <Link to={`/${selectedLanguage}`} className="logo-desktop">
          <img src={logo.src} alt={logo.alt} title={logo.title} />
        </Link>
      )}
      <div className="nav-links">
        <NavTree
          currentUrl={currentUrl}
          nav={nav}
          onLinkClick={e => {
            onSetNavItemActive({
              href: e.target.getAttribute("href")
            });
          }}
          className="right-side-nav"
        />
      </div>
    </div>
  );
};

export default NavDesktop;
