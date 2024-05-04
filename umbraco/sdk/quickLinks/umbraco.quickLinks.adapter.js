import { toImage, toLink, toLinkArray } from "iw-umbraco/umbraco.adapter";

export const toQuickLinkArray = data => {
  if (data) {
    return data.map(item => {
      return toQuickLink(item);
    });
  }
  return [];
};

export const toQuickLink = data => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      links: toLinkArray(data.links)
    };
  }
};
