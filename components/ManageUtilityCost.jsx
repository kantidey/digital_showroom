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

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageGroup({ data }) {
  const [open, setOpen] = React.useState(false);
  const [utilityCost, setUtilityCost] = React.useState(data);
  const router = useRouter();
  async function recordFilteringFun(costTitle) {
    if (costTitle == "") {
      setUtilityCost(data);
    } else {
      setUtilityCost(data.filter((item) => item.costTitle == costTitle));
    }
  }

  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this utility cost`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/utilityCost/delete?id=${id}`);
        setOpen(false);
        if (data == "Utility cost deleted successfully") {
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
      { field: "costTitle", headerName: "Cost Title", width: "200" },
      {
        field: "amount",
        headerName: "Amount",
        width: "200",
        renderCell: (params) => `${params.row.amount} $`,
      },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
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
                    `/dashboard/utility-cost/update?id=${params.row.id}&costTitle=${params.row.costTitle}&amount=${params.row.amount}`
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
    [utilityCost]
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
          placeholder="Filter by group name"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "150px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/utility-cost/create")}
        >
          Add Utility
        </Button>
      </Stack>
      <ShowDataGrid rows={utilityCost} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
