import MockService from "./umbraco.contacts.service.mock";
import { toContactPage, toContactUsJson } from "./umbraco.contacts.adapter";

export default class Contact {
  constructor({ service }) {
    this.service = service || new MockService();
  }

  getPage(data) {
    return this.service
      .getPage({ data })
      .then(response => {
        return toContactPage(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  submit(data) {
    return this.service.submit({ data: toContactUsJson(data) });
  }
}
