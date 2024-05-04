import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class ContactService extends UmbracoPageService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/contacts`;
  }

  submit({ data }) {
    return this.post({ data, url: `${this.getServiceUrl()}/submit` });
  }
}
