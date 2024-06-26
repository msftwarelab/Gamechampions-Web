import { SET_PAGE_NOT_FOUND } from "./constants";
import Umbraco from "../../../../umbraco/main";

const setPageNotFound = data => {
  return {
    type: SET_PAGE_NOT_FOUND,
    data
  };
};

export const fetchPageNotFound = data => {
  return dispatch => {
    return Umbraco.pages
      .get(data)
      .then(response => {
        dispatch(setPageNotFound(response));
        return response;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
