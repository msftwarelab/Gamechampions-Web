import Umbraco from "../../umbraco/main";
import { getLanguageFromUrlWithDefault } from "../../src/js/util/util";

export function generateXmlSitemap(req, res, language) {
  return getUrls({ language }).then(response => {
    let request = req.headers.host;
    if (!request.startsWith("www.")) {
      request = "www." + request;
    }
    const pathname = req.protocol + "://" + request;
    let xml =
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';

    for (let i in response) {
      const lastEdited = response[i].lastEdited;

      xml += "<url>";
      xml += "<loc>" + pathname + response[i].url + "</loc>";
      if (lastEdited && lastEdited.length) {
        xml +=
          "<lastmod>" +
          lastEdited.substring(0, lastEdited.length - 9) +
          "</lastmod>";
      }
      xml += "</url>";
      i++;
    }
    xml += "</urlset>";
    return xml;
  });
}

export function getUrls(data) {
  return Umbraco.navigation.getSitemap(data);
}
