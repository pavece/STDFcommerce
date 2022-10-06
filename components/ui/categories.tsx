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
      <Category href="/cat1">Cat 1</Category>
      <Category href="/cat2">Cat 2</Category>
      <Category href="/cat3">Cat 3</Category>
    </Container>
  );
};
