import {
  SET_NEWS,
  SET_CATEGORIES,
  REDUCER_NAME,
  SET_PAGINATION,
  RESET_NEWS
} from "./constants";
import { renderPage } from "../page/actions";
import Umbraco from "../../../../umbraco/main";

const setNews = data => ({
  type: SET_NEWS,
  data
});

const setCategories = data => ({
  type: SET_CATEGORIES,
  data
});

export const resetNews = data => ({
  type: RESET_NEWS,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

export const getNewsPage = data => dispatch =>
  Umbraco.news
    .getNewsPage(data)
    .then(response => response)
    .catch(error => {
      throw error;
    });

export const getNews = data => dispatch =>
  Umbraco.news
    .getNewsPage(data)
    .then(response => {
      dispatch(setNews(response));
      dispatch(
        setPagination({
          ...response.pagination,
          page: data.page,
          pageSize: data.pageSize
        })
      );
      return response;
    })
    .catch(error => {
      throw error;
    });

export const getCategories = data => dispatch =>
  Umbraco.news
    .getCategories(data)
    .then(response => {
      dispatch(setCategories(response));
    })
    .catch(error => {
      throw error;
    });

export const fetchNews = data => dispatch =>
  renderPage({ reducerName: REDUCER_NAME, get: getNews, data })(dispatch);

export const fetchNewsAndCategories = data => dispatch => {
  return dispatch(fetchNews(data))
    .then(response => {
      return dispatch(getCategories(data));
    })
    .catch(error => {
      throw error;
    });
};
