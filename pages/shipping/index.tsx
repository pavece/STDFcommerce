import { SubmitHandler, useForm } from "react-hook-form";

import { MainLayout } from "../../components/layouts/mainLayout";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { stdfApi } from "../../api/stdfApi";
import {
  CartContext,
  IShippingAddress,
} from "../../context/cartContext/cartContext";

type inputs = {
  name: string;
  surname: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
};

const ShippingDetails = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (cartContext.cart.length <= 0) {
      router.replace("/shipping/empty");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<inputs>({ defaultValues: cartContext.address });

  useEffect(() => {
    reset(cartContext.address);
  }, [cartContext.address, reset]);

  const onSubmit: SubmitHandler<inputs> = async (formData) => {
    cartContext.updateUserAddress(formData as IShippingAddress);

    try {
      const { data } = await stdfApi.post("/api/orders/checkout", {
        address: formData,
        products: cartContext.cart,
      });
      router.push("/checkout/" + data.orderId);
      cartContext.deleteAllCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout
      title="Shipping details"
      description="Fill in the shipping details"
      showSearchBar={false}
    >
      <Typography variant="h1" component="h1" fontSize={30}>
        Review Shipping Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} sx={{ mt: "20px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="outlined"
              label="Name"
              fullWidth
              sx={{ mb: "20px" }}
              {...register("name", {
                required: "The name is required",
                maxLength: 30,
              })}
              error={errors.name !== undefined}
              helperText={errors.name && errors.name.message}
            >
              Your name
            </TextField>
            <TextField
              type="outlined"
              label="Surname"
              fullWidth
              sx={{ mb: "20px" }}
              {...register("surname", {
                required: "The surname is required",
                maxLength: 30,
              })}
              error={errors.surname !== undefined}
              helperText={errors.surname && errors.surname.message}
            >
              Your surname
            </TextField>
            <TextField
              type="outlined"
              label="Address Line 1"
              fullWidth
              sx={{ mb: "20px" }}
              {...register("addressLine1", {
                required: "The address is required",
              })}
              error={errors.addressLine1 !== undefined}
              helperText={errors.addressLine1 && errors.addressLine1.message}
            >
              Address line 1
            </TextField>
            <TextField
              type="outlined"
              label="Address Line 2 (optional)"
              fullWidth
              sx={{ mb: "20px" }}
              {...register("addressLine2", {
                maxLength: 30,
              })}
              error={errors.addressLine2 !== undefined}
              helperText={errors.addressLine2 && errors.addressLine2.message}
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
              {...register("country", { required: "The country is required" })}
              error={errors.country !== undefined}
              helperText={errors.country && errors.country.message}
            >
              Your country
            </TextField>
            <TextField
              type="outlined"
              label="City"
              fullWidth
              sx={{ mb: "20px" }}
              {...register("city", { required: "The city is required" })}
              error={errors.city !== undefined}
              helperText={errors.city && errors.city.message}
            >
              Your city
            </TextField>
            <TextField
              type="outlined"
              label="Zip code"
              fullWidth
              sx={{ mb: "20px" }}
              {...register("zipCode", { required: "The Zip Code is required" })}
              error={errors.zipCode !== undefined}
              helperText={errors.zipCode && errors.zipCode.message}
            >
              Your Zip code
            </TextField>
            <TextField
              type="outlined"
              label="Phone"
              fullWidth
              sx={{ mb: "20px" }}
              {...register("phoneNumber", {
                required: "The phone number is required",
              })}
              error={errors.phoneNumber !== undefined}
              helperText={errors.phoneNumber && errors.phoneNumber.message}
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
            type="submit"
            sx={{
              margin: "30px auto",
            }}
          >
            Proceed to checkout
          </Button>
        </Container>
      </form>
    </MainLayout>
  );
};

export default ShippingDetails;
