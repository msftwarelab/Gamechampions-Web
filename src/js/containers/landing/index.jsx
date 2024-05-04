import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { fetchLanding, getLanding } from "./actions";
import {
  selectIsSuccess,
  selectErrorMessage,
  selectLandingPage
} from "./reducer";
import { REDUCER_NAME } from "./constants";
import withPage from "../page/withPage";
import BannerSlider from "../../components/banners/bannerSlider";
import TournamentCardSlider from "../../components/tournamentCardSlides/tournamentCardSlides";
import LiveTracker from "../../components/liveTracker/liveTracker";
import Testimonials from "../../components/testimonials/testimonials";
import StickyButton from "../../components/stickyButton/stickyButton";
import { selectSelectedLanguage } from "../multiLanguage/reducer";
import { selectTickerMatches } from "../home/reducer";
import Faq from "../../components/faq/faq";

class Landing extends React.PureComponent {
  render() {
    const {
      page,
      selectedLandingPage,
      selectedLanguage,
      currentUrl,
      tickerMatches
    } = this.props;

    const {
      tournamentsSection,
      liveTracker,
      testimonials,
      faqs
    } = selectedLandingPage.toJS();

    return (
      <div className="home">
        {page.get("banners") && !!page.get("banners").size && (
          <BannerSlider
            banner={page.get("banners")}
            tickerMatches={tickerMatches}
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
    return store.dispatch(fetchLanding({ url, language }));
  }
}

const mapStateToProps = createStructuredSelector({
  isSuccess: selectIsSuccess,
  errorMessage: selectErrorMessage,
  selectedLandingPage: selectLandingPage,
  selectedLanguage: selectSelectedLanguage,
  tickerMatches: selectTickerMatches
});

const mapDispatchToProps = dispatch => ({});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(Landing), Landing)),
  getLanding,
  REDUCER_NAME
);
