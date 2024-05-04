import UmbracoService from "iw-umbraco/umbraco.service";

export default class RouterService extends UmbracoService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/routes`;
  }
}
