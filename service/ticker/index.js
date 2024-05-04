import { toTickerMatchArray } from "./adapter";

export default class Ticker {
  constructor({ service }) {
    this.service = service;
  }

  getTickerMatches() {
    return this.service.get({}).then(response => toTickerMatchArray(response));
  }
}
