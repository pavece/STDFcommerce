import { Container } from "@mui/system";
import React from "react";
import { Category } from "./category";

export const Categories = () => {
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Category href="/category/tools">Tools</Category>
      <Category href="/category/furniture">Furniture</Category>
      <Category href="/category/technology">Technology</Category>
    </Container>
  );
};
