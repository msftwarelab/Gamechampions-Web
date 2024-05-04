import MockService from "./umbraco.news.service.mock";
import {
  toNewsPage,
  toNewsCategoryPage,
  toNewsDetailPage
} from "./umbraco.news.adapter";

export default class News {
  constructor({ service }) {
    this.service = service || new MockService();
  }

  getNewsPage(data) {
    return this.service
      .getPage({ data })
      .then(response => {
        return toNewsPage(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCategories(data) {
    return this.service
      .getCategories(data)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error(error);
      });
  }
  getNewsDetailPage(data) {
    return this.service
      .getNewsDetailPage({ data })
      .then(response => {
        return toNewsDetailPage(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getRelatedBlogs(data) {
    return this.service
      .getRelatedBlogs(data)
      .then(response => {
        return toNewsPage(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getNewsCategoryPage(data) {
    return this.service
      .getNewsCategoryPage({ data })
      .then(response => {
        return toNewsCategoryPage(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
