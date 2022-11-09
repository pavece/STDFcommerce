import React, { FC } from "react";
import { Button, Typography } from "@mui/material";

import { grey } from "@mui/material/colors";
import Link from "next/link";

interface Props {
  imageUrl: string;
  title: string;
  price: number;
  slug: string;
}

export const ProductCard: FC<Props> = ({ imageUrl, title, price, slug }) => {
  return (
    <div
      style={{
        maxWidth: "500px",
        height: "auto",
        width: "100%",
        borderRadius: "20px",
        padding: "20px 20px",
        margin: "0 auto",
        backgroundColor: grey[100],
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
        <Typography variant="h6" fontSize={18} color="primary" fontWeight={400}>
          {title}
        </Typography>
        <Typography
          variant="h6"
          fontSize={18}
          color="primary"
          fontWeight={200}
          sx={{
            mt: "5px",
          }}
        >
          ${price}
        </Typography>

        <Link href={`/product/${slug}`}>
          <Button
            sx={{
              mt: "20px",
            }}
          >
            View more
          </Button>
        </Link>
      </div>
    </div>
  );
};
