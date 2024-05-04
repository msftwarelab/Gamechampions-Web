import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelectorDropdown = ({
  currentLanguage,
  openDropdown,
  options,
  changeLanguage,
  toggling,
  currentFlag
}) => {
  const { t } = useTranslation();

  return (
    <div className="multi-language">
      <div onClick={toggling} className="multi-language__dropdown">
        <div className="multi-language__dropdown__container">
          <img
            src={`${process.env.STORAGE_URL}${currentFlag}`}
            title={`${currentLanguage} thumbnail`}
            alt={`${currentLanguage} thumbnail`}
            className="multi-language__dropdown__container__image"
          />
          <span className="multi-language__dropdown__container__text">
            {t(currentLanguage)}
          </span>
        </div>
      </div>
      {openDropdown && (
        <div>
          <ul className="multi-language__dropdown__list">
            {options.map((option, index) => (
              <div
                className="multi-language__dropdown__list__item__wrapper"
                key={index}
              >
                <img
                  className="multi-language__dropdown__list__item__image"
                  src={`${process.env.STORAGE_URL}${option.get("flagPath")}`}
                  title={`${option.get("title")} icon`}
                  alt={"Flag"}
                />
                <li
                  className="multi-language__dropdown__list__item"
                  onClick={() => {
                    changeLanguage(option);
                  }}
                  key={index}
                >
                  {t(option.get("title"))}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelectorDropdown;
