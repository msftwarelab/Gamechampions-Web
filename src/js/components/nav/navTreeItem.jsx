import React from "react";
import { Link } from "react-router-dom";

const LinkContent = ({ icon, name, title }) => (
  <>
    {icon && (
      <i className="nav__icon">
        <img src={icon} alt={name} />
      </i>
    )}
    {title}
  </>
);

const NavTreeItem = ({
  url,
  name,
  title,
  icon,
  isActive,
  isExternal,
  onClick,
  onExternalLinkClick
}) => {
  const className = isActive ? "selected" : "";
  return (
    <>
      {isExternal && (
        <a
          href={url}
          title={title}
          target="_blank"
          download={url.match(/\.\w{3,4}$/)}
          onClick={onExternalLinkClick}
        >
          <LinkContent icon={icon} name={name} title={title} />
        </a>
      )}
      {!isExternal && (
        <Link to={url} title={title} className={className} onClick={onClick}>
          <LinkContent icon={icon} name={name} title={title} />
        </Link>
      )}
    </>
  );
};

export default NavTreeItem;
