import UmbracoService from "iw-umbraco/umbraco.service";

export default class NavigationService extends UmbracoService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/navigation`;
  }

  getSitemap({ data }) {
    return super.get({ data, url: `${this.getServiceUrl()}/sitemap` });
  }

  getGoMaps() {
    let url = `${this.getServiceUrl()}/getgomaps`;
    return super.get({
      url
    });
  }
}
