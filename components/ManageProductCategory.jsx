import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageProductCategory({ data }) {
  const [productCategory, setProductCategory] = React.useState(data);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  async function recordFilteringFun(categoryName) {
    if (categoryName == " ") {
      setProductCategory(data);
    } else {
      setProductCategory(
        data.filter((item) => item.categoryName == categoryName)
      );
    }
  }

  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "categoryName", headerName: "Category Name", width: "200" },
      {
        field: "id",
        headerName: "Action",
        width: "200",
        renderCell: (params) => {
          return (
            <IconButton
              variant="contained"
              color="error"
              onClick={() => recordDeletingFun(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ],
    [productCategory]
  );
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this category`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(
          `/api/product/category/delete?id=${id}`
        );
        setOpen(false);
        if (data == "Product category deleted successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  }
  return (
    <React.Fragment>
      <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={1}>
        <TextField
          label="Filter..."
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          color="yallo"
          placeholder="Filter by category name"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "200px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/product/category/create")}
        >
          Create Category
        </Button>
      </Stack>
      <ShowDataGrid rows={productCategory} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
