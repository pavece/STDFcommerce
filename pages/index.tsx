import type { NextPage } from "next";

import { MainLayout } from "../components/layouts/mainLayout";
import { Categories } from "../components/ui/categories";
import { ProductList } from "../components/product/productList";
import { testProducts } from "../testProducts";

const Home: NextPage = () => {
  return (
    <MainLayout
      title="STDF commerce"
      description="AI generated product store"
      showSearchBar={true}
    >
      <Categories />
      <ProductList productList={testProducts} />
    </MainLayout>
  );
};

export default Home;
