import UmbracoPageService from "iw-umbraco/umbraco.page.service";

export default class ContactsMockService extends UmbracoPageService {
  getPage({ id, url, data }) {
    return Promise.resolve({
      meta: {
        title: "Contact us",
        description: "",
        keywords: "",
        creator: "John Doe",
        date: "01/01/2018"
      },
      banners: [],
      html:
        '<p><span class="umbraco-style-heading1 umbraco-style-color4"> </span></p>',
      template: "Contact",
      id: 1083,
      name: "Contact",
      title: "Contact us",
      summary: "",
      url: "/contact/",
      showInNavigation: true,
      isHidden: false,
      items: [
        {
          icon: {
            title: "location",
            imageUrl: "/img/mock_images/contact/location.svg",
            alternateText: "ic_place_24px.svg",
            width: 0,
            height: 0,
            id: 1549
          },
          title: "Address",
          text: "TAKEOFF, University of Malta, L-Imsida MSD 2080",
          id: 1122
        },
        {
          icon: {
            title: "phone",
            imageUrl: "/img/mock_images/contact/phone.svg",
            alternateText: "phone",
            width: 0,
            height: 0,
            id: 1548
          },
          title: "Phone",
          text: "+356 12 345 678",
          id: 1121
        },
        {
          icon: {
            title: "mail",
            imageUrl: "/img/mock_images/contact/mail.svg",
            alternateText: "mail",
            width: 0,
            height: 0,
            id: 1547
          },
          title: "Email",
          text: "ask@gmail.com",
          id: 1472
        }
      ]
    });
  }

  submit(data) {
    return Promise.resolve({});
  }
}
