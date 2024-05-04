import { toLandingPage, toLandingPageJson } from "./umbraco.landing.adapter";

export default class Landing {
  constructor({ service }) {
    this.service = service;
  }

  getPage(data) {
    return this.service
      .getLandingPage({ data })
      .then(response => {
        return toLandingPage(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  submit(data) {
    return this.service.submit({ data: toLandingPageJson(data) });
  }
}
