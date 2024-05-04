import { SET_ROUTES, SET_PREVIOUS_LOCATION } from "./constants";
import { getRoutes } from "../../../../server/routes";

const loadRoutes = data => {
  return {
    type: SET_ROUTES,
    data
  };
};

export const fetchRoutes = () => {
  return dispatch => {
    return getRoutes()
      .then(response => {
        dispatch(loadRoutes(response));
        return response;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
