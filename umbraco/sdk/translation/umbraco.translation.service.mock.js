import UmbracoService from "iw-umbraco/umbraco.service";

export default class TranslationMockService extends UmbracoService {
  get({ id, url, data }) {
    const translation = {
      translation: [
        {
          key: "ContactPageHeading",
          value: "Get in touch"
        }
      ]
    };

    return Promise.resolve(translation);
  }
}
