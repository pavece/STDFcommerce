import React, { FC } from "react";
import { Button, Typography } from "@mui/material";

import { grey } from "@mui/material/colors";

interface Props {
  imageUrl: string;
  title: string;
  price: number;
}

export const ProductCard: FC<Props> = ({ imageUrl, title, price }) => {
  return (
    <div
      style={{
        maxWidth: "500px",
        height: "auto",
        width: "100%",
        borderRadius: "20px",
        padding: "2vh 1vw",
        boxShadow: "2px 3px 4px 2px #0404040d",
        margin: "0 auto",
        backgroundColor: grey[200],
      }}
    >
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "300px",
          borderRadius: "10px",
          margin: "0 0 20px 0",
        }}
      ></div>
      <div>
        <Typography
          variant="h6"
          fontSize={18}
          color="secondary"
          fontWeight={400}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          fontSize={18}
          color="secondary"
          fontWeight={200}
          sx={{
            mt: "5px",
          }}
        >
          ${price}
        </Typography>

        <Button
          sx={{
            mt: "20px",
          }}
        >
          View more
        </Button>
      </div>
    </div>
  );
};
