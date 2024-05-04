import UmbracoService from "iw-umbraco/umbraco.service";

export default class TranslationService extends UmbracoService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/translation`;
  }

  getTranslation({ lang }) {
    return super.get({
      url: `${this.getServiceUrl()}/${lang}?isDashboard=false`
    });
  }
}
