import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class HomeMockService extends UmbracoPageService {
  get() {
    return Promise.resolve({});
  }
}
