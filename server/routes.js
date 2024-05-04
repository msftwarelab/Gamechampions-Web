/*
 * Local implementation of routing retrieved from API
 */
import Umbraco from "../umbraco/main";

export const getRoutes = async () => {
  // retrieve the navigation from the shared Umbraco SDK
  const response = await Umbraco.router.getRoutingTable();

  // iterate route data to create Route components
  const routes = response.urlsAndDocTypes.reduce((array, item) => {
    const route = { url: item.key, exact: true };

    if (item.value.toLowerCase() === "home") {
      array.push({ ...route, name: "Home" });
    } else if (item.value.toLowerCase() === "contact") {
      array.push({ ...route, name: "Contact" });
    } else if (item.value.toLowerCase() === "landingpage") {
      array.push({ ...route, name: "Landing" });
    } else if (
      item.value.toLowerCase() === "newsfolder" ||
      item.value.toLowerCase() === "category"
    ) {
      array.push({ ...route, name: "News" });
    } else if (item.value.toLowerCase() === "newsitem") {
      array.push({ ...route, name: "NewsDetail" });
    } else if (item.value.toLowerCase() === "page") {
      array.push({ ...route, name: "Page" });
    }
    return array;
  }, []);

  routes.push({ url: "/en/lolpickem/", exact: true, name: "Imprexis" });
  return routes;
};
