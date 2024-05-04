import {
  SET_LANGUAGES,
  LANGUAGES_ERROR,
  LANGUAGES_LOADING,
  SET_LANGUAGE
} from "./constants";
import Umbraco from "../../../../umbraco/main";

const setLanguages = data => ({
  type: SET_LANGUAGES,
  data
});

const isLoading = data => ({
  type: LANGUAGES_LOADING,
  data
});

const isError = data => ({
  type: LANGUAGES_ERROR,
  data
});

export const setLanguage = data => ({
  type: SET_LANGUAGE,
  data
});

export const fetchLanguages = data => dispatch => {
  dispatch(isLoading(true));
  return Umbraco.multiLanguage
    .get()
    .then(response => {
      dispatch(setLanguages(response));
      dispatch(setLanguage(data));
      return response;
    })
    .then(response => {
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
