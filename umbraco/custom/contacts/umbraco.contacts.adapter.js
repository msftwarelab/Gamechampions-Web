import { toPage } from "iw-umbraco/pages/umbraco.pages.adapter";

export const toContactUsJson = data => {
  if (data) {
    return {
      name: data.name,
      email: data.email,
      message: data.message
    };
  }
};

export const toContactPage = data => {
  if (data) {
    let contact = toPage(data);
    contact.items = toContactItemArray(data.items);
    return contact;
  }
};

const toContactItemArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toContactItem(item);
    });
  }
  return [];
};

const toContactItem = data => {
  if (data) {
    return {
      id: data.id,
      icon: toIcon(data.icon),
      title: data.title,
      text: data.text
    };
  }
};

export const toIcon = data => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      imageUrl: data.imageUrl,
      alternateText: data.alternateText
    };
  }
};
