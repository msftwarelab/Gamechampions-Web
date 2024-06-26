import UmbracoPaginatedService from "./umbraco.pagination.service";

export default class UmbracoPageService extends UmbracoPaginatedService {
  getPage({ id, data, url }) {
    let serviceUrl = url || this.getServiceUrl();
    // create a clone of the data obj
    if (id) {
      // append the ID to the URL
      serviceUrl += `/${id}`;
    }
    serviceUrl += `/getPage`;

    return super.get({ data, url: serviceUrl });
  }
}
