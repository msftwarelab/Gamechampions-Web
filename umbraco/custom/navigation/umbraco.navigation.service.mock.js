import UmbracoService from "iw-umbraco/umbraco.service";

let id = 10000;

export default class NavigationMockService extends UmbracoService {
  get() {
    const nav = {
      id: (id += 1),
      title: "Home Page",
      name: "Home",
      url: "/",
      children: [
        {
          id: (id += 1),
          title: "About Us",
          name: "About Us",
          url: "/about-us/",
          children: [],
          lastEdited: "2018-01-01T12:00:00",
          icon: {
            title: "ic_about_24px.svg",
            imageUrl: "/img/icons/ic_about_24px.svg",
            alternateText: "ic_about_24px.svg",
            width: "",
            height: ""
          }
        },
        {
          id: (id += 1),
          title: "News",
          name: "News",
          url: "/news-archive/",
          children: [],
          lastEdited: "2018-01-01T12:00:00",
          icon: {
            title: "ic_news_24px.svg",
            imageUrl: "/img/icons/ic_news_24px.svg",
            alternateText: "ic_news_24px.svg",
            width: "",
            height: ""
          }
        },
        {
          id: (id += 1),
          title: "Contact Us",
          name: "Contact Us",
          url: "/contact/",
          children: [],
          lastEdited: "2018-01-01T12:00:00",
          icon: {
            title: "ic_contact_24px.svg",
            imageUrl: "/img/icons/ic_contact_24px.svg",
            alternateText: "ic_contact_24px.svg",
            width: "",
            height: ""
          }
        }
      ],
      lastEdited: "2018-01-01T12:00:00",
      icon: {
        title: "home.svg",
        imageUrl: "/img/icons/ic_dashboard_24px.svg",
        alternateText: "home.svg",
        width: "",
        height: ""
      }
    };

    return Promise.resolve(nav);
  }
}
