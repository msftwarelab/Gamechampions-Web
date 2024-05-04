import { toPage, toPageStub } from "iw-umbraco/pages/umbraco.pages.adapter";
import { toBanner } from "iw-umbraco/umbraco.adapter";
import { toPagination } from "iw-umbraco/umbraco.adapter";

export const toNewsPage = data => {
  let news = toNewsCategoryPage(data);
  news.secondaryBanner = toBanner(data.banners ? data.banners[0] : null);
  news.newsList = toNewsStubArray(
    data.newsItems ? data.newsItems : data.relatedBlogs
  );
  news.pagination = toPagination(data.pagination);
  news.categoriesCount = data.categoriesCount;
  news.categories = data.categories;
  return news;
};

export const toNewsCategoryPage = data => {
  let news = toPage(data);
  news.newsList = toNewsCategoryStubArray(data.newsItems);
  news.pagination = toPagination(data.pagination);
  return news;
};

const toNewsItem = data => {
  if (data) {
    let news = toPageStub(data);
    news.date = data.date;
    news.categoryPage = toPage(data.categoryPage);
    return news;
  }
};

export const toNewsStubArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toNewsItem(item);
    });
  }
  return [];
};

const toNewsCategoryStubArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toNewsItem(item);
    });
  }
  return [];
};

export const toNewsDetailPage = data => {
  if (data) {
    let newsItem = toPage(data);
    newsItem.date = data.date;
    return newsItem;
  }
};
