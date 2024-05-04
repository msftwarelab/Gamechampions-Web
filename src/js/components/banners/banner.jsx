import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Banner = ({ banner, className, lazyLoading, scrollDownLink }) => {
  const { t } = useTranslation();
  let resultBanner = null;
  if (banner) {
    if (banner.get("useVideo") && banner.get("images")) {
      resultBanner = (
        <video
          className="banner__video"
          autoPlay
          loop
          muted
          playsInline
          poster={banner.get("images").get("src")}
        >
          {banner.videoWebM && (
            <source
              src={banner.get("videoWebM").get("src")}
              type="video/webm; codecs=vp9,vorbis"
            />
          )}
          {banner.videoMp4 && (
            <source src={banner.get("videoMp4").get("src")} type="video/mp4" />
          )}
          {t("BannerBrowserNotSupportVideo")}
        </video>
      );
    } else {
      if (banner.get("images")) {
        resultBanner = (
          <img
            src={banner.get("images").get("src")}
            srcSet={banner.get("images").get("srcset")}
            alt={banner.get("images").get("alt")}
            title={banner.get("images").get("title")}
            loading={lazyLoading}
          />
        );
      }
    }
  }
  return (
    <section className={`banner ${className ? className : ""}`}>
      <div className="banner__content">
        {resultBanner && <div className="banner__image">{resultBanner}</div>}
        {banner && (
          <div className="banner__text">
            {banner.get("title") && (
              <span className="banner__text__title">{banner.get("title")}</span>
            )}
            {banner.get("summary") && (
              <div
                className="banner__text__summary"
                dangerouslySetInnerHTML={{ __html: banner.get("summary") }}
              />
            )}
            {banner.get("link") && (
              <div className="banner__button-wrapper">
                {banner.get("link").get("isInternal") ? (
                  <Link
                    to={banner.get("link").get("url")}
                    target={
                      banner.get("link").get("isNewWindow") ? "_blank" : ""
                    }
                    className="button banner__button"
                  >
                    {banner.get("link").get("title")}
                  </Link>
                ) : (
                  <a
                    href={banner.get("link").get("url")}
                    target={
                      banner.get("link").get("isNewWindow") ? "_blank" : ""
                    }
                    rel="noopener"
                    className="button banner__button"
                  >
                    {banner.get("link").get("title")}
                  </a>
                )}
              </div>
            )}
            {scrollDownLink && (
              <div className="banner__scroll-button">
                <Link
                  to={scrollDownLink.anchor}
                  title={scrollDownLink.title}
                  onClick={scrollDownLink.handleClick}
                  className="banner__scroll-button__link"
                >
                  <span>&nbsp;</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;
