import React from "react";
import { Container, Typography, Box, Button, Chip, Alert } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, useState } from "react";
import Link from "next/link";
import { stdfApi } from "../../api/stdfApi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import { AxiosError } from "axios";

interface Props {
  isPaid: boolean;
  totalPrice: number;
  shippingStatus: string;
  orderId: string;
}

export const OrderDetailsSummary: FC<Props> = ({
  isPaid,
  totalPrice,
  shippingStatus,
  orderId,
}) => {
  const [snackBarOpen, setSnackbarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<any>("success");
  const router = useRouter();

  const deleteOrder = async (id: string) => {
    try {
      const { data } = await stdfApi.delete(`/api/orders/delete/${id}`);
      setSnackBarMessage(data.status);
      setSnackBarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch (error: any) {
      setSnackBarMessage(error.response.data.status);
      setSnackBarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: grey[100],
        borderRadius: "20px",
        padding: "20px 20px",
      }}
    >
      <Typography component="h1" variant="h1" fontSize={30}>
        Order Summary
      </Typography>
      <Box sx={{ mb: "20px", mt: "20px" }}>
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              setSnackbarOpen(false);
            }}
            severity={snackBarSeverity}
            sx={{ width: "100%" }}
          >
            {snackBarMessage}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px 10px 0",
          }}
        >
          <Typography component="h3" variant="h3" fontSize={18}>
            Shipping status:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {shippingStatus}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px 10px 0",
          }}
        >
          <Typography component="h3" variant="h3" fontSize={18}>
            Order price (includes tax):
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {totalPrice}$
          </Typography>
        </Box>
      </Box>
      {isPaid ? (
        <Chip
          label="Order is paid!"
          color="success"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      ) : (
        <>
          <Button
            sx={{
              backgroundColor: "#f44336",
              mb: "10px",
              "&:hover": {
                background: "#f44336ba",
              },
            }}
            fullWidth
            onClick={() => {
              deleteOrder(orderId);
            }}
          >
            <DeleteRoundedIcon sx={{ mr: "10px" }} />
            Delete order
          </Button>
          <Link href={`/checkout/${orderId}`}>
            <Button fullWidth>
              <PaymentRoundedIcon sx={{ mr: "10px" }} />
              Pay order
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
};
