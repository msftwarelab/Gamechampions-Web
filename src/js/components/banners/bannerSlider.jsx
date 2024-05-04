import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { withTranslation } from "react-i18next";

const sliderSettings = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  lazyLoad: true,
  fade: true,
  pauseOnHover: false,
  pauseOnFocus: false
};

class BannerSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      background: null,
      content: null
    };
  }
  componentDidMount() {
    this.setState({
      background: this.backgroundSlider,
      content: this.contentSlider
    });
  }
  getBackground(banner) {
    if (banner.get("useVideo") && banner.get("images")) {
      return (
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
          {t("BannerSliderBrowserNotSupport")}
        </video>
      );
    } else {
      if (banner.get("images")) {
        return (
          <img
            src={banner.get("images").get("src")}
            srcSet={banner.get("images").get("srcset")}
            alt={banner.get("images").get("alt")}
            title={banner.get("images").get("title")}
          />
        );
      }
    }
  }

  render() {
    const { banner, className, scrollDownLink } = this.props;

    return (
      <section className={`banner ${className ? className : ""}`}>
        <div className="banner__content">
          <Slider
            ref={b => (this.backgroundSlider = b)}
            asNavFor={this.contentSlider}
            {...sliderSettings}
            className="banner__image"
          >
            {banner &&
              banner.map((b, i) => <div key={i}>{this.getBackground(b)}</div>)}
          </Slider>
          <Slider
            ref={c => (this.contentSlider = c)}
            asNavFor={this.backgroundSlider}
            {...sliderSettings}
            autoplay={true}
            autoplaySpeed={7000}
            className="banner__text"
          >
            {banner &&
              banner.map((c, i) => (
                <div key={i}>
                  {c.get("title") && (
                    <span className="banner__text__title">
                      {c.get("title")}
                    </span>
                  )}
                  {c.get("summary") && (
                    <div
                      className="banner__text__summary"
                      dangerouslySetInnerHTML={{ __html: c.get("summary") }}
                    />
                  )}
                  {c.get("link") && (
                    <div className="banner__button-wrapper">
                      {c.get("link").get("isInternal") ? (
                        <Link
                          to={c.get("link").get("url")}
                          target={
                            c.get("link").get("isNewWindow") ? "_blank" : ""
                          }
                          className="button banner__button"
                        >
                          {c.get("link").get("title")}
                        </Link>
                      ) : (
                        <a
                          href={c.get("link").get("url")}
                          target={
                            c.get("link").get("isNewWindow") ? "_blank" : ""
                          }
                          rel="noopener"
                          className="button banner__button"
                        >
                          {c.get("link").get("title")}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </Slider>
        </div>
      </section>
    );
  }
}

export default withTranslation()(BannerSlider);
