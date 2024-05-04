import React from "react";
import { Link } from "react-router-dom";

const ChangePageLink = ({
  pageNumber,
  isCurrentPage,
  url,
  text,
  onClick,
  queryParams
}) => {
  let fullUrl = `${url}?${queryParams.PAGE_NUMBER_QUERY_STRING_PARAM}=${pageNumber}&${queryParams.PAGE_SIZE_QUERY_STRING_PARAM}=${queryParams.PAGE_SIZE_VALUE}`;
  return (
    <Link
      to={fullUrl}
      className={`pagination__buttons__button ${
        isCurrentPage ? " pagination__buttons__button--current-page" : ""
      }`}
      onClick={onClick}
      title={text}
    >
      {text}
    </Link>
  );
};

export default ChangePageLink;
