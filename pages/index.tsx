import type { NextPage } from "next";

import { MainLayout } from "../components/layouts/mainLayout";
import { Categories } from "../components/ui/categories";
import { ProductList } from "../components/product/productList";

const list = [
  {
    title: "Test Product",
    price: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1665219242102-06b259f21517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  },
];

const Home: NextPage = () => {
  return (
    <MainLayout title="STDF commerce" description="AI generated product store">
      <Categories />
      <ProductList productList={list} />
    </MainLayout>
  );
};

export default Home;
