import {
  SET_FOOTER,
  SET_SOCIAL,
  SET_QUICKLINKS,
  SET_CREDITS
} from "./constants";
import Umbraco from "../../../../umbraco/main";

const loadFooter = data => ({
  type: SET_FOOTER,
  data
});

const setSocial = data => ({
  type: SET_SOCIAL,
  data
});

const setQuickLinks = data => ({
  type: SET_QUICKLINKS,
  data
});

const setCredits = data => ({
  type: SET_CREDITS,
  data
});

export const fetchQuickLinks = data => dispatch =>
  Umbraco.quickLinks
    .get(data)
    .then(response => {
      dispatch(setQuickLinks(response));
      return response;
    })
    .catch(error => {
      throw error;
    });

export const fetchSocial = () => dispatch =>
  Umbraco.social
    .get()
    .then(response => {
      dispatch(setSocial(response));
      return response;
    })
    .catch(error => {
      throw error;
    });

export const fetchCredits = () => dispatch =>
  Umbraco.credits
    .get()
    .then(response => {
      dispatch(setCredits(response));
      return response;
    })
    .catch(error => {
      throw error;
    });

export const fetchFooter = data => dispatch =>
  Umbraco.footer
    .get(data)
    .then(response => {
      dispatch(loadFooter(response));
      return response;
    })
    .catch(error => {
      throw error;
    });
