import ApiService from "../apiService";

export default class TickerService extends ApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/games/tickerMatches`;
  }
}
