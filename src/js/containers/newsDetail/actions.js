import { SET_NEWS_DETAIL, REDUCER_NAME, SET_RELATED_NEWS } from "./constants";
import { renderPage } from "../page/actions";
import Umbraco from "../../../../umbraco/main";

const setNewsDetail = data => ({
  type: SET_NEWS_DETAIL,
  data
});

const setRelatedNews = data => ({
  type: SET_RELATED_NEWS,
  data
});

export const getNewsDetail = data => dispatch =>
  Umbraco.news
    .getNewsDetailPage(data)
    .then(response => {
      dispatch(setNewsDetail(response));
      return response;
    })
    .catch(error => {
      throw error;
    });
export const getRelatedBlogs = data => dispatch =>
  Umbraco.news
    .getRelatedBlogs(data)
    .then(response => {
      dispatch(setRelatedNews(response));
      return response;
    })
    .catch(error => {
      throw error;
    });

export const fetchNewsDetail = data => dispatch =>
  renderPage({ reducerName: REDUCER_NAME, get: getNewsDetail, data })(dispatch);

export const fetchRelatedBlogs = data => dispatch =>
  renderPage({ reducerName: REDUCER_NAME, get: getRelatedBlogs, data })(
    dispatch
  );
