import { Alert, Button, Divider, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { grey } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";

type inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>();

  const onSubmit: SubmitHandler<inputs> = async (data) => {
    const login = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (login?.ok) {
      router.replace("/");
    } else {
      console.log(login?.error);
      setAuthError("Password or email incorrect");
      setSnackOpen(true);

      //TODO: Show error in the UI
    }
  };

  const [providers, setProviders] = useState<any>([]);

  const redirectIfSession = async () => {
    const session = await getSession();
    if (session) {
      router.replace("/");
    }
  };

  useEffect(() => {
    redirectIfSession();
    getProviders().then((provider) => setProviders(provider));
  }, []);

  return (
    <MainLayout
      title="STDF - Login"
      description="Log in to your account"
      showSearchBar={false}
    >
      <Container
        sx={{
          borderRadius: "10px",
          backgroundColor: grey[100],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "30px 30px",
          maxWidth: { xs: "400px", sm: "400px" },
        }}
      >
        <Typography variant="h4" component="h4">
          Log - In / Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            margin="normal"
            type="email"
            {...register("email", {
              required: "The e mail is required",
            })}
            error={errors.email !== undefined}
            helperText={errors.email && errors.email.message}
          ></TextField>
          <TextField
            fullWidth
            placeholder="Password"
            variant="outlined"
            type="password"
            margin="normal"
            {...register("password", {
              required: "The password is required",
              minLength: 5,
            })}
            error={errors.password !== undefined}
            helperText={errors.password && errors.password.message}
          ></TextField>
          <Button fullWidth sx={{ mt: "20px" }} type="submit">
            Log In
          </Button>
        </form>
        <Divider sx={{ mt: "15px", mb: "15px" }}>
          <Typography>Or with</Typography>
        </Divider>

        {Object.values(providers).map((provider: any) => {
          if (provider.type === "oauth") {
            return (
              <Button
                key={provider.id}
                fullWidth
                onClick={() => {
                  signIn(provider.id, { redirect: true, callbackUrl: "/" });
                }}
              >
                {provider.name}
              </Button>
            );
          }
        })}
      </Container>
      <Snackbar
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={5000}
      >
        <Alert severity="error">{authError}</Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default Login;
