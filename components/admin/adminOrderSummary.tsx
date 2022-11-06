import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { MenuItem, Select, Typography, Alert } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IOrder } from "../../interfaces/orderInterface";
import { stdfApi } from "../../api/stdfApi";
import Snackbar from "@mui/material/Snackbar";

const AdminOrderSummary = ({ order }: { order: IOrder }) => {
  const [statusValue, setStatusValue] = useState(order.orderShippingStatus);
  const [alertSeverity, setAlertSeverity] = useState<any>("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const updateOrderStatus = async (e: any) => {
    setStatusValue(e.target.value);

    try {
      const { data } = await stdfApi.put("/api/admin/orders/status", {
        orderId: order._id,
        status: e.target.value,
      });
      setAlertMessage(data.status);
      setAlertSeverity("success");
      setAlertVisible(true);
    } catch (error: any) {
      setAlertMessage(error.response.data.status);
      setAlertSeverity("error");
      setAlertVisible(true);
      console.log(error);
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
      <Snackbar
        open={alertVisible}
        autoHideDuration={3000}
        onClose={() => {
          setAlertVisible(false);
        }}
      >
        <Alert severity={alertSeverity}>{alertMessage}</Alert>
      </Snackbar>
      <Typography variant="h4" component="h4">
        Summary
      </Typography>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px 10px 0",
          }}
        >
          <Typography component="h3" variant="h3" fontSize={18}>
            Shipping address:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {order.orderAuthorAddress.address}
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
            Name:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {order.orderAuthorAddress.fullName}
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
            Phone:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {order.orderAuthorAddress.phone}
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
            Zip code:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {order.orderAuthorAddress.zipCode}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px 10px 0",
            mt: "10px",
          }}
        >
          <Typography component="h3" variant="h3" fontSize={18}>
            Status:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            <Select
              value={statusValue}
              label="Status"
              onChange={(e) => {
                updateOrderStatus(e);
              }}
            >
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Packaging">Packaging</MenuItem>
              <MenuItem value="In the truck">In the truck</MenuItem>
              <MenuItem value="In your city">In your city</MenuItem>
            </Select>
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px 10px 0",
          }}
        >
          <Typography component="h3" variant="h3" fontSize={18}>
            Price (includes TAX):
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {order.orderTaxedPrice}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminOrderSummary;
