import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";

const success = () => {
  return (
    <MainLayout
      title="Order Paid"
      description="Order paid correctly"
      showSearchBar={false}
    >
      <h1>
        Congratulations, the order has been paid and is now being processed
      </h1>
    </MainLayout>
  );
};

export default success;
