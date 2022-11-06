import React from "react";
import { GetServerSideProps } from "next";
import { getAllProducts } from "../../../db/functions/getAllProducts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MainLayout } from "../../../components/layouts/mainLayout";
import { Typography, Button } from "@mui/material";
import IProduct from "../../../interfaces/product";
import Link from "next/link";
import Image from "next/image";

const ProductsPage = ({ products }: { products: IProduct[] }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "image",
      headerName: "First image",
      width: 100,
      renderCell: (params) => {
        return (
          <Image
            src={params.row.image}
            alt={params.row.title}
            width={100}
            height={100}
          ></Image>
        );
      },
    },
    { field: "title", headerName: "Title" },
    { field: "price", headerName: "Price" },
    { field: "category", headerName: "Category" },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <Link href={`/admin/products/edit/${params.row.id}`}>
            <Button>Edit</Button>
          </Link>
        );
      },
    },
  ];

  const rows = products.map((product: IProduct) => {
    return {
      id: product._id,
      image: product.images[0],
      title: product.title,
      price: product.price,
      category: product.category,
    };
  });

  return (
    <MainLayout
      title="Products"
      description="View products"
      showSearchBar={false}
    >
      <Typography variant="h4" component="h1">
        Products
      </Typography>
      <div style={{ height: "70vh", minHeight: "400px", marginTop: "20px" }}>
        <DataGrid columns={columns} rows={rows}></DataGrid>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const products = await getAllProducts();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
export default ProductsPage;
