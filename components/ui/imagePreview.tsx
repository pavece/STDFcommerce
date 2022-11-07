import React from "react";
import Image from "next/image";
import { Box } from "@mui/system";

const ImagePreview = ({ images }: { images: string[] }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      {images.map((image) => {
        return (
          <Image
            height={100}
            width={100}
            src={image}
            alt="Image preview"
            key={image}
          ></Image>
        );
      })}
    </Box>
  );
};

export default ImagePreview;
