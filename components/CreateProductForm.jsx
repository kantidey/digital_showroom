import {
  Button,
  Stack,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Autocomplete,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useLocalStorage } from "@rehooks/local-storage";
import { useForm } from "react-hook-form";
import { prouctFormValidation } from "../utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export default function CreateStudentForm({ data }) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState();
      const [userInfo] = useLocalStorage("userInfo");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand: "others",
    },
    resolver: yupResolver(prouctFormValidation),
  });
  //add new student
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this product",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setOpen(true);
          data.photo = photo;
          const apiRes = await axios.post(`/api/product/create`, data, {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          });
          setOpen(false);
          if (apiRes.data == "Product saved successfully") {
            router.push("/dashboard/product");
            Swal.fire("Success", apiRes.data, "success").then((result) => {
              router.reload(window.location.reload);
            });
          } else if (
            apiRes.data ==
            "Sorry, this product's code alresdy exists. Please choice another code"
          ) {
            Swal.fire("Failed", apiRes.data, "warning");
          } else {
            Swal.fire("Failed", apiRes.data, "error");
          }
        } catch (error) {
          Swal.fire("Warning", apiRes.data, "warning");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Stack spacing={1} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <Autocomplete
            size="small"
            fullWidth
            options={data.map((option) => option.categoryName)}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                color="yallo"
                label="Select category"
                {...register("categoryName")}
                error={!!errors?.categoryName}
                helperText={
                  errors?.categoryName ? errors.categoryName.message : null
                }
              />
            )}
          />

          <TextField
            label="Product's Code"
            type="text"
            fullWidth
            required
            placeholder="Choice product's code"
            size="small"
            color="yallo"
            {...register("code")}
            error={!!errors?.code}
            helperText={errors?.code ? errors.code.message : null}
          />
        </Stack>
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Product's Name"
            type="text"
            fullWidth
            required
            placeholder="Enter product name"
            size="small"
            color="yallo"
            {...register("productName")}
            error={!!errors?.productName}
            helperText={errors?.productName ? errors.productName.message : null}
          />
          <TextField
            label="Prouct's Brand"
            type="text"
            fullWidth
            required
            placeholder="Enter prouct brand"
            size="small"
            color="yallo"
            {...register("brand")}
            error={!!errors?.brand}
            helperText={errors?.brand ? errors.brand.message : null}
          />
        </Stack>

        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Price"
            type="number"
            fullWidth
            required
            placeholder="Enter product price"
            size="small"
            color="yallo"
            {...register("price")}
            error={!!errors?.price}
            helperText={errors?.price ? errors.price.message : null}
          />
        </Stack>

        <Avatar alt="Check avater" src={photo} sx={{ width: 80, height: 80 }} />
        <Typography>Select product photo</Typography>
        <FileBase64 onDone={(data) => setPhoto(data.base64)} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/product")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={photo ? false : true}
            variant="contained"
            color="yallo"
            size="small"
          >
            Save Product
          </Button>
        </div>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
