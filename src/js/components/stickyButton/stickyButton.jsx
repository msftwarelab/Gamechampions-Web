import React from "react";
import { useTranslation } from "react-i18next";
import { DASHBOARD_URL } from "../../containers/app/constants";

const StickyButton = ({ selectedLanguage, currentUrl }) => {
  const { t } = useTranslation();

  return (
    <div className="play-now__sticky-button__wrapper">
      <a
        className="play-now__sticky-button"
        href={`${DASHBOARD_URL}${selectedLanguage}/registration?url=${currentUrl}`}
      >
        {t("GameSliderPlayNow")}
      </a>
    </div>
  );
};

export default StickyButton;
