import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
export default function ManageInstalment({ data }) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState(data);
  const router = useRouter();
  async function recordFilteringFun(code) {
    if (code == "") {
      setProduct(code);
    } else {
      setProduct(data.filter((item) => item.code == code));
    }
  }
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this product`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/product/delete?id=${id}`);
        setOpen(false);
        if (data == "Prouct deleted successfully") {
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
  //create columns for data grid
  const columns = React.useMemo(
    () => [
      {
        field: "photo",
        headerName: "Photo",
        width: "100",
        renderCell: (params) => (
          <Avatar
            alt=""
            src={params.row.photo}
            sx={{ width: 45, height: 45 }}
          />
        ),
      },
      { field: "productName", headerName: "Name", width: "250" },
      { field: "code", headerName: "Code", width: "100" },
      { field: "brand", headerName: "Brand", width: "100" },
      {
        field: "price",
        headerName: "Price",
        width: "100",
        renderCell: (params) => `${params.row.price} $`,
      },
      { field: "categoryName", headerName: "Category", width: "100" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "100",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },
      {
        field: "id",
        headerName: "Action",
        width: "200",
        renderCell: (params) => {
          return (
            <ButtonGroup>
              <IconButton
                variant="contained"
                color="secondary"
                onClick={() =>
                  router.push(
                    `/dashboard/product/update?id=${params.row.id}&productName=${params.row.productName}&code=${params.row.code}&brand=${params.row.brand}&categoryName=${params.row.categoryName}&price=${params.row.price}&photo=${params.row.photo}`
                  )
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="contained"
                color="error"
                onClick={() => recordDeletingFun(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
    ],
    [product]
  );

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
          placeholder="Filter by product code"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "200px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/product/create")}
        >
          Add New Product
        </Button>
      </Stack>
      <ShowDataGrid rows={product} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
