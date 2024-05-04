import UmbracoPageService from "../umbraco.page.service";

export default class PagesService extends UmbracoPageService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/pages`;
  }
}
