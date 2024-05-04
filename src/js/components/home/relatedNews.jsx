import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const DESKTOP_MIN_WIDTH = 768;

const RelatedNews = ({ news }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const { t } = useTranslation();

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (news) {
    return (
      <div className="related-news">
        <div className="related-news-title">
          {t("NewsDetailRelatedArticles")}
        </div>
        <div
          className="related-news-section"
          style={{
            gridTemplateColumns:
              news.size < 3 && windowWidth > DESKTOP_MIN_WIDTH ? "1fr 1fr" : ""
          }}
        >
          {!!news.size &&
            news.map((n, index) => (
              <div key={index} className="related-news-section__item">
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
                <div
                  className="news-section__item__title"
                  style={{ border: "none" }}
                >
                  <a href={n.get("url")}>
                    <div className="news-section__item__h1Title">
                      {n.get("h1Title")}
                    </div>
                  </a>
                </div>
                <div
                  className="news-section__item__summary"
                  dangerouslySetInnerHTML={{ __html: n.get("summary") }}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return null;
};

export default RelatedNews;
