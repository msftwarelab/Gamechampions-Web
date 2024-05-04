import Ticker from "./ticker";
import TickerService from "./ticker/service";

class Main {
  constructor() {
    if (!Main.instance) {
      this.ticker = new Ticker({ service: new TickerService() });

      Main.instance = this;
    }

    return Main.instance;
  }
}

const instance = new Main();
Object.freeze(instance);
export default instance;
