import UmbracoService from "iw-umbraco/umbraco.service";

export default class QuickLinksService extends UmbracoService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/quickLinks`;
  }
}
