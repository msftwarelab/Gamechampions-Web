import UmbracoService from "./umbraco.service";

const ITEM_COUNT_HEADER = "page";
const PAGE_COUNT_HEADER = "pagesize";

export default class UmbracoPaginatedService extends UmbracoService {
  constructor() {
    super();

    this.instance.interceptors.response.use(response => {
      if (response.data && typeof response.data === "object") {
        response.data.pagination = {
          pageCount: parseInt(response.headers[PAGE_COUNT_HEADER]),
          itemCount: parseInt(response.headers[ITEM_COUNT_HEADER])
        };
      }

      return response;
    });
  }
}
