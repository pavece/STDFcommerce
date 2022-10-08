import { FC } from "react";
import { Container } from "@mui/system";
import { Typography, Button } from "@mui/material";

interface Props {
  title: string;
  price: number;
  description: string;
  available: boolean;
}

const ProductInfo: FC<Props> = ({ title, price, description, available }) => {
  return (
    <Container>
      <Typography variant="h1" component="h1" fontSize={45}>
        {title}
      </Typography>
      <Typography
        variant="h2"
        component="h2"
        fontSize={35}
        sx={{ mb: "30px", mt: "20px" }}
      >
        ${price}
      </Typography>
      {/* counter */}
      <Button fullWidth sx={{ mb: "30px", }}>
        {available ? "Add to cart" : "Not available"}
      </Button>
      <Typography variant="h5" component="h5">
        Description
      </Typography>
      <Typography component="p">{description}</Typography>
    </Container>
  );
};

export default ProductInfo;
