import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";

const ShippingDetails = () => {
  return (
    <MainLayout
      title="Shipping details"
      description="Fill in the shipping details"
      showSearchBar={false}
    >
      <Typography variant="h1" component="h1" fontSize={30}>
        Shipping Details
      </Typography>
      <Grid container spacing={5} sx={{ mt: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TextField type="outlined" label="Name" fullWidth sx={{ mb: "20px" }}>
            Your name
          </TextField>
          <TextField
            type="outlined"
            label="Surname"
            fullWidth
            sx={{ mb: "20px" }}
          >
            Your surname
          </TextField>
          <TextField
            type="outlined"
            label="Address Line 1"
            fullWidth
            sx={{ mb: "20px" }}
          >
            Address line 1
          </TextField>
          <TextField
            type="outlined"
            label="Address Line 2 (optional)"
            fullWidth
            sx={{ mb: "20px" }}
          >
            Address line 2 (optional)
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="outlined"
            label="Country"
            fullWidth
            sx={{ mb: "20px" }}
          >
            Your country
          </TextField>
          <TextField type="outlined" label="City" fullWidth sx={{ mb: "20px" }}>
            Your city
          </TextField>
          <TextField
            type="outlined"
            label="Zip code"
            fullWidth
            sx={{ mb: "20px" }}
          >
            Your Zip code
          </TextField>
          <TextField
            type="outlined"
            label="Phone"
            fullWidth
            sx={{ mb: "20px" }}
          >
            Your phone with regional ID
          </TextField>
        </Grid>
      </Grid>

      <Container
        sx={{
          width: { xs: "80vw", sm: "40vw" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          fullWidth
          sx={{
            margin: "30px auto",
          }}
        >
          Proceed to payment
        </Button>
      </Container>
    </MainLayout>
  );
};

export default ShippingDetails;
