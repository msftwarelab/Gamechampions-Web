import UmbracoService from "iw-umbraco/umbraco.service";

export default class SocialService extends UmbracoService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/socialLinks`;
  }
}
