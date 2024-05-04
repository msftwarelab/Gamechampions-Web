import React from "react";
import ChangePageLink from "./changePageLink";

const Pagination = ({
  displayInfo,
  page,
  pageCount,
  url,
  onChangePageClick,
  queryParams
}) => {
  if (pageCount > 1) {
    return (
      <div className="pagination">
        {displayInfo && (
          <div className="pagination__info">
            Page {page} of {pageCount}
          </div>
        )}
        <div className="pagination__buttons">
          {page > 1 && (
            <ChangePageLink
              pageNumber={1}
              isCurrentPage={page === 1}
              url={url}
              text={1}
              onClick={onChangePageClick}
              queryParams={queryParams}
            />
          )}
          {page > 3 && (
            <ChangePageLink
              pageNumber={+page - 2}
              isCurrentPage={false}
              url={url}
              text={"..."}
              onClick={onChangePageClick}
              queryParams={queryParams}
            />
          )}
          {page > 2 && (
            <ChangePageLink
              pageNumber={+page - 1}
              isCurrentPage={false}
              url={url}
              text={page - 1}
              onClick={onChangePageClick}
              queryParams={queryParams}
            />
          )}
          <ChangePageLink
            pageNumber={+page}
            isCurrentPage={true}
            url={url}
            text={page}
            onClick={onChangePageClick}
            queryParams={queryParams}
          />
          {page < pageCount - 1 && (
            <ChangePageLink
              pageNumber={+page + 1}
              isCurrentPage={false}
              url={url}
              text={page + 1}
              onClick={onChangePageClick}
              queryParams={queryParams}
            />
          )}
          {page < pageCount - 2 && (
            <ChangePageLink
              pageNumber={+page + 3}
              isCurrentPage={false}
              url={url}
              text={"..."}
              onClick={onChangePageClick}
              queryParams={queryParams}
            />
          )}
          {page < pageCount && (
            <ChangePageLink
              pageNumber={+pageCount}
              isCurrentPage={page === pageCount}
              url={url}
              text={pageCount}
              onClick={onChangePageClick}
              queryParams={queryParams}
            />
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
