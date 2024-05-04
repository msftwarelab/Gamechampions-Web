import React from "react";
import { useTranslation } from "react-i18next";
import { DASHBOARD_URL } from "../../containers/app/constants";
import Modal from "../modal/modal";
import Card from "../card/card";

const PopupModal = ({ selectedLanguage, history, onModalClick, isVisible }) => {
  const { t } = useTranslation();

  const returnUrl = `/${selectedLanguage}/`;
  return (
    <Modal
      onClick={() => {
        onModalClick();
      }}
      modalClassName={`popup_modal height_90 ${
        isVisible ? "visible" : "invisible"
      }`}
      isVisible={isVisible}
    >
      <Card className="popup_card">
        <div className="card-close">
          <a
            className="card-close__button"
            onClick={() => {
              onModalClick();
            }}
          />
        </div>
        <div>
          <div>
            <div className="popup_header">{t("PopupTitleText")}</div>
          </div>
          <div className="popup_card_container">
            <a href={`${DASHBOARD_URL}${selectedLanguage}/registration`}>
              <div className="popup_sub_card">
                <img
                  src={`${process.env.STORAGE_URL}/images/tournament.png`}
                  alt={t("PopupCard1Title")}
                  title={t("PopupCard1Title")}
                  style={{ height: "50px" }}
                />
                <div className="popup_sub_card_header">
                  {t("PopupCard1Title")}
                </div>
                <p className="popup_sub_card_body">{t("PopupCard1Body")}</p>
              </div>
            </a>
            <a href={`${DASHBOARD_URL}${selectedLanguage}/registration`}>
              <div className="popup_sub_card">
                <img
                  src={`${process.env.STORAGE_URL}/images/uplay.png`}
                  alt={t("PopupCard2Title")}
                  title={t("PopupCard2Title")}
                />
                <div className="popup_sub_card_header">
                  {t("PopupCard2Title")}
                </div>
                <p className="popup_sub_card_body">{t("PopupCard2Body")}</p>
              </div>
            </a>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="popup_sub_header">{t("PopupCTATitle")}</div>
            <a href={`${DASHBOARD_URL}${selectedLanguage}/registration`}>
              <button className="popup_btn">{t("NavLogInSignUp")}</button>
            </a>
            <p style={{ color: "white" }}>
              {t("PopupBottomBody1")}{" "}
              <a
                href={`${DASHBOARD_URL}${selectedLanguage}/login`}
                style={{ color: "#8DFF3F" }}
              >
                {t("PopupBottomBody2")} {">"}
              </a>
            </p>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default PopupModal;
