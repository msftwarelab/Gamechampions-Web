import axios from "axios";

const API_URL = `${process.env.DASHBOARD_API_URL}api`;

export default class UmbracoService {
  constructor() {
    this.instance = axios.create();
  }

  get({ id, url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "get",
      url: serviceUrl,
      params: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  post({ id, url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "post",
      url: serviceUrl,
      data: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  put({ id, url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "put",
      url: serviceUrl,
      data: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  delete({ id, url, data }) {
    const serviceUrl = this.getEndpointUrl({ id, url });

    return this.instance({
      method: "delete",
      url: serviceUrl,
      data: data
    })
      .then(response => response.data)
      .catch(error => Promise.reject(error.response));
  }

  getServiceUrl() {
    return API_URL;
  }

  getEndpointUrl({ id, url }) {
    let serviceUrl = url || this.getServiceUrl();

    if (id) {
      serviceUrl = `${serviceUrl}/${id}`;
    }

    return serviceUrl;
  }
}
