import React from "react";

import { Helmet } from "react-helmet";

import { languages } from "../../util/util";

const Meta = ({ meta, url, ogImg }) => {
  let ogImage = (
    <meta
      property="og:image"
      content={`${process.env.STORAGE_URL}/images/linear_logo.svg`}
    />
  );

  let imageSrc = (
    <link
      rel="image_src"
      href={`${process.env.STORAGE_URL}/images/linear_logo.svg`}
    />
  );

  let imgSrc = ogImg || meta.get("thumbnail");
  if (imgSrc) {
    ogImage = <meta property="og:image" content={imgSrc} />;
    imageSrc = <link rel="image_src" href={imgSrc} />;
  }
  return (
    <Helmet htmlAttributes={{ lang: "en", class: "no-js" }}>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{meta.get("title")}</title>
      <meta name="description" content={meta.get("description")} />
      <meta name="keywords" content={meta.get("keywords")} />
      <meta property="og:title" content={meta.get("title")} />
      <link rel="canonical" value={url} />
      {ogImage}
      {imageSrc}
      <meta name="theme-color" content="#00143c" />
      <link rel="manifest" href="/manifest.json" />
      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
      <link
        rel="alternate"
        href={`https://www.gamechampions.com/en/`}
        hrefLang="x-default"
      />
      {languages.map(lang => {
        return (
          <link
            rel="alternate"
            href={`https://www.gamechampions.com/${lang}/`}
            hrefLang={lang}
            key={lang}
          />
        );
      })}
      <link
        rel="icon"
        type="image/png"
        sizes="196x196"
        href={`${process.env.STORAGE_URL}/images/favicon-196.png`}
      />
      <link
        rel="apple-touch-icon"
        href={`${process.env.STORAGE_URL}/images/apple-icon-180.png`}
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </Helmet>
  );
};

export default Meta;
