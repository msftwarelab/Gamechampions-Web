import {
  REDUCER_NAME,
  SET_HOME,
  SET_HOME_PAGE,
  SET_TICKER_MATCHES
} from "./constants";
import { renderPage } from "../page/actions";
import Umbraco from "../../../../umbraco/main";
import Api from "../../../../service/main";

const setHome = data => ({
  type: SET_HOME,
  data
});

const setHomePage = data => ({
  type: SET_HOME_PAGE,
  data
});

const setTickerMatches = data => ({
  type: SET_TICKER_MATCHES,
  data
});

export const getHome = data => dispatch =>
  Umbraco.home
    .getPage(data)
    .then(response => {
      dispatch(setHome(response));
      return response;
    })
    .catch(error => {
      console.error(error);
    });

export const fetchHome = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({ reducerName: REDUCER_NAME, get: getHome, data: pageData })(
      dispatch
    )
  ]);

export const getHomePage = data => dispatch =>
  Umbraco.home
    .getHomePage(data)
    .then(response => {
      dispatch(setHomePage(response));
      return response;
    })
    .catch(error => {
      console.error(error);
    });
