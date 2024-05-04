import UmbracoService from "iw-umbraco/umbraco.service";

export default class QuickLinksMockService extends UmbracoService {
  get({ id, url, data }) {
    return Promise.resolve([
      {
        id: 10060,
        title: "About",
        links: [
          {
            title: "Game Champions",
            url: "/about-us",
            isNewWindow: false,
            isInternal: true
          },
          {
            title: "Internships",
            url: "/internship",
            isNewWindow: false,
            isInternal: true
          },
          {
            title: "Contact us",
            url: "/contact-us",
            isNewWindow: false,
            isInternal: true
          }
        ]
      },
      {
        id: 10061,
        title: "Help",
        links: [
          {
            title: "Support",
            url: "/support",
            isNewWindow: false,
            isInternal: true
          },
          {
            title: "FAQ",
            url: "/faq",
            isNewWindow: false,
            isInternal: true
          }
        ]
      },
      {
        id: 10062,
        title: "More",
        links: [
          {
            title: "Refer a Friend",
            url: "/refer-friend",
            isNewWindow: false,
            isInternal: true
          },
          {
            title: "Terms and Conditions",
            url: "/terms-conditions",
            isNewWindow: false,
            isInternal: true
          },
          {
            title: "Privacy Policy",
            url: "/privacy-policy",
            isNewWindow: false,
            isInternal: true
          }
        ]
      }
    ]);
  }
}
