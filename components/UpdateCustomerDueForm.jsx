import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";

import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
export default function CreateServicesForm({ data }) {
  const [open, setOpen] = useState(false);
  const [id] = useState(data.id);
  const [customerName, setCustomerName] = useState(data.customerName);
  const [customerPhone, setCustomerPhone] = useState(data.customerPhone);
      const [userInfo] = useLocalStorage("userInfo");

  const router = useRouter();
  const handelSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setOpen(true);
    const { data } = await axios.put(
      `/api/customerDue/update`,
      {
        id,
        customerName,
        customerPhone,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setOpen(false);
    if (data == "Due information updated successfully") {
      router.push("/dashboard/customer-due");
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
          label="Customer's Name"
          type="text"
          placeholder="Enter customer's name"
          size="small"
          required
          fullWidth
          color="yallo"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <TextField
          label="Phone"
          type="tel"
          placeholder="Enter customer's phone"
          size="small"
          required
          fullWidth
          color="yallo"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/customer-due")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="yallo" size="small">
            Update
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
