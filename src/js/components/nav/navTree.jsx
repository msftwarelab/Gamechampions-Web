import React from "react";
import NavTreeItem from "./navTreeItem";
import { DASHBOARD_URL } from "../../containers/app/constants";
import { useTranslation } from "react-i18next";

const NavTree = ({
  currentUrl,
  nav,
  onLinkClick,
  onExternalLinkClick,
  className,
  selectedLanguage
}) => {
  const { t } = useTranslation();
  const children = nav.children
    ? nav.children.filter(item => item.get("name") !== "Authors")
    : "";
  return (
    <div className={className}>
      <ul className="page-list">
        <li className="item">
          <NavTreeItem
            name={nav && nav.name}
            title={nav.title}
            url={nav.url}
            isActive={nav.isActive}
            onClick={onLinkClick}
          />
        </li>
        {nav.children &&
          children.map(item => (
            <li className="item" key={item.get("id")}>
              <NavTreeItem
                name={item.get("name")}
                title={item.get("title")}
                url={item.get("url")}
                isActive={item.get("isActive")}
                isExternal={item.get("isExternal")}
                onClick={onLinkClick}
                onExternalLinkClick={onExternalLinkClick}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default NavTree;
