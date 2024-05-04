import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class PagesMockService extends UmbracoPageService {
  get({ id, url, data }) {
    return Promise.resolve(
      [
        {
          children: [],
          banner: {
            images: [
              {
                title: "About Us",
                imageUrl: "/img/mock_images/join/join-banner-mobile-360w.jpg",
                alternateText: "About Us Banner",
                width: 360,
                height: null
              },
              {
                title: "About Us",
                imageUrl: "/img/mock_images/join/join-banner-mobile-720w.jpg",
                alternateText: "About Us Banner",
                width: 720,
                height: null
              },
              {
                title: "About Us",
                imageUrl: "/img/mock_images/join/join-banner-desktop-1440w.jpg",
                alternateText: "About Us Banner",
                width: 1440,
                height: null
              },
              {
                title: "About Us",
                imageUrl: "/img/mock_images/join/join-banner-desktop-2880w.jpg",
                alternateText: "About Us Banner",
                width: 2880,
                height: null
              }
            ],
            title: "About Us",
            link: null,
            summary:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit aliquam cumque iure commodi illo, a atque iusto molestias. Neque, pariatur!"
          },
          meta: {
            title: "Mock About Us Page",
            description: "",
            keywords: "",
            creator: "John Doe",
            date: "01/01/2018"
          },
          html:
            "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam nisi tempora sit culpa dignissimos quaerat nihil, atque debitis voluptates perspiciatis accusantium, ducimus. Saepe hic maiores dolore nobis maxime culpa assumenda, veritatis similique dolor qui obcaecati explicabo deserunt. Neque, suscipit pariatur, omnis est velit aspernatur esse. Deserunt officia reprehenderit, blanditiis mollitia!</p>",
          template: "Page",
          id: 10002,
          name: "About Us",
          title: "About Us",
          summary:
            "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, similique! Ipsa quis tempore consequuntur dolorum, voluptas fugiat delectus qui consequatur?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ullam neque harum numquam possimus, beatae sint ducimus repellat, obcaecati similique accusantium, distinctio, minus id dolore tempore. Omnis facere, maxime illum.</p>",
          url: "/about-us/",
          isHidden: false
        },
        {
          banner: {
            images: [
              {
                title: "banner.jpg",
                imageUrl: "/img/mock/banner.jpg",
                alternateText: "banner.jpg",
                width: 720,
                height: 290
              },
              {
                title: "banner-2x.jpg",
                imageUrl: "/img/mock/banner-2x.jpg",
                alternateText: "banner-2x.jpg",
                width: 1920,
                height: 774
              }
            ],
            title: "",
            link: "",
            summary: ""
          },
          meta: {
            title: "Page not Found",
            description: "",
            keywords: "",
            creator: "John Doe",
            date: "01/01/2018"
          },
          html:
            "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
          template: "Page not Found",
          id: 10004,
          name: "Page not Found",
          title: "404 - Page not Found!",
          summary: "",
          url: "/page-not-found/",
          isHidden: true
        },
        {
          banner: {
            images: [
              {
                title: "banner.jpg",
                imageUrl: "/img/mock/banner.jpg",
                alternateText: "banner.jpg",
                width: 720,
                height: 290
              },
              {
                title: "banner-2x.jpg",
                imageUrl: "/img/mock/banner-2x.jpg",
                alternateText: "banner-2x.jpg",
                width: 1920,
                height: 774
              }
            ],
            title: "",
            link: "",
            summary: ""
          },
          meta: {
            title: "Thank You",
            description: "",
            keywords: "",
            creator: "John Doe",
            date: "01/01/2018"
          },
          html:
            "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
          template: "Thank You",
          id: 10006,
          name: "Thank You",
          title: "Thank You",
          summary: "",
          url: "/contact/thank-you",
          isHidden: true
        }
      ].find(n => n.url === data.url)
    );
  }
}
