import UmbracoService from "iw-umbraco/umbraco.service";

export default class SocialMockService extends UmbracoService {
  get({ id, url, data }) {
    return Promise.resolve([
      {
        id: 10101,
        title: "Facebook",
        url: "https://www.fb.com/",
        platform: "facebook"
      },
      {
        id: 10102,
        title: "Instagram",
        url: "https://www.instagram.com/",
        platform: "instagram"
      },
      {
        id: 10103,
        title: "Twitter",
        url: "https://www.twitter.com/",
        platform: "twitter"
      },
      {
        id: 10104,
        title: "Youtube",
        url: "https://www.youtube.com/",
        platform: "youtube"
      },
      {
        id: 10105,
        title: "Linkedin",
        url: "https://www.linkedin.com/",
        platform: "linkedin"
      },
      {
        id: 10105,
        title: "Tiktok",
        url: "https://www.tiktok.com/",
        platform: "tiktok"
      },
      {
        id: 10106,
        title: "Telegram",
        url: "https://telegram.org/",
        platform: "telegram"
      },
      {
        id: 10107,
        title: "Snapchat",
        url: "https://www.snapchat.com/l/en-gb/",
        platform: "snapchat"
      },
      {
        id: 10108,
        title: "discord",
        url: "https://discord.com/invite/dE64SMGnvy",
        platform: "discord"
      }
    ]);
  }
}