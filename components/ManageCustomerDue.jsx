import * as React from "react";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Payment from "@mui/icons-material/Payment";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
import { Backdrop, CircularProgress } from "@mui/material";
export default function ManageInstalment({ data }) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState(data);
  const router = useRouter();
  async function recordFilteringFun(phone) {
    if (phone == "") {
      setCustomer(data);
    } else {
      setCustomer(data.filter((item) => item.customerPhone == phone));
    }
  }
  //record deleting function
  async function recordDeletingFun(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this customer's due`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(`/api/customerDue/delete?id=${id}`);
        setOpen(false);
        if (data == "Customer's due deleted successfully") {
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
      { field: "customerName", headerName: "Customer's Name", width: "200" },
      { field: "customerPhone", headerName: "Phone", width: "200" },
      {
        field: "amount",
        headerName: "Amount",
        width: "100",
        renderCell: (params) => `${params.row.amount} $`,
      },
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
                  payment(
                    params.row.id,
                    params.row.customerName,
                    params.row.customerPhone,
                    params.row.amount
                  )
                }
              >
                <Payment />
              </IconButton>
              <IconButton
                variant="contained"
                color="secondary"
                onClick={() =>
                  router.push(
                    `/dashboard/customer-due/update?id=${params.row.id}&customerName=${params.row.customerName}&customerPhone=${params.row.customerPhone}&amount=${params.row.amount}`
                  )
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="contained"
                color="secondary"
                onClick={() =>
                  router.push(
                    `/dashboard/customer-due/pdf?id=${
                      params.row.id
                    }&customerName=${params.row.customerName}&customerPhone=${
                      params.row.customerPhone
                    }&amount=${params.row.amount}&date=${moment(
                      params.row.createdAt
                    ).format("YY-MM-DD")}`
                  )
                }
              >
                <PictureAsPdf />
              </IconButton>{" "}
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
    [customer]
  );
  // payment function
  function payment(id, name, phone, amount) {
    Swal.fire({
      title: "Customer's Payment",
      input: "number",
      inputAttributes: {
        placeholder: "Enter amount",
      },
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      allowOutsideClick: false,
      html: `<p><strong>Name: </strong>${name}</p><p><strong>Phone: </strong>${phone}</p><p><strong>Amount: </strong>${amount}</p>`,
      preConfirm: async (amount) => {
        const { data } = await axios.put(
          `/api/customerDue/pay?id=${id}&amount=${amount}`
        );
        if (data == "Payment saved successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.reload);
            }
          });
        } else {
          Swal.showValidationMessage(`Request failed: ${data}`);
        }
      },
    });
  }
  return (
    <React.Fragment>
      <TextField
        label="Filter..."
        variant="outlined"
        type="search"
        size="small"
        fullWidth
        color="yallo"
        placeholder="Filter by phone"
        onChange={(e) => recordFilteringFun(e.target.value)}
      />

      <ShowDataGrid rows={customer} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
