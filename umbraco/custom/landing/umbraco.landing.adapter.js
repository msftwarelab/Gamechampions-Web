import { toBanner, toMeta } from "../../sdk/umbraco.adapter";
import { toImage } from "../footer/umbraco.footer.adapter";

const API_URL = `${process.env.API_URL}`;

export const toLandingPageJson = data => {
  if (data) {
    return {
      name: data.name,
      email: data.email,
      message: data.message
    };
  }
};

export const toLandingPage = data => {
  if (data) {
    return {
      tournamentsSection: toTournamentSection(data),
      liveTracker: toLiveTracker(data),
      testimonials: toTestimonials(data),
      faqs: toFaqs(data),
      id: data.id,
      name: data.name,
      title: data.title,
      h1Title: data.h1Title,
      summary: data.summary,
      html: data.html,
      url: data.url,
      meta: toMeta(data.meta),
      thumbnail: toImage(data.thumbnail),
      icon: toImage(data.icon),
      isHidden: data.isHidden,
      showInNavigation: data.showInNavigation,
      template: data.template,
      banners: toBannersArray(data.banners)
    };
  }
};

export const toTournamentSection = data => {
  if (data)
    return {
      title: data.tournamentTitle,
      summary: data.tournamentSummary,
      tournaments: toTournamentsArray(data.tournaments)
    };
};

export const toTournamentsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toTournamentItem(item);
    });
  }
  return [];
};

export const toTournamentItem = data => {
  if (data) {
    return {
      image: {
        title: data.image.title,
        imageUrl: `${API_URL}${data.image.imageUrl}`,
        alternateText: data.image.alternateText
      },
      prize: data.prize,
      summary: data.summary,
      link: {
        title: data.link.title,
        url: data.link.url,
        isNewWindow: data.link.isNewWindow
      }
    };
  }
};

export const toTestimonialsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toTestimonialItem(item);
    });
  }
  return [];
};

export const toLiveTracker = data => {
  if (data) {
    return {
      title: data.middleSectionTitle,
      summary: data.middleSectionSummary,
      prizesPaidOut: data.prizesPaidOut,
      prizesPaidOutSummary: data.prizesPaidOutSummary,
      currency: data.currency,
      winners: data.winners,
      winnersSummary: data.winnersSummary,
      reviewsSectionTitle: data.reviewsSectionTitle
    };
  }
};

export const toTestimonials = data => {
  if (data) {
    return {
      title: data.reviewsSectionTitle,
      reviews: toTestimonialsArray(data.reviews)
    };
  }
};

export const toTestimonialItem = data => {
  if (data) {
    return {
      thumbnail: {
        title: data.thumbnail.title,
        imageUrl: `${API_URL}${data.thumbnail.imageUrl}`,
        alternateText: data.thumbnail.alternateText
      },
      summary: data.summary,
      username: data.username
    };
  }
};

export const toFaqs = data => {
  if (data) {
    return {
      title: data.faqSectionTitle,
      faqs: toFaqsArray(data.faqs)
    };
  }
};

export const toFaqsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toFaqItem(item);
    });
  }
  return [];
};

export const toFaqItem = data => {
  if (data) {
    return {
      title: data.title,
      summary: data.summary
    };
  }
};

const toBannersArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toMultipleBannerItem(item);
    });
  }
  return [];
};

const toMultipleBannerItem = data => {
  if (data) {
    return toBanner(data);
  }
};
