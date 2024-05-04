import UmbracoService from "iw-umbraco/umbraco.service";

export default class RouterMockService extends UmbracoService {
  get({ id, url, data }) {
    return Promise.resolve({
      root: "en",
      urlsAndDocTypes: [
        { key: "/", value: "home", isPublic: true },
        { key: "/news-archive", value: "newsFolder", isPublic: true },
        { key: "/banners/", value: "bannerFolder", isPublic: true },
        { key: "/about-us/", value: "page", isPublic: true },
        { key: "/contact/", value: "contact", isPublic: true },
        { key: "/landing-page/", value: "landing", isPublic: true },
        { key: "/contact-items/", value: "contactItemFolder", isPublic: true },
        { key: "/quick-links/", value: "quickLinksFolder", isPublic: true },
        { key: "/social-links/", value: "socialLinksFolder", isPublic: true },
        {
          key: "/email-templates/",
          value: "emailTemplateFolder",
          isPublic: true
        },
        { key: "/page-not-found/", value: "page", isPublic: true },
        { key: "/terms-of-use/", value: "page", isPublic: true },
        { key: "/privacy-policy/", value: "page", isPublic: true },
        { key: "/cookie-policy/", value: "page", isPublic: true },
        { key: "/banners/about-us/", value: "banner", isPublic: true },
        { key: "/banners/home/", value: "banner", isPublic: true },
        {
          key: "/news-archive/news-1/",
          value: "newsItem",
          isPublic: true
        },
        {
          key: "/news-archive/news-2/",
          value: "newsItem",
          isPublic: true
        },
        {
          key: "/news-archive/news-3/",
          value: "newsItem",
          isPublic: true
        },
        {
          key: "/news-archive/news-4/",
          value: "newsItem",
          isPublic: true
        },
        {
          key: "/news-archive/news-5/",
          value: "newsItem",
          isPublic: true
        },
        { key: "/contact/thank-you/", value: "page", isPublic: true },
        { key: "/contact-items/phone/", value: "contactItem", isPublic: true },
        {
          key: "/contact-items/address/",
          value: "contactItem",
          isPublic: true
        },
        { key: "/contact-items/email/", value: "contactItem", isPublic: true },
        { key: "/quick-links/home/", value: "quickLink", isPublic: true },
        { key: "/social-links/twitter/", value: "socialLink", isPublic: true },
        {
          key: "/social-links/instagram/",
          value: "socialLink",
          isPublic: true
        },
        { key: "/social-links/facebook/", value: "socialLink", isPublic: true },
        { key: "/social-links/telegram/", value: "socialLink", isPublic: true },
        { key: "/social-links/snapchat/", value: "socialLink", isPublic: true },
        { key: "/social-links/discord/", value: "socialLink", isPublic: true },
        {
          key: "/email-templates/contact/",
          value: "emailTemplate",
          isPublic: true
        }
      ]
    });
  }
}
