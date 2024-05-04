import Umbraco from "../../umbraco/main";

export const goMapsHandler = (req, res, next) => {
  Umbraco.navigation
    .getGoMaps()
    .then(response => {
      const goMapUrl = response.find(item => {
        return item.key === req.url.replace("/go", "") + "/";
      });

      if (goMapUrl) {
        return res.redirect(301, goMapUrl.urlValue);
      }
      return next();
    })
    .catch(error => {
      console.error(error);
      return next();
    });
};
