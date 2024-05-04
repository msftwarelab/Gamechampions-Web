import UmbracoPageService from "iw-umbraco/umbraco.page.service";
import { DETAIL_PAGE_URL } from "iw-umbraco/umbraco.constants";

export default class NewsService extends UmbracoPageService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/news`;
  }

  getNewsDetailPage({ id, data, url }) {
    const requestUrl = `${this.getServiceUrl()}${DETAIL_PAGE_URL}${
      data.url
    }&language=${data.language}`;
    return super.get({ url: requestUrl });
  }

  getNewsCategoryPage({ id, data, url }) {
    const requestUrl = `${this.getServiceUrl()}/getCategoryPage`;
    return super.get({ data, url: requestUrl });
  }

  getCategories(data) {
    const requestUrl = `${this.getServiceUrl()}/categories?categoryTitle=${
      data.title
    }&language=${data.language}`;
    return super.get({ url: requestUrl });
  }

  getRelatedBlogs(data) {
    const requestUrl = `${this.getServiceUrl()}/readmore?url=${
      data.url
    }&language=${data.language}`;
    return super.get({ url: requestUrl });
  }
}
