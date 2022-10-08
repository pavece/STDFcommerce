import React from "react";

import ImageGallery from "react-image-gallery";

export const ProductImages = ({ images }: { images: string[] }) => {
  const sliderImages = images.map((image) => {
    return {
      original: image,
      thumbnail: image,
    };
  });

  return (
    <ImageGallery
      items={sliderImages}
      showThumbnails={false}
      showPlayButton={false}
      showFullscreenButton={false}
    ></ImageGallery>
  );
};
