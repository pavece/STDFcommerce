import {
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Button,
  Alert,
} from "@mui/material";
import React from "react";
import { MainLayout } from "../../../components/layouts/mainLayout";
import { useForm, Controller } from "react-hook-form";
import { stdfApi } from "../../../api/stdfApi";
import { useState } from "react";
import axios from "axios";
import ImagePreview from "../../../components/ui/imagePreview";
import Snackbar from "@mui/material/Snackbar";

interface IFromData {
  title: string;
  price: number;
  description: string;
  category: string;
}

const NewProduct = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<any>("success");

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFromData>();

  const onSubmit = async (formData: IFromData) => {
    try {
      const { data } = await stdfApi.post("/api/admin/products/create", {
        product: formData,
        images,
      });
      setSnackBarMessage(data.status);
      setSnackBarSeverity("success");
      setIsSnackBarOpen(true);
    } catch (error) {
      setSnackBarMessage("Something went wrong");
      setSnackBarSeverity("success");
      setIsSnackBarOpen(true);
      console.log(error);
    }
  };

  const onImageChange = async (e: any) => {
    if (!e.target.files) {
      return;
    } else {
      try {
        setIsUploading(true);
        for (const file of e.target.files) {
          const formData = new FormData();
          formData.append("file", file);

          const { data } = await axios.post(
            "/api/admin/products/upload",
            formData
          );
          images.push(data.image);
          setImages(images);
        }
        setIsUploading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MainLayout
      title="Create product"
      description="Create new products"
      showSearchBar={false}
    >
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        onClose={() => {
          setIsSnackBarOpen(false);
        }}
      >
        <Alert severity={snackBarSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
      <Typography variant="h4" component="h1">
        Create product
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              placeholder="Product title"
              label="Title"
              sx={{ mt: "10px", mb: "10px" }}
              fullWidth
              {...register("title", { required: "Product title is required" })}
              error={!!errors.title}
              helperText={errors.title && errors.title.message}
            ></TextField>
            <TextField
              type="number"
              placeholder="Product price"
              label="Price no tax"
              sx={{ mt: "10px", mb: "10px" }}
              fullWidth
              {...register("price", { required: "Product price is required" })}
              error={!!errors.price}
              helperText={errors.price && errors.price.message}
            ></TextField>
            <TextField
              type="text"
              placeholder="Product description"
              label="Description"
              sx={{ mt: "10px", mb: "10px" }}
              fullWidth
              {...register("description", {
                required: "Product description is required",
              })}
              error={!!errors.description}
              helperText={errors.description && errors.description.message}
            ></TextField>
            <Controller
              name="category"
              control={control}
              defaultValue="tools"
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    fullWidth
                    sx={{ mt: "10px", mb: "30px" }}
                    error={!!errors.category}
                  >
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="tools">Tools</MenuItem>
                  </Select>
                );
              }}
            ></Controller>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ImagePreview images={images}></ImagePreview>
            <label
              htmlFor="file-upload"
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid grey",
                width: "100%",
              }}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/png, image/gif, image/jpg"
                style={{ display: "none" }}
                onChange={(e) => {
                  onImageChange(e);
                }}
              ></input>
              Upload images
            </label>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            mt: "30px",
          }}
        >
          <Button type="submit" disabled={!!isUploading}>
            {isUploading ? "Loading" : "Save product"}
          </Button>
        </Box>
      </form>
    </MainLayout>
  );
};

export default NewProduct;
