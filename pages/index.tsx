import type { NextPage } from "next";
import { MainLayout } from "../components/layouts/mainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout title="STDF commerce" description="AI generated product store">
      <h1>Hello stdf commerce</h1>
    </MainLayout>
  );
};

export default Home;
