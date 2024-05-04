import AppAbstract from "../app/abstract";
import Home from "../home/";
import Contact from "../contact/";
import Landing from "../landing/";
import Imprexis from "../imprexis";
import Page from "../page/";
import PageNotFound from "../pageNotFound/";
import News from "../news/";
import NewsDetail from "../newsDetail/";

// TODO: the below code makes code-splitting difficult
export const getRouteComponent = routeName => {
  switch (routeName) {
    case "AppAbstract":
      return {
        component: AppAbstract,
        fetchData: [AppAbstract.fetchData]
      };
    case "Home":
      return {
        component: Home,
        fetchData: [Home.fetchData]
      };
    case "Contact":
      return {
        component: Contact,
        fetchData: [Contact.fetchData]
      };
    case "News":
      return {
        component: News,
        fetchData: [News.fetchData]
      };
    case "NewsDetail":
      return {
        component: NewsDetail,
        fetchData: [NewsDetail.fetchData]
      };
    case "Page":
      return {
        component: Page,
        fetchData: [Page.fetchData]
      };
    case "PageNotFound":
      return {
        component: PageNotFound,
        fetchData: [PageNotFound.fetchData]
      };
    case "Landing":
      return {
        component: Landing,
        fetchData: []
      };
    case "Imprexis":
      return {
        component: Imprexis,
        fetchData: []
      };
    default:
      return undefined;
  }
};
