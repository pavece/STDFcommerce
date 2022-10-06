import type { NextPage } from "next";
import { MainLayout } from "../components/layouts/mainLayout";
import { Typography } from "@mui/material";
import { Categories } from "../components/ui/categories";

const Home: NextPage = () => {
  return (
    <MainLayout title="STDF commerce" description="AI generated product store">
      <Categories></Categories>
    </MainLayout>
  );
};

export default Home;
