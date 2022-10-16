import React from "react";
import { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import { MainLayout } from "../../components/layouts/mainLayout";
import { Grid } from "@mui/material";
import { ProductImages } from "../../components/product/productImages";
import IProduct from "../../interfaces/product";
import ProductInfo from "../../components/product/productInfo";
import { getSlugs } from "../../db/functions/getSlugs";
import { getProductBySlug } from "../../db/functions/getProductBySlug";

const ProductPage = ({ product }: { product: IProduct }) => {
  return (
    <MainLayout
      title={product.title}
      description={product.description}
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
  const slugs = await getSlugs();

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug.slug.toString(),
        },
      };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { product: product[0] },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
