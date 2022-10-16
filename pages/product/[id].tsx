import React from "react";
import { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import { MainLayout } from "../../components/layouts/mainLayout";
import { Grid } from "@mui/material";
import { ProductImages } from "../../components/product/productImages";
import IProduct from "../../interfaces/product";
import ProductInfo from "../../components/product/productInfo";

const ProductPage = ({ product }: { product: IProduct }) => {
  return (
    <MainLayout
      title="Product title"
      description="Product description"
      showSearchBar={false}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <ProductImages images={product.images} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProductInfo
            title={product.title}
            description={product.description}
            price={product.price}
            available={product.available}
            product={product}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //TODO: Implement endpoint in order to get all the product IDS
  return {
    paths: [
      {
        params: { id: "test_product" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const product: IProduct = {
    images: [
      "https://images.unsplash.com/photo-1665219242102-06b259f21517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1665219242102-06b259f21517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    ],
    title: "Test Product",
    price: 10,
    description: "test description",
    slug: "test_product",
    available: true,
    category: "furniture",
  };

  return {
    props: { product },
  };
};

export default ProductPage;
