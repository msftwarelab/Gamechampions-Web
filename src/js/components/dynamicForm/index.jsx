import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import DynamicFormField from "./dynamicFormField";
import { useTranslation } from "react-i18next";

const DynamicForm = ({
  action = "/",
  method = "post",
  mode = "create",
  formFields,
  initialValues = {},
  onSubmit = null,
  loading = false,
  returnUrl = "",
  onCancel = null,
  apiErrorMessage = "",
  className = "",
  displayButtons = true,
  submitButtonLabel = "ButtonDynamicFormSubmit",
  submitButtonIcon = null,
  cancelLabel,
  extraLinks,
  separators,
  extraContents
}) => {
  let isReadOnly = true;
  let buttonLabel = "";

  switch (mode) {
    case "edit":
      buttonLabel = submitButtonLabel || "ButtonDynamicFormSave";
      isReadOnly = false;
      break;
    case "create":
      buttonLabel = submitButtonLabel;
      isReadOnly = false;
      break;
    case "delete":
      buttonLabel = "ButtonDynamicFormDelete";
      break;
    default:
      buttonLabel = submitButtonLabel;
  }

  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    formState
  } = useForm({ defaultValues: initialValues });

  const { t } = useTranslation();

  const { isSubmitting } = formState;

  return (
    <div className="form__section">
      <form
        action={action}
        method={method}
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${className ? `form--${className}` : ""}`}
      >
        <div
          className={`form__section ${
            className ? `form__section--${className}` : ""
          }`}
        >
          {formFields &&
            formFields.length &&
            formFields.map(item => (
              <DynamicFormField
                key={item.id}
                item={item}
                initialValue={
                  initialValues && initialValues[item.name]
                    ? initialValues[item.name]
                    : undefined
                }
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                isReadOnly={isReadOnly}
              />
            ))}
        </div>
        {displayButtons && (
          <div
            className={`form__buttons ${
              className ? `form__buttons--${className}` : ""
            }`}
          >
            {returnUrl && (
              <Link
                to={returnUrl}
                className="button form__buttons__button form__buttons__button--cancel"
                title="Cancel"
                onClick={onCancel}
              >
                {t(cancelLabel || "ButtonDynamicFormCancel")}
              </Link>
            )}
            {!isReadOnly && (
              <input
                type="submit"
                value={t(buttonLabel)}
                className={`button form__buttons__button ${
                  className ? `form__buttons__button--${className}` : ""
                }`}
                disabled={loading || isSubmitting}
                icon={submitButtonIcon}
              />
            )}
          </div>
        )}
        {apiErrorMessage && (
          <div
            className={`form__error ${
              className ? `form__error--${className}` : ""
            }`}
          >
            <div
              className={`form__error__message ${
                className ? `form__error__message--${className}` : ""
              }`}
              dangerouslySetInnerHTML={{ __html: apiErrorMessage }}
            />
          </div>
        )}
        {extraLinks}
        {separators}
        {extraContents}
      </form>
    </div>
  );
};

export default DynamicForm;
