export const toFooter = data => {
  if (data) {
    return {
      title: data.title,
      thumbnail: toImage(data.thumbnail),
      images: toImageArray(data.images),
      html: data.html
    };
  }
};

export const toImage = data => {
  if (data) {
    return {
      src: data.imageUrl,
      title: data.title,
      alt: data.alternateText
    };
  }
};

const toImageArray = data => {
  if (data && data.length) {
    return data.map(item => toImage(item));
  }
  return [];
};
