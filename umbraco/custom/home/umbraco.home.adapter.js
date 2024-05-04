import { toPage } from "iw-umbraco/pages/umbraco.pages.adapter";
import { toResponsiveImage } from "../../sdk/umbraco.adapter";
const API_URL = `${process.env.API_URL}`;

export const toHome = data => {
  if (data) {
    let home = toPage(data);
    home.howToPlay = toHowToPlay(data.howToPlay);
    home.serviceProposition = toServiceProposition(data.serviceProposition);
    home.gameSlides = toSlide(data.gameContent);
    return home;
  }
};

const toHowToPlay = data => {
  if (data) {
    return {
      title: data.title,
      items: toHowToPlayArray(data.featuredContentItems)
    };
  }
};

const toHowToPlayArray = data => {
  if (data && data.length) {
    return data.map(item => toHowToPlayItem(item));
  }
  return [];
};

const toHowToPlayItem = data => {
  if (data) {
    return {
      title: data.title,
      description: data.summary,
      images: toThumbnail(data.thumbnail)
    };
  }
};

const toServiceProposition = data => {
  if (data) {
    return {
      title: data.title,
      items: toServicePropositionArray(data.featuredContentItems)
    };
  }
};

const toServicePropositionArray = data => {
  if (data && data.length) {
    return data.map(item => toServicePropositionItem(item));
  }
  return [];
};

const toServicePropositionItem = data => {
  if (data) {
    return {
      title: data.title,
      description: data.summary,
      images: toResponsiveImage([data.thumbnail])
    };
  }
};

const toSlide = data => {
  if (data) {
    return {
      title: data.title,
      items: toSlideArray(data.gameContentItems)
    };
  }
};

const toSlideArray = data => {
  if (data && data.length) {
    return data.map(item => toSlideItem(item));
  }
  return [];
};

const toSlideItem = data => {
  if (data) {
    return {
      title: data.title,
      image: toThumbnail(data.thumbnail)
    };
  }
};

const toThumbnail = data => {
  if (data) {
    return {
      title: data.title,
      imageUrl: data.imageUrl,
      alternateText: data.alternateText
    };
  }
};

export const toHomePage = data => {
  if (data) {
    return {
      tournamentsSection: toTournamentSection(data),
      liveTracker: toLiveTracker(data),
      testimonials: toTestimonials(data),
      faqs: toFaqs(data)
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
