import { toTranslation } from "./umbraco.translation.adapter";
import MockService from "./umbraco.translation.service.mock";

export default class Translation {
  constructor({ service }) {
    this.service = service || new MockService();
  }

  get(lang) {
    return this.service.getTranslation({ lang }).then(response => {
      return toTranslation(response);
    });
  }
}
