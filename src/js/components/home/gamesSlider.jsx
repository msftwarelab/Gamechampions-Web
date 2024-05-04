import React, { Component } from "react";
import Slider from "react-slick";
import { DASHBOARD_URL } from "../../containers/app/constants";
import { withTranslation } from "react-i18next";

const DESKTOP_MIN_WIDTH = 768;

class GameSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const { t, selectedLanguage } = this.props;
    let games = this.props.games;
    if (games && games.get("items")) {
      const sliderSettings = {
        dots: false,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: games.get("items").size >= 5,
        lazyLoad: false,
        autoplaySpeed: 7000,
        pauseOnHover: false,
        pauseOnFocus: false,
        responsive: [
          {
            breakpoint: DESKTOP_MIN_WIDTH,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <>
          {games && games.get("items") && !!games.get("items").size && (
            <section className="home__section__slider">
              <div className="home__container">
                <div className="home__section__title">
                  <h1>{games.get("title")}</h1>
                </div>
                <div className="games-slide">
                  <Slider ref={c => (this.slider = c)} {...sliderSettings}>
                    {games.get("items").map((n, i) => (
                      <div key={i}>
                        <div className="games-slide__game">
                          {n.get("image") && n.get("image").get("imageUrl") && (
                            <div className="games-slide__game__image">
                              <div>
                                <a
                                  className="button"
                                  href={`${DASHBOARD_URL}${selectedLanguage}/registration`}
                                  title="Play Now"
                                >
                                  {t("GameSliderPlayNow")}
                                </a>
                              </div>
                              <img
                                src={`${process.env.STORAGE_URL}${n
                                  .get("image")
                                  .get("imageUrl")}`}
                                alt={n.get("image").get("alternateText")}
                                title={n.get("image").get("title")}
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <div
                    className={`home__section__title--centered games-navegation ${
                      games && games.get("items") && games.get("items").size < 5
                        ? "slick__arrow__display"
                        : ""
                    }`}
                  >
                    <button className="button circle" onClick={this.previous}>
                      &#10094;
                    </button>
                    <button className="button circle" onClick={this.next}>
                      &#10095;
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      );
    }
    return null;
  }
}

export default withTranslation()(GameSlider);
