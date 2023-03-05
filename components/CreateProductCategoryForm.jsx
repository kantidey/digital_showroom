import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useLocalStorage } from "@rehooks/local-storage";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
export default function CreateNoticeForm() {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState();
  const [categoryNameError, setCategoryNameError] = React.useState();
    const [userInfo] = useLocalStorage("userInfo");

  const router = useRouter();
  //create product category function
  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.post(
      `/api/product/category/create`,
      {
        categoryName,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Product category created successfully") {
      router.push("/dashboard/product/category");
      Swal.fire("Success", data, "success").then((result) => {
        if (result.isConfirmed) {
          router.reload(window.location.reload);
        }
      });
    } else {
      Swal.fire("Error", data, "error");
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Product Category"
          type="text"
          placeholder="Choice product category name"
          size="small"
          required
          fullWidth
          color="yallo"
          error={categoryNameError && categoryNameError}
          helperText={categoryNameError && categoryNameError}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.match(/^[ A-Za-z0-9-]*$/)) {
              setCategoryNameError();
              setCategoryName(e.target.value);
            } else {
              setCategoryName();
              setCategoryNameError(
                "Product category should be alphanumeric characters with -"
              );
            }
          }}
        />

        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/product/category")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={categoryName ? false : true}
            variant="contained"
            color="yallo"
            size="small"
          >
            Create Category
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
