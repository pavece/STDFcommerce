import type { NextPage } from "next";
import { MainLayout } from "../components/layouts/mainLayout";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

const Home: NextPage = () => {
  return (
    <MainLayout title="STDF commerce" description="AI generated product store">
      <Typography variant="h1" color="secondary">
        Hello stdf commerce
      </Typography>
    </MainLayout>
  );
};

export default Home;
