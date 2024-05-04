export default class MockService {
  get() {
    //if you add a new language here don't forget to update the array in the \src\js\util\util.js used for util's function
    return Promise.resolve([
      {
        id: 1001,
        language: "en",
        flagPath: "/images/gb.svg"
      },
      {
        id: 1002,
        language: "fr",
        flagPath: "/images/fr.svg"
      },
      {
        id: 1003,
        language: "es",
        flagPath: "/images/es.svg"
      },
      {
        id: 1004,
        language: "de",
        flagPath: "/images/de.svg"
      },
      {
        id: 1005,
        language: "it",
        flagPath: "/images/it.svg"
      },
      {
        id: 1006,
        language: "pt",
        flagPath: "/images/pt.svg"
      },
      {
        id: 1007,
        language: "nl",
        flagPath: "/images/nl.svg"
      },
      {
        id: 1008,
        language: "jp",
        flagPath: "/images/jp.svg"
      },
      {
        id: 1009,
        language: "kr",
        flagPath: "/images/kr.svg"
      }
    ]);
  }
}
