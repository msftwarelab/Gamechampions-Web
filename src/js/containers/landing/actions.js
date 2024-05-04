import {
  SET_SUCCESS,
  REDUCER_NAME,
  RESET_ERROR,
  SET_ERROR,
  SET_LANDING_PAGE
} from "./constants";
import { renderPage } from "../page/actions";
import Umbraco from "../../../../umbraco/main";
import { transformApiMessages } from "../../util/apiErrorMessages";

const setSuccess = () => ({
  type: SET_SUCCESS
});

export const resetError = () => ({
  type: RESET_ERROR
});

const setError = data => ({
  type: SET_ERROR,
  data
});

const setLandingPage = data => ({
  type: SET_LANDING_PAGE,
  data
});

export const getLanding = data => dispatch =>
  Umbraco.landing
    .getPage(data)
    .then(response => {
      dispatch(setLandingPage(response));
      return response;
    })
    .catch(error => {
      throw error;
    });

export const submitLanding = data => dispatch =>
  Umbraco.landing
    .submit(data)
    .then(response => {
      dispatch(setSuccess());
      return response;
    })
    .catch(error => {
      dispatch(setError({ errorMessage: getContactUsApiErrorMessage(error) }));
      throw error;
    });

export const fetchLanding = data => dispatch =>
  renderPage({ reducerName: REDUCER_NAME, get: getLanding, data })(dispatch);

const getCustomMessagesShema = () => ({
  400: "We could not submit your form because the information supplied is invalid."
});

export const getContactUsApiErrorMessage = apiErrorResponse =>
  transformApiMessages(apiErrorResponse, getCustomMessagesShema());
