import UmbracoService from "iw-umbraco/umbraco.service";

export default class RouterMockService extends UmbracoService {
  get({ id, url, data }) {
    return Promise.resolve({
      root: "en",
      urlsAndDocTypes: [
        {
          key: "/",
          value: "home"
        },
        {
          key: "/banners/",
          value: "bannerFolder"
        },
        {
          key: "/quick-links/",
          value: "quickLinksFolder"
        },
        {
          key: "/social-links/",
          value: "socialLinksFolder"
        },
        {
          key: "/page-a/",
          value: "page"
        },
        {
          key: "/page-b/",
          value: "page"
        },
        {
          key: "/contact/",
          value: "contact"
        },
        {
          key: "/contact/thank-you/",
          value: "page"
        },
        {
          key: "/page-not-found/",
          value: "page"
        },
        {
          key: "/banners/main-banner/",
          value: "banner"
        },
        {
          key: "/quick-links/contact/",
          value: "quickLink"
        },
        {
          key: "/quick-links/terms-conditions/",
          value: "quickLink"
        },
        {
          key: "/social-links/facebook/",
          value: "socialLink"
        },
        {
          key: "/social-links/instagram/",
          value: "socialLink"
        },
        {
          key: "/social-links/twitter/",
          value: "socialLink"
        },
        {
          key: "/social-links/telegram/",
          value: "socialLink"
        },
        {
          key: "/social-links/snapchat/",
          value: "socialLink"
        },
        {
          key: "/social-links/discord/",
          value: "socialLink"
        }
      ]
    });
  }
}
