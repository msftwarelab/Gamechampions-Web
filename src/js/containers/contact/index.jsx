import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { fetchContact, submitContact, getContact, resetError } from "./actions";
import {
  selectIsSuccess,
  selectErrorMessage,
  selectContactItems
} from "./reducer";
import { FORM_FIELDS_CONTACT, REDUCER_NAME } from "./constants";
import withPage from "../page/withPage";
import DynamicForm from "../../components/dynamicForm";

class Contact extends React.PureComponent {
  componentWillUnmount() {
    const { onResetError } = this.props;
    onResetError();
  }

  render() {
    const {
      page,
      contactItems,
      isSuccess,
      errorMessage,
      onSubmitContact,
      t
    } = this.props;

    return (
      <div className="contact">
        <section className="contact__section">
          <div className="contact__section__title">
            <h2>{page.get("title")}</h2>
          </div>
          <div className="contact__section__details">
            {contactItems &&
              contactItems.map(n => (
                <div
                  key={n.get("id")}
                  className="contact__section__details__item"
                >
                  {n.get("icon") && (
                    <img
                      src={`${process.env.STORAGE_URL}${n
                        .get("icon")
                        .get("imageUrl")}`}
                      title={n.get("icon").get("title")}
                      alt={n.get("icon").get("alternateText")}
                    />
                  )}
                  <div className="contact__section__details__text">
                    {n.get("text")}
                  </div>
                </div>
              ))}
          </div>
        </section>
        <section className="contact__section">
          <div className="contact__section__title">
            <h2>{t("ContactPageHeading")} </h2>
          </div>
          <div className="section">
            <div className="contact-form">
              {isSuccess && (
                <div className="contact-form__success">
                  <h2>{t("ContactSuccessHeading")}</h2>
                  <p>{t("ContactThankYouGameChamp")}</p>
                </div>
              )}
              {!isSuccess && (
                <DynamicForm
                  formFields={FORM_FIELDS_CONTACT}
                  apiErrorMessage={errorMessage}
                  submitButtonLabel="ContactFormSend"
                  onSubmit={e => onSubmitContact({ ...e })}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(fetchContact({ url, language }));
  }
}

const mapStateToProps = createStructuredSelector({
  contactItems: selectContactItems,
  isSuccess: selectIsSuccess,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  onSubmitContact: data => dispatch(submitContact(data)),
  onResetError: () => dispatch(resetError())
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(Contact), Contact)),
  getContact,
  REDUCER_NAME
);
