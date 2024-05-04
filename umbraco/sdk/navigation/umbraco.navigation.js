import MockService from "./umbraco.navigation.service.mock";
import {
  toNavigation,
  toSitemap,
  toGoMaps
} from "./umbraco.navigation.adapter";

export default class Navigation {
  constructor({ service }) {
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get({ data }).then(response => toNavigation(response));
  }

  getSitemap(data) {
    return this.service.getSitemap({ data }).then(response => {
      return toSitemap(response);
    });
  }

  getGoMaps() {
    return this.service.getGoMaps().then(response => {
      return toGoMaps(response);
    });
  }
}
