/* This class is used to define which modules will be consumed from Umbraco
   and which will be overridden.
   Follows the singleton pattern: https://www.sitepoint.com/javascript-design-patterns-singleton/ */

/* Import default modules & services
   - remove modules which are not to be consumed
*/
import Router from "./sdk/router/umbraco.router";
import RouterService from "./sdk/router/umbraco.router.service";
import Pages from "./sdk/pages/umbraco.pages";
import PagesService from "./sdk/pages/umbraco.pages.service";
import Navigation from "./sdk/navigation/umbraco.navigation";
import NavigationService from "./sdk/navigation/umbraco.navigation.service";
import QuickLinks from "./sdk/quickLinks/umbraco.quickLinks";
import QuickLinksService from "./sdk/quickLinks/umbraco.quickLinks.service";
import Social from "./sdk/social/umbraco.social";
import SocialService from "./sdk/social/umbraco.social.service";
import Credits from "./sdk/credits/umbraco.credits";
import CreditsService from "./sdk/credits/umbraco.credits.service.mock";

import Session from "./custom/session/umbraco.session";
import Home from "./custom/home/umbraco.home";
import HomeService from "./custom/home/umbraco.home.service";
import Contact from "./custom/contacts/umbraco.contacts";
import ContactService from "./custom/contacts/umbraco.contacts.service";
import Footer from "./custom/footer/umbraco.footer";
import FooterService from "./custom/footer/umbraco.footer.service";
import News from "./custom/news/umbraco.news";
import NewsService from "./custom/news/umbraco.news.service";
import Landing from "./custom/landing/umbraco.landing";
import LandingService from "./custom/landing/umbraco.landing.service";

import MultiLanguage from "./custom/multiLanguage";
import Translation from "./sdk/translation/umbraco.translation";
import TranslationService from "./sdk/translation/umbraco.translation.service";

class Main {
  constructor() {
    if (!Main.instance) {
      this.router = new Router({ service: new RouterService() });
      this.pages = new Pages({ service: new PagesService() });
      this.home = new Home({ service: new HomeService() });
      this.navigation = new Navigation({
        service: new NavigationService()
      });
      this.quickLinks = new QuickLinks({
        service: new QuickLinksService()
      });
      this.social = new Social({ service: new SocialService() });
      this.credits = new Credits({ service: new CreditsService() });
      this.contact = new Contact({ service: new ContactService() });
      this.landing = new Landing({ service: new LandingService() });
      this.footer = new Footer({ service: new FooterService() });
      this.news = new News({ service: new NewsService() });
      this.multiLanguage = new MultiLanguage();
      this.translation = new Translation({ service: new TranslationService() });

      this.session = new Session();

      Main.instance = this;
    }

    return Main.instance;
  }
}

const instance = new Main();
Object.freeze(instance);
export default instance;
