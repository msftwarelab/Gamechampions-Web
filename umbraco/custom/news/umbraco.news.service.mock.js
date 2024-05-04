import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class NewsMockService extends UmbracoPageService {
  constructor() {
    super();
    this.mockNewsItems = [
      {
        id: 1,
        title: "News 1",
        banners: [
          {
            id: 1111,
            images: [
              {
                title: "news_1.jpg",
                imageUrl: "/img/mock_images/news-archive/news_1.jpg",
                alternateText: "news_1.jpg",
                width: 720,
                height: 290
              }
            ],
            title: "News 1",
            link: "",
            summary: ""
          }
        ],
        summary: "<p>Lorem ipsum.</p>",
        html: "<p>Lorem ipsum.</p>",
        url: "/news-archive/news-1/",
        thumbnail: {
          title: "news_1_thumbnail.jpg",
          imageUrl: "/img/mock_images/news-archive/news_1_thumbnail.jpg",
          alternateText: "news_1_thumbnail.jpg",
          width: 453,
          height: 270
        },
        template: "News",
        meta: {
          title: "News 1",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "2019-12-12T11:13:06+00:00"
        },
        name: "news_1",
        category: "PUBLICATIONS",
        date: "2019-12-12T11:13:06+00:00",
        isHidden: false
      },
      {
        id: 2,
        title: "News 2",
        banners: [
          {
            id: 1112,
            images: [
              {
                title: "news_1.jpg",
                imageUrl: "/img/mock_images/news-archive/news_1.jpg",
                alternateText: "news_1.jpg",
                width: 720,
                height: 290
              }
            ],
            title: "News 2",
            link: "",
            summary: ""
          }
        ],
        summary: "<p>Lorem ipsum.</p>",
        html: "<p>Lorem ipsum.</p>",
        url: "/news-archive/news-2/",
        thumbnail: {
          title: "news_1_thumbnail.jpg",
          imageUrl: "/img/mock_images/news-archive/news_1_thumbnail.jpg",
          alternateText: "news_1_thumbnail.jpg",
          width: 453,
          height: 270
        },
        template: "News",
        meta: {
          title: "News 2",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "2019-12-12T11:13:06+00:00"
        },
        name: "news_2",
        category: "PUBLICATIONS",
        date: "2019-12-12T11:13:06+00:00",
        isHidden: false
      },
      {
        id: 3,
        title: "News 3",
        banners: [
          {
            id: 1113,
            images: [
              {
                title: "news_1.jpg",
                imageUrl: "/img/mock_images/news-archive/news_1.jpg",
                alternateText: "news_1.jpg",
                width: 720,
                height: 290
              }
            ],
            title: "News 3",
            link: "",
            summary: ""
          }
        ],
        summary: "<p>Lorem ipsum.</p>",
        html: "<p>Lorem ipsum.</p>",
        url: "/news-archive/news-3/",
        thumbnail: {
          title: "news_1_thumbnail.jpg",
          imageUrl: "/img/mock_images/news-archive/news_1_thumbnail.jpg",
          alternateText: "news_1_thumbnail.jpg",
          width: 453,
          height: 270
        },
        template: "News",
        meta: {
          title: "News 3",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "2019-12-12T11:13:06+00:00"
        },
        name: "news_3",
        category: "PUBLICATIONS",
        date: "2019-12-12T11:13:06+00:00",
        isHidden: false
      },
      {
        id: 4,
        title: "News 4",
        banners: [
          {
            id: 1114,
            images: [
              {
                title: "news_1.jpg",
                imageUrl: "/img/mock_images/news-archive/news_1.jpg",
                alternateText: "news_1.jpg",
                width: 720,
                height: 290
              }
            ],
            title: "News 4",
            link: "",
            summary: ""
          }
        ],
        summary: "<p>Lorem ipsum.</p>",
        html: "<p>Lorem ipsum.</p>",
        url: "/news-archive/news-4/",
        thumbnail: {
          title: "news_1_thumbnail.jpg",
          imageUrl: "/img/mock_images/news-archive/news_1_thumbnail.jpg",
          alternateText: "news_1_thumbnail.jpg",
          width: 453,
          height: 270
        },
        template: "News",
        meta: {
          title: "News 4",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "2019-12-12T11:13:06+00:00"
        },
        name: "news_4",
        category: "PUBLICATIONS",
        date: "2019-12-12T11:13:06+00:00",
        isHidden: false
      },
      {
        id: 5,
        title: "News 5",
        banners: [
          {
            id: 1115,
            images: [
              {
                title: "news_1.jpg",
                imageUrl: "/img/mock_images/news-archive/news_1.jpg",
                alternateText: "news_1.jpg",
                width: 720,
                height: 290
              }
            ],
            title: "News 5",
            link: "",
            summary: ""
          }
        ],
        summary: "<p>Lorem ipsum.</p>",
        html: "<p>Lorem ipsum.</p>",
        url: "/news-archive/news-5/",
        thumbnail: {
          title: "news_1_thumbnail.jpg",
          imageUrl: "/img/mock_images/news-archive/news_1_thumbnail.jpg",
          alternateText: "news_1_thumbnail.jpg",
          width: 453,
          height: 270
        },
        template: "News",
        meta: {
          title: "News 5",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "2019-12-12T11:13:06+00:00"
        },
        name: "news_5",
        category: "PUBLICATIONS",
        date: "2019-12-12T11:13:06+00:00",
        isHidden: false
      },
      {
        id: 6,
        title: "News 6",
        banners: [
          {
            id: 1116,
            images: [
              {
                title: "news_1.jpg",
                imageUrl: "/img/mock_images/news-archive/news_1.jpg",
                alternateText: "news_1.jpg",
                width: 720,
                height: 290
              }
            ],
            title: "News 6",
            link: "",
            summary: ""
          }
        ],
        summary: "<p>Lorem ipsum.</p>",
        html: "<p>Lorem ipsum.</p>",
        url: "/news-archive/news-6/",
        thumbnail: {
          title: "news_1_thumbnail.jpg",
          imageUrl: "/img/mock_images/news-archive/news_1_thumbnail.jpg",
          alternateText: "news_1_thumbnail.jpg",
          width: 453,
          height: 270
        },
        template: "News",
        meta: {
          title: "News 6",
          description: "",
          keywords: "",
          creator: "John Doe",
          date: "2019-12-12T11:13:06+00:00"
        },
        name: "news_6",
        category: "PUBLICATIONS",
        date: "2019-12-12T11:13:06+00:00",
        isHidden: false
      }
    ];
    this.mockNewsCategoryItems = JSON.parse(JSON.stringify(this.mockNewsItems));

    for (let i = this.mockNewsCategoryItems.length - 1; i >= 0; i--) {
      this.mockNewsCategoryItems[i].category = "PUBLICATIONS";
    }
  }
  getPage({ id, url, data }) {
    let newsList = this.mockNewsItems;

    const page = data.page;
    const pageSize = data.pageSize;

    const pageCount = Math.ceil(newsList.length / pageSize);
    const itemCount = newsList.length;

    newsList = newsList.slice((page - 1) * pageSize, page * pageSize);

    return Promise.resolve({
      pagination: {
        pageCount: pageCount,
        itemCount: itemCount
      },
      banners: [
        {
          id: 1100,
          images: [
            {
              title: "main-banner.jpg",
              imageUrl: "/img/mock_images/news-archive/main-banner.jpg",
              alternateText: "main-banner.jpg",
              width: 720,
              height: 290
            },
            {
              title: "main-banner-2x.jpg",
              imageUrl: "/img/mock_images/news-archive/main-banner-2x.jpg",
              alternateText: "main-banner-2x.jpg",
              width: 1920,
              height: 774
            }
          ],
          title: "News archive",
          link: "",
          summary:
            "Itaque omnis dicta soluta cum similique modi doloribus at, nisi molestiae laboriosam tempore dolorum explicabo ullam."
        }
      ],
      meta: {
        title: "News archive",
        description: "",
        keywords: "",
        creator: "John Doe",
        date: "01/01/2018"
      },
      html:
        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at, nisi molestiae laboriosam tempore dolorum explicabo ullam, consectetur mollitia qui reiciendis non cupiditate maiores neque ducimus? Eligendi impedit debitis hic fugit natus blanditiis at saepe praesentium in modi, provident, similique ut deserunt! Maiores dolore quia quis quo error, quisquam provident sequi accusantium, aliquam perferendis nihil quam doloremque aperiam explicabo voluptatum reprehenderit illum similique vitae temporibus in dignissimos! Amet debitis, obcaecati. Pariatur enim nisi ratione, repellendus quas ipsa! Reiciendis provident saepe in eligendi ab, error neque consequatur.</p>",
      template: "News",
      id: 10001,
      name: "en",
      title: "News archive",
      summary:
        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, similique! Ipsa quis tempore consequuntur dolorum, voluptas fugiat delectus qui consequatur?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ullam neque harum numquam possimus, beatae sint ducimus repellat, obcaecati similique accusantium, distinctio, minus id dolore tempore. Omnis facere, maxime illum.</p>",
      url: "/news-archive/",
      thumbnail: {
        title: "news-main-thumbnail.jpg",
        imageUrl: "/img/mock_images/news-main-thumbnail.jpg",
        alternateText: "news-main-thumbnail.jpg",
        width: 540,
        height: 540
      },
      newsItems: newsList,
      isHidden: false
    });
  }

  getNewsDetailPage({ id, url, data }) {
    return Promise.resolve(this.mockNewsItems.find(n => n.url === data.url));
  }

  getNewsCategoryPage({ id, url, data }) {
    let newsList = this.mockNewsCategoryItems;

    const page = data.page;
    const pageSize = data.pageSize;
    const pageCount = Math.ceil(newsList.length / pageSize);
    const itemCount = newsList.length;

    newsList = newsList.slice((page - 1) * pageSize, page * pageSize);

    return Promise.resolve({
      pagination: {
        pageCount: pageCount,
        itemCount: itemCount
      },
      banners: [
        {
          id: 1101,
          images: [
            {
              title: "banner.jpg",
              imageUrl: "/img/mock/banners/updates-publications.png",
              alternateText: "banner.jpg",
              width: 720,
              height: 290
            },
            {
              title: "banner-2x.jpg",
              imageUrl: "/img/mock/banners/updates-publications-2x.png",
              alternateText: "banner-2x.jpg",
              width: 1920,
              height: 774
            }
          ],
          title: "News Category",
          link: "",
          summary:
            "Itaque omnis dicta soluta cum similique modi doloribus at, nisi molestiae laboriosam tempore dolorum explicabo ullam, consectetur mollitia qui reiciendis non cupiditate maiores neque ducimus? Eligendi impedit debitis hic fugit natus blanditiis at saepe praesentium in modi, provident, similique ut deserunt."
        }
      ],
      meta: {
        title: "Mock News Page",
        description: "",
        keywords: "",
        creator: "John Doe",
        date: "01/01/2018"
      },
      html:
        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at, nisi molestiae laboriosam tempore dolorum explicabo ullam, consectetur mollitia qui reiciendis non cupiditate maiores neque ducimus? Eligendi impedit debitis hic fugit natus blanditiis at saepe praesentium in modi, provident, similique ut deserunt! Maiores dolore quia quis quo error, quisquam provident sequi accusantium, aliquam perferendis nihil quam doloremque aperiam explicabo voluptatum reprehenderit illum similique vitae temporibus in dignissimos! Amet debitis, obcaecati. Pariatur enim nisi ratione, repellendus quas ipsa! Reiciendis provident saepe in eligendi ab, error neque consequatur.</p>",
      template: "News",
      id: 10001,
      name: "en",
      title: "News",
      summary:
        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, similique! Ipsa quis tempore consequuntur dolorum, voluptas fugiat delectus qui consequatur?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ullam neque harum numquam possimus, beatae sint ducimus repellat, obcaecati similique accusantium, distinctio, minus id dolore tempore. Omnis facere, maxime illum.</p>",
      url: "/latest-news/",
      thumbnail: {
        title: "home-thumbnail.png",
        imageUrl: "/img/mock/home-thumbnail.png",
        alternateText: "home-thumbnail.png",
        width: 540,
        height: 540
      },
      newsItems: newsList,
      isHidden: false
    });
  }
}
