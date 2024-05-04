import React from "react";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <section className="error-page">
      <div className="error-page__content">
        <div className="error-page__logo">
          <img
            className="error-page__img"
            src={`${process.env.STORAGE_URL}/images/broken_icon.svg`}
            title="Game Champions"
            alt="Game Champions"
          />
        </div>
        <div className="error-page__title">
          <h1>{t("ErrorPageHeading")}</h1>
        </div>
        <div className="error-page__message">
          <p>{t("ErrorPageDescription")}</p>
          <p />
          <p>Game Champions</p>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
