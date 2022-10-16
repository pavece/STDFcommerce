import type { NextPage } from "next";

import { MainLayout } from "../components/layouts/mainLayout";
import { Categories } from "../components/ui/categories";
import { ProductList } from "../components/product/productList";
import { testProducts } from "../testProducts";
import { GetStaticProps } from "next";
import axios from "axios";
import IProduct from "../interfaces/product";
import { connect, disconnect } from "../db/db";
import { Product } from "../models/productModel";
import { getAllProducts } from "../db/functions/getAllProducts";

interface Props {
  products: IProduct[];
}

const Home: NextPage<Props> = ({ products }) => {
  return (
    <MainLayout
      title="STDF commerce"
      description="AI generated product store"
      showSearchBar={true}
    >
      <Categories />
      <ProductList productList={products} />
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const products = await getAllProducts();
    return {
      props: {
        products,
      },
      revalidate: 60 * 60 * 24, //revalidate every 24 hrs,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        products: [],
      },
      revalidate: 60 * 60 * 24, //revalidate every 24 hrs,
    };
  }
};

export default Home;
