import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const NewsSection = ({ news, returnUrl }) => {
  const { t } = useTranslation();
  if (news) {
    return (
      <div className="news-section">
        <Helmet>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9653440364391244"
            crossorigin="anonymous"
          />
        </Helmet>
        {!!news.size &&
          news.map((n, index) => (
            <div key={index} className="news-section__item">
              <div className="news-section__item__image">
                {n.get("thumbnail") && (
                  <a href={n.get("url")}>
                    <img
                      src={`${process.env.STORAGE_URL}${
                        n.get("thumbnail").get("src")
                          ? n.get("thumbnail").get("src")
                          : n.get("thumbnail").get("imageUrl")
                      }`}
                      alt={
                        n.get("thumbnail").get("alt")
                          ? n.get("thumbnail").get("alt")
                          : n.get("thumbnail").get("alternateText")
                      }
                      title={n.get("thumbnail").get("title")}
                      loading="lazy"
                    />
                  </a>
                )}
              </div>
              <div className="news-section__item__title">
                <a href={n.get("url")}>
                  <h2>{n.get("h1Title")}</h2>
                </a>
              </div>
              <div
                className="news-section__item__summary"
                dangerouslySetInnerHTML={{ __html: n.get("summary") }}
              />
              <div className="news-section__item__link">
                <a href={n.get("url")}>{t("NewsSectionReadMore")}</a>
              </div>
            </div>
          ))}
      </div>
    );
  }
  return null;
};

export default NewsSection;
