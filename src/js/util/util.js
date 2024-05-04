export const languages = ["en", "fr", "es", "de", "it", "pt", "nl", "jp", "kr"];

export function getLanguageFromUrl(url) {
  const regex = new RegExp(languages.join("|"), "gi");
  const matchedLanguages = url && url.match(regex);
  const matchedLanguage =
    matchedLanguages && matchedLanguages.length ? matchedLanguages[0] : null;

  // do additional check to ensure that language code is not part of a url
  // EX: /daily-leagues/ where 'es' is not the langauge code
  if (matchedLanguage) {
    const indexOfLang = url.indexOf(matchedLanguage);
    const prevChar = indexOfLang - 1 >= 0 && url[indexOfLang - 1];
    const nextChar = indexOfLang + 2 < url.length && url[indexOfLang + 2];

    if (
      (prevChar && prevChar !== "/") ||
      (nextChar && nextChar !== "/" && nextChar !== "?")
    ) {
      return null;
    }
  }

  return matchedLanguage;
}

export function getLanguageFromUrlWithDefault(url) {
  const language = getLanguageFromUrl(url);
  return language || "en";
}

export function getRouteWithoutLanguage(url) {
  if (!url) {
    return url;
  }

  let replacedUrl = url;

  languages.forEach(language => {
    if (url.indexOf(`/${language}`) !== -1) {
      replacedUrl = replacedUrl.replace(`/${language}`, "");
      return false;
    }
  });

  if (!replacedUrl.length || replacedUrl[0] != "/") {
    replacedUrl += "/";
  }

  return replacedUrl;
}

export function isElementInViewport(el) {
  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }

  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /*or $(window).width() */
  );
}

export function toQueryString(obj) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout;
  return () => {
    let context = this;
    let args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// function returns a universally unique identifier (note this is not RFC4122 compliant)
export function getUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

// isomorphic function can be called both server and client side
export function isQueryParamExist(name, search) {
  return !!getQueryStringParamByName(name, search);
}

// isomorphic function can be called both server and client side
export function getQueryStringParamByName(name, search) {
  const urlParams = new URLSearchParams(search);
  return urlParams.get(name);
}

// retrieves a parameter from the query string by name
export function getParameterByName(name, string) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(string || location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return "";
  }
}

// append key=value to query string
export function updateQueryStringParameter(uri, key, value) {
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

export function removeQueryParameter(uri, key) {
  // prefer to use l.search if you have a location/link object
  let prefix = encodeURIComponent(key) + "=";
  let pars = uri.split(/[&;]/g);
  // reverse iteration as may be destructive
  for (let i = pars.length; i-- > 0; ) {
    // idiom for string.startsWith
    if (pars[i].lastIndexOf(prefix) !== -1) {
      pars.splice(i, 1);
    }
  }
  uri = pars.length > 0 ? pars.join("&") : "";
  return uri;
}

export function setCookie(cname, cvalue, exdays, domain) {
  if (typeof window !== "undefined") {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();

    let cookieSettings = cname + "=" + cvalue + ";" + expires + ";path=/";

    if (domain) {
      cookieSettings += ";domain=" + domain;
    }

    document.cookie = cookieSettings;
    return getCookie(cname);
  }
}

export function getCookie(cname) {
  if (typeof window !== "undefined") {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
