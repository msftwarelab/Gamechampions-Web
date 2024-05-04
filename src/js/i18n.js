import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";
import Umbraco from "../../umbraco/main";

// TODO: Translations should come from Umbraco. Below code should uncomment later.

const initLang = function initLang(selectedLang = "en") {
  return new Promise(async (resolve, reject) => {
    i18next
      .use(initReactI18next) // passes i18n down to react-i18next
      .use(backend)
      .init(
        {
          partialBundledLanguages: true,
          fallbackLng: false,
          load: "languageOnly",
          lng: selectedLang,
          initImmediate: false,
          saveMissing: true, // send not translated keys to endpoint
          interpolation: {
            escapeValue: false // react already safes from xss
          },
          react: {
            useSuspense: true
          },
          backend: {
            loadPath: "{{lng}}",
            request: (options, language, payload, callback) => {
              Umbraco.translation
                .get(language)
                .then(({ translation }) => {
                  callback(null, {
                    data: JSON.stringify(translation),
                    status: 200
                  });
                })
                .catch(err => {
                  callback(err);
                });
            }
          }
        },
        err => {
          if (err) {
            return reject(err);
          }
          return resolve(i18next);
        }
      );
  });
};

export default initLang;
