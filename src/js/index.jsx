import React from "react";
import { hydrate } from "react-dom";
import App from "./containers/app";
import initLang from "./i18n";
import { I18nextProvider } from "react-i18next";

const preloadedState = window.__PRELOADED_STATE__ || {};
const { multiLanguages = {} } = preloadedState;
const { selectedLanguage = "en" } = multiLanguages;

initLang(selectedLanguage).then(i18n => {
  return hydrate(
    <I18nextProvider t={i18n.t} i18n={i18n}>
      <App />
    </I18nextProvider>,
    document.getElementById("root")
  );
});
