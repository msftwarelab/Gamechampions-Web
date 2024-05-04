import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class HomeService extends UmbracoPageService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/home`;
  }

  getHomePage({ data }) {
    return this.get({
      url: `${this.getServiceUrl()}/getpage?language=${data.selectedLanguage}`
    });
  }
}
