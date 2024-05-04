import UmbracoService from "iw-umbraco/umbraco.service";

export default class FooterService extends UmbracoService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/footers`;
  }
}
