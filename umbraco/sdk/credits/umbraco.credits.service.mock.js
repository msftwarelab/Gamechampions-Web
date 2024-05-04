import UmbracoService from "iw-umbraco/umbraco.service";
import { AUTHOR_NAME, AUTHOR_URL } from "iw-umbraco/umbraco.constants";

export default class CreditsService extends UmbracoService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/credits`;
  }

  get() {
    return Promise.resolve({
      credits: `<a href=${AUTHOR_URL} target="_blank" rel="noopener" title="Web Development">Developed  by ${AUTHOR_NAME}</a>`
    });
  }
}
