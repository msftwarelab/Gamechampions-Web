import {
  SET_CONTACT,
  SET_SUCCESS,
  SET_ERROR,
  REDUCER_NAME,
  RESET_ERROR
} from "./constants";
import { renderPage } from "../page/actions";
import Umbraco from "../../../../umbraco/main";
import { transformApiMessages } from "../../util/apiErrorMessages";

const loadContact = data => ({
  type: SET_CONTACT,
  data
});

const setSuccess = () => ({
  type: SET_SUCCESS
});

const setError = data => ({
  type: SET_ERROR,
  data
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const getContact = data => dispatch =>
  Umbraco.contact
    .getPage(data)
    .then(response => {
      dispatch(loadContact(response.items));
      return response;
    })
    .catch(error => {
      throw error;
    });

export const submitContact = data => dispatch =>
  Umbraco.contact
    .submit(data)
    .then(response => {
      dispatch(setSuccess());
      return response;
    })
    .catch(error => {
      dispatch(setError({ errorMessage: getContactUsApiErrorMessage(error) }));
      throw error;
    });

export const fetchContact = data => dispatch =>
  renderPage({ reducerName: REDUCER_NAME, get: getContact, data })(dispatch);

const getCustomMessagesShema = () => ({
  400: "We could not submit your form because the information supplied is invalid."
});

export const getContactUsApiErrorMessage = apiErrorResponse =>
  transformApiMessages(apiErrorResponse, getCustomMessagesShema());
