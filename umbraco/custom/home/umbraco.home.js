import MockService from "./umbraco.home.service.mock";
import { toHome, toHomePage } from "./umbraco.home.adapter";

export default class Home {
  constructor({ service }) {
    this.service = service || new MockService();
  }

  getPage(data) {
    return this.service.getPage({ data }).then(response => toHome(response));
  }

  getHomePage(data) {
    return this.service
      .getHomePage({ data })
      .then(response => {
        return toHomePage(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
