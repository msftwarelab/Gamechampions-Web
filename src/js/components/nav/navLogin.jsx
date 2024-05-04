import React from "react";
import { useTranslation } from "react-i18next";
import { DASHBOARD_URL } from "../../containers/app/constants";
import LanguageSelector from "../../containers/multiLanguage";

const NavLogin = ({ currentUrl, selectedLanguage }) => {
  const { t } = useTranslation();

  return (
    <div className="nav-login">
      <div className="auth-button secondary-bg">
        <a
          href={`${DASHBOARD_URL}${selectedLanguage}?url=${currentUrl}`}
          title="Log In"
        >
          {t("NavLogInLogIn")}
        </a>
      </div>
      <div className="auth-button white-bg">
        <a
          href={`${DASHBOARD_URL}${selectedLanguage}/registration?url=${currentUrl}`}
          title="Sign Up"
        >
          {t("NavLogInSignUp")}
        </a>
      </div>
      <LanguageSelector />
    </div>
  );
};

export default NavLogin;
