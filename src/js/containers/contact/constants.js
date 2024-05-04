export const REDUCER_NAME = "contact";
export const SET_CONTACT = `${REDUCER_NAME}/SET_CONTACT`;
export const SET_ERROR = `${REDUCER_NAME}/ERROR`;
export const RESET_ERROR = `${REDUCER_NAME}/RESET_ERROR`;
export const SET_SUCCESS = `${REDUCER_NAME}/SET_SUCCESS`;

import { FIELD_TYPES } from "../../components/dynamicForm/constants";

export const FORM_FIELDS_CONTACT = [
  {
    id: 1,
    name: "name",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ContactFormName",
      type: "text",
      autoComplete: "name",
      material: true,
      className: "padding-right"
    },
    validation: {
      required: "NameValidationRequired",
      minLength: {
        value: 2,
        message: "NameValidationMinLength"
      }
    }
  },
  {
    id: 2,
    name: "email",
    componentType: FIELD_TYPES.TEXT_BOX,
    fieldProps: {
      label: "ContactFormEmail",
      type: "email",
      autoComplete: "email",
      material: true,
      className: "padding-left"
    },
    validation: { required: "EmailValidationRequired" }
  },
  {
    id: 3,
    name: "message",
    componentType: FIELD_TYPES.TEXT_AREA,
    fieldProps: {
      label: "ContactFormMessage",
      type: "text",
      autoComplete: "message",
      material: true,
      rows: 5,
      className: "single"
    },
    validation: { required: "MessageValidationRequired" }
  }
];
