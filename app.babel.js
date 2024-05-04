/* global  __dirname */
/* global  process */

"use strict";

import fs from "fs";
import https from "https";
import path from "path";
import express from "express";
import exphbs from "express-handlebars";
import handlebars from "handlebars";
import bodyParser from "body-parser";
import compression from "compression";

// custom helpers
import { handleRender } from "./server/server";
import { requireHttps, requireWww } from "./server/helpers/routing.js";
import { generateXmlSitemap } from "./server/helpers/sitemap.js";
// import { goMapsHandler } from "./server/helpers/goMaps.js";
import { getLanguageFromUrl } from "./src/js/util/util";

const DEPLOYMENT_NODE_ENV = "development";
const API_URL = `${process.env.API_URL}`;

// configuration
const config = {
  environment: process.env.NODE_ENV || DEPLOYMENT_NODE_ENV,
  isDeploy: !!process.env.IS_DEPLOY
};

const app = express();

const jsonData = fs.readFileSync("./server/redirectData.json", "utf8");
const redirectData = JSON.parse(jsonData);
// Create the redirect map from the parsed JSON data
const redirects = {};
redirectData.forEach(item => {
  redirects[item["OLD URL"]] = item["NEW URL"];
});

app.use(compression());

app.enable("trust proxy");

app.use("/:language/sitemap.xml", (req, res) => {
  const { params = {} } = req;
  generateXmlSitemap(req, res, params.language).then(response => {
    res.header("Content-Type", "text/xml");
    res.send(response);
  });
});

// TODO: Disable go folder for test
// app.get("/go/:key", function(req, res, next) {
//   goMapsHandler(req, res, next);
// });

app.get("*", (req, res, next) => {
  const oldUrl = req.originalUrl;
  const newUrl = redirects[oldUrl];
  if (newUrl) {
    res.redirect(301, newUrl);
  } else {
    return next();
  }
});

app.get("/robots.txt", function(req, res) {
  let robotResponse = "User-agent: *\n";

  if (req.headers.host.includes("azurewebsites")) {
    robotResponse = "User-agent: *\nDisallow: /";
  }

  robotResponse += "Disallow: /en/reviews/glv-trace/*\n";
  robotResponse += "Disallow: /en/reviews/go/*\n";
  robotResponse += "Disallow: /en/reviews/*?*s=*\n";
  robotResponse += "Disallow: /en/reviews/goto/*\n";
  robotResponse += "Disallow: /en/reviews/wp-admin/*\n";
  robotResponse += "Allow: /en/reviews/wp-admin/admin-ajax.php\n";

  robotResponse += "\nSitemap: https://www.gamechampions.com/en/sitemap.xml\n";
  robotResponse += "Sitemap: https://www.gamechampions.com/fr/sitemap.xml\n";
  robotResponse += "Sitemap: https://www.gamechampions.com/es/sitemap.xml\n";
  robotResponse += "Sitemap: https://www.gamechampions.com/de/sitemap.xml\n";
  robotResponse += "Sitemap: https://www.gamechampions.com/it/sitemap.xml\n";
  robotResponse += "Sitemap: https://www.gamechampions.com/pt/sitemap.xml\n";
  robotResponse +=
    "Sitemap: https://www.gamechampions.com/en/reviews/sitemap_index.xml\n";

  res.type("text/plain");
  res.send(robotResponse);
});

app.get("/ads.txt", (req, res) => {
  const adsTxtPath = path.join(__dirname, "ads.txt");
  const absoluteAdsTxtPath = path.resolve(adsTxtPath);

  res.sendFile(absoluteAdsTxtPath);
});

//if any request comes without language, redirect to /en/request-url
app.use((req, res, next) => {
  if (req.url) {
    const splited = req.url.split(".");
    const extension = splited && splited.length === 2 ? splited[1] : null;

    if (!extension) {
      const language = getLanguageFromUrl(req.url);

      if (!language) {
        return res.redirect(301, "/en" + req.url);
      }
    }
  }

  return next();
});

const viewsDir = "./templates";

// setup express to use handlebars as the templating engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, `${viewsDir}/layouts`),
  partialsDir: path.join(__dirname, `${viewsDir}/partials`),
  extname: ".hbs"
});

// allows partials to be organised in subfolders
hbs
  .getTemplates(path.join(__dirname, `${viewsDir}/partials`))
  .then(function(partials) {
    for (let partial in partials) {
      handlebars.registerPartial(partial, "{{" + partial + "}}");
    }
  })
  .catch(error => {
    console.log(`Unable to retrieve templates. Error: ${error}`);
  });

app.set("views", path.join(__dirname, `${viewsDir}`));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("etag", false);

// setup server for static assets
app.use("/", express.static(path.join(__dirname, "dist"), { etag: false }));

//if request url matches /media/* then redirect to API_URL/media/*
app.use((req, res, next) => {
  if (/\/media\/[^\/]+/.test(req.url)) {
    return res.redirect(API_URL.concat(req.url));
  }
  return next();
});

// https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// redirect to include www
app.use(requireWww);

// require HTTPS
app.use(requireHttps);

// Setup body parser for parsing POST request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// React-Redux middleware
app.use(handleRender);

app.use(function(error, req, res, next) {
  console.error(error.message);
  res.status(500);
  res.render("500", { layout: false });
  return;
});

// use the environment's port or a random port
const port =
  process.env.PORT ||
  (config.environment === DEPLOYMENT_NODE_ENV
    ? 3000
    : Math.floor(Math.random() * (65535 - 1024)) + 1024);
app.listen(port, () => {
  console.log(`Running ${config.environment} on http://localhost:${port}`);
});

// only used for local environment
if (!config.isDeploy) {
  const options = {
    key: fs.readFileSync("server-key.pem"),
    cert: fs.readFileSync("server.pem"),
    requestCert: false,
    rejectUnauthorized: false
  };

  // create a different random port for HTTPS
  let httpsPort =
    config.environment === DEPLOYMENT_NODE_ENV
      ? 6001
      : Math.floor(Math.random() * 65535) + 1024;
  while (httpsPort === port) {
    httpsPort = Math.floor(Math.random() * 65535) + 1024;
  }

  https.createServer(options, app).listen(httpsPort, () => {
    console.log(
      `Running ${config.environment} with SSL on https://localhost:${httpsPort}`
    );
  });
}

export default app;
