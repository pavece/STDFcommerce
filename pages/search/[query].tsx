import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { useRouter } from "next/router";
import { stdfApi } from "../../api/stdfApi";
import { ProductList } from "../../components/product/productList";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const SearchPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await stdfApi.get(
          `api/search/${router.query.query?.toString()}`
        );
        if (data.products.length == 0) {
          router.replace("/search/empty");
        }
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router.query, router]);

  return (
    <MainLayout
      title={router.query.query?.toString() || "Stdf - search"}
      description="Search"
      showSearchBar={true}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress sx={{ marginRight: "30px" }} />
          <Typography variant="h2" component="h2">
            Loading
          </Typography>
        </Box>
      ) : (
        <ProductList productList={products}></ProductList>
      )}
    </MainLayout>
  );
};

export default SearchPage;
