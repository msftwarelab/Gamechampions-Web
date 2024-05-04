import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class LandingService extends UmbracoPageService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/landingpages`;
  }

  getLandingPage({ data }) {
    return this.get({
      url: `${this.getServiceUrl()}?url=${data.url}&language=${data.language}`
    });
  }

  submit({ data }) {
    return this.post({ data, url: `${this.getServiceUrl()}/submit` });
  }
}
