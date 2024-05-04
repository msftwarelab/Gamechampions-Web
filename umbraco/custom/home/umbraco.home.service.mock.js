import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class HomeMockService extends UmbracoPageService {
  getPage({ id, url, data }) {
    return Promise.resolve({
      gameSlides: [
        {
          id: 1,
          image: {
            title: "FIFA 2020",
            imageUrl: "/img/mock_images/home/fifa-cover.jpg",
            alternateText: "FIFA 2020",
            width: 320,
            height: 425
          }
        },
        {
          id: 2,
          image: {
            title: "FORNITE",
            imageUrl: "/img/mock_images/home/fornite-cover.jpg",
            alternateText: "FORNITE",
            width: 320,
            height: 425
          }
        },
        {
          id: 3,
          image: {
            title: "WARZONE",
            imageUrl: "/img/mock_images/home/warzone-cover.jpg",
            alternateText: "WARZONE",
            width: 320,
            height: 425
          }
        },
        {
          id: 4,
          image: {
            title: "ROCKET LEAGUE",
            imageUrl: "/img/mock_images/home/rocket-league-cover.jpg",
            alternateText: "ROCKET LEAGUE",
            width: 320,
            height: 425
          }
        },
        {
          id: 5,
          image: {
            title: "FIFA 2020",
            imageUrl: "/img/mock_images/home/fifa-cover.jpg",
            alternateText: "FIFA 2020",
            width: 320,
            height: 425
          }
        },
        {
          id: 6,
          image: {
            title: "WARZONE",
            imageUrl: "/img/mock_images/home/warzone-cover.jpg",
            alternateText: "WARZONE",
            width: 320,
            height: 425
          }
        }
      ],
      newsItems: [
        {
          date: "2020-01-15T00:00:00",
          name: "News 1",
          title: "News 1d",
          thumbnail: {
            title: "Learning Institute.jpg",
            imageUrl: "/media/1001/learning-institute.jpg",
            alternateText: "Learning Institute.jpg",
            width: 453,
            height: 270,
            id: 1477
          },
          summary: "<p>Lorem ipsum</p>",
          url: "/news-archive/news-1/",
          isHidden: false,
          showInNavigation: false,
          id: 1476
        }
      ],
      statistics: [
        {
          id: 1,
          text: "€35,000+ in Prizes"
        },
        {
          id: 2,
          text: "10,000+ Players"
        },
        {
          id: 2,
          text: "Fast & Easy Withdrawals"
        }
      ],
      howToPlay: [
        {
          id: 1,
          title: "Sign Up",
          description: "Create your profile and link your accounts",
          images: [
            {
              title: "Sign Up",
              imageUrl: "/img/mock_images/home/platforms.png",
              alternateText: "Platforms",
              width: 500,
              height: 300
            }
          ]
        },
        {
          id: 2,
          title: "Play",
          description:
            "Find a similar skilled opponents and Play in 1v1 matches for cash",
          images: [
            {
              title: "Play",
              imageUrl: "/img/mock_images/home/play.png",
              alternateText: "Play",
              width: 500,
              height: 300
            }
          ]
        },
        {
          id: 3,
          title: "Win",
          description: "Win cash and withdraw instantly hassle free",
          images: [
            {
              title: "Win",
              imageUrl: "/img/mock_images/home/coins.png",
              alternateText: "Win",
              width: 500,
              height: 300
            }
          ]
        }
      ],
      serviceProposition: [
        {
          id: 1,
          title: "24/7 Support",
          description:
            "We are here to help you. We moderate all matches 24/7 to ensure fair competition. Enjoy an exceptional customer service experience",
          images: [
            {
              title: "Support",
              imageUrl: "/img/mock_images/home/support.png",
              alternateText: "Support",
              width: 500,
              height: 300
            }
          ]
        },
        {
          id: 2,
          title: "Secure Payments",
          description:
            "You are in good hands. Our integrated payment gateway guarantees the security of your transactions. Withdrawals are fast & easy",
          images: [
            {
              title: "Secure Payments",
              imageUrl: "/img/mock_images/home/credit-card-lock.png",
              alternateText: "Secure Payments",
              width: 500,
              height: 300
            }
          ]
        },
        {
          id: 3,
          title: "Best Value for Money",
          description:
            "No hidden cost. Play as much as you want with 0% commision on your bets and withdraw your money at the lowest rate in the market",
          images: [
            {
              title: "0-percent",
              imageUrl: "/img/mock_images/home/0-percent.png",
              alternateText: "0-percent",
              width: 500,
              height: 300
            }
          ]
        }
      ],
      banners: [
        {
          images: [
            {
              title: "Home Banner",
              imageUrl: "/img/mock_images/home/fifa-banner.jpg",
              alternateText: "Home Banner",
              width: 1597,
              height: 666
            }
          ],
          title: "Play Games Win Cash",
          link: {
            url: "/register",
            title: "Sign Up Now Free",
            isNewWindow: false,
            isInternal: true
          },
          summary: ""
        },
        {
          images: [
            {
              title: "Home Banner",
              imageUrl: "/img/mock_images/home/second-banner.png",
              alternateText: "Home Banner",
              width: 1597,
              height: 666
            }
          ],
          title: "What are you waiting for?",
          link: {
            url: "/register",
            title: "Play now",
            isNewWindow: false,
            isInternal: true
          },
          summary: ""
        }
      ],
      meta: {
        title: "Mock Home Page",
        description: "The Game Champions.",
        keywords: "games",
        creator: "John Doe",
        date: "01/01/2018"
      },
      name: "en",
      title: "Game Champions",
      url: "/",
      thumbnail: {
        title: "tournaments",
        imageUrl: "/img/mock_images/home/trophy.png",
        alternateText: "trophy",
        width: 300,
        height: 300
      },
      showInNavigation: false,
      html:
        "<h1>Tournaments</h1><p>Sign up Today and start making some cash. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>",
      template: "Home",
      id: 1061,
      isHidden: false
    });
  }
}
