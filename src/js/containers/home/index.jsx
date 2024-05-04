import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectSelectedLanguage } from "../multiLanguage/reducer";
import withPage from "../page/withPage";
import { fetchHome, getHome, getHomePage } from "./actions";
import { REDUCER_NAME } from "./constants";
import {
  selectGameSlides,
  selectHowToPlay,
  selectServiceProposition,
  selectHomePage
} from "./reducer";
import BannerSlider from "../../components/banners/bannerSlider";
import LiveTracker from "../../components/liveTracker/liveTracker";
import Faq from "../../components/faq/faq";
import TournamentCardSlider from "../../components/tournamentCardSlides/tournamentCardSlides";
import Testimonials from "../../components/testimonials/testimonials";
import StickyButton from "../../components/stickyButton/stickyButton";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.howToPlayRef = React.createRef();

    this.scrollDownLink = {
      title: "How to play",
      anchor: "#howToPlay",
      handleClick: this.scrollToPlay.bind(this)
    };
  }
  scrollToPlay(e) {
    e.preventDefault();
    return window.scrollTo(0, this.howToPlayRef.current.offsetTop);
  }
  componentDidMount() {
    const {
      tickerMatches,
      howToPlay,
      onLoadHome,
      dataTimestamp,
      selectedLanguage,
      onLoadHomePage
    } = this.props;

    if (!(howToPlay && howToPlay.get("title"))) {
      onLoadHome({ language: selectedLanguage });
    }

    onLoadHomePage({ selectedLanguage });
  }

  render() {
    const {
      page,
      tickerMatches,
      selectedHomePage,
      selectedLanguage,
      currentUrl,
      history
    } = this.props;

    const {
      tournamentsSection,
      liveTracker,
      testimonials,
      faqs
    } = selectedHomePage.toJS();

    return (
      <div className="home">
        {page.get("banners") && !!page.get("banners").size && (
          <BannerSlider
            banner={page.get("banners")}
            className="home__banner home__banner--top"
            scrollDownLink={this.scrollDownLink}
          />
        )}
        {tournamentsSection && (
          <TournamentCardSlider
            title={tournamentsSection.title}
            summary={tournamentsSection.summary}
            tournaments={tournamentsSection.tournaments}
          />
        )}
        {liveTracker && (
          <LiveTracker
            title={liveTracker.title}
            summary={liveTracker.summary}
            currency={liveTracker.currency}
            prizesPaidOut={liveTracker.prizesPaidOut}
            prizesPaidOutSummary={liveTracker.prizesPaidOutSummary}
            winners={liveTracker.winners}
            winnersSummary={liveTracker.winnersSummary}
          />
        )}

        {testimonials && (
          <Testimonials
            title={testimonials.title}
            reviews={testimonials.reviews}
          />
        )}
        {faqs && <Faq title={faqs.title} faqs={faqs.faqs} />}
        <StickyButton
          selectedLanguage={selectedLanguage}
          currentUrl={currentUrl}
        />
      </div>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchHome({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = createStructuredSelector({
  howToPlay: selectHowToPlay,
  gameSlides: selectGameSlides,
  serviceProposition: selectServiceProposition,
  selectedLanguage: selectSelectedLanguage,
  selectedHomePage: selectHomePage
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadHome: data => dispatch(getHome(data)),
    onLoadHomePage: data => dispatch(getHomePage(data))
  };
};

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(Home),
  getHome,
  REDUCER_NAME
);
