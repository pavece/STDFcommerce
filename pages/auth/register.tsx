import { Button, Divider, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { grey } from "@mui/material/colors";

const Register = () => {
  return (
    <MainLayout
      title="STDF - Login"
      description="Log in to your account"
      showSearchBar={false}
    >
      <Container
        sx={{
          borderRadius: "10px",
          backgroundColor: grey[300],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "30px 30px",
          maxWidth: { xs: "400px", sm: "400px" },
        }}
      >
        <Typography variant="h2" component="h2">
          Register
        </Typography>
        <TextField
          fullWidth
          placeholder="Email"
          variant="outlined"
          margin="normal"
          type="email"
        ></TextField>
        <TextField
          fullWidth
          placeholder="Password"
          variant="outlined"
          type="password"
          margin="normal"
        ></TextField>
        <Button fullWidth sx={{ mt: "20px" }}>
          Log In
        </Button>
        <Divider sx={{ mt: "15px", mb: "15px" }}>
          <Typography>Or with</Typography>
        </Divider>
        Social logins
      </Container>
    </MainLayout>
  );
};

export default Register;
