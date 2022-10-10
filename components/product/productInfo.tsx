import { FC, useContext } from "react";
import { Container } from "@mui/system";
import { Typography, Button } from "@mui/material";
import { Counter } from "../ui/counter";
import { CartContext } from "../../context/cartContext/cartContext";
import IProduct from "../../interfaces/product";

interface Props {
  title: string;
  price: number;
  description: string;
  available: boolean;
  product: IProduct;
}

const ProductInfo: FC<Props> = ({
  title,
  price,
  description,
  available,
  product,
}) => {
  const cart = useContext(CartContext);
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
      <Counter
        initialValue={1}
        maxValue={10}
        getValue={(value) => console.log(value)}
      ></Counter>
      <Button
        fullWidth
        sx={{ mb: "30px" }}
        onClick={() => {
          cart.addProductToCart(product);
        }}
      >
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
