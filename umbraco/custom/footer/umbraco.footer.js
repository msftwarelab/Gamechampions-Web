import MockService from "./umbraco.footer.service.mock";
import { toFooter } from "./umbraco.footer.adapter";

export default class Footer {
  constructor({ service }) {
    this.service = service || new MockService();
  }

  get(data) {
    return this.service
      .get({ data })
      .then(response => toFooter(response))
      .catch(error => {
        console.error(error);
      });
  }
}
