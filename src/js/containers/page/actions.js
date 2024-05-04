import { SET_PAGE, REDUCER_NAME, RESET_SCROLL } from "./constants";
import {
  isLoading,
  isError,
  setMeta,
  setTitle,
  setUrl,
  setOGImg
} from "../app/actions";
import Umbraco from "../../../../umbraco/main";

const resetScroll = () => ({
  type: RESET_SCROLL
});

const setNamedPage = (data, reducerName) => ({
  type: `${SET_PAGE}/${reducerName}`,
  data
});

export const getPage = data => () =>
  Umbraco.pages
    .get(data)
    .then(response => response)
    .catch(error => {
      throw error;
    });

export const renderPage = ({ reducerName, get, data }) => dispatch => {
  dispatch(isLoading(true));
  dispatch(isError(false));
  dispatch(resetScroll());
  dispatch(setUrl(data.url));

  return get(data)(dispatch)
    .then((response = {}) => {
      const apiUrl = process.env.API_URL.substring(
        0,
        process.env.API_URL.length - 1
      );
      let thumbnail = response.thumbnail;
      let src = thumbnail && thumbnail.src;

      if (src) {
        dispatch(setOGImg(`${apiUrl}${src}`));
      }

      dispatch(setNamedPage(response, reducerName));
      dispatch(setMeta(response.meta));
      dispatch(setTitle(response.title));
      dispatch(setUrl(response.url));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const fetchPage = (data, reducerName) => dispatch =>
  renderPage({ reducerName: reducerName || REDUCER_NAME, get: getPage, data })(
    dispatch
  );
