import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { MainLayout } from "../../components/layouts/mainLayout";
import { ProductList } from "../../components/product/productList";
import { Categories } from "../../components/ui/categories";
import { getProductsByCategory } from "../../db/functions/getProductsByCategory";
import IProduct from "../../interfaces/product";

const CategoryPage = ({
  catName,
  products,
}: {
  catName: string;
  products: IProduct[];
}) => {
  return (
    <MainLayout
      title={catName}
      description="Browse products by category"
      showSearchBar={true}
    >
      <Categories />
      <ProductList productList={products}></ProductList>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [
      {
        params: {
          category: "technology",
        },
      },
      {
        params: {
          category: "tools",
        },
      },
      {
        params: {
          category: "furniture",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category = "" } = params as { category: string };

  const products = await getProductsByCategory(category);

  return {
    props: {
      catName: category,
      products,
    },
  };
};

export default CategoryPage;
