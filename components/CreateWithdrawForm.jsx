import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocalStorage } from "@rehooks/local-storage";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
export default function CreateServicesForm() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState();
  const [amountInputError, setAmountInputError] = useState();
      const [userInfo] = useLocalStorage("userInfo");

  const router = useRouter();
  const handelSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(`/api/withdraw/create?amount=${amount}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    setOpen(false);
    if (data == "Your transaction processed successfully") {
      e.target.reset();
      router.push("/dashboard/withdraw");
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
          label="Amout"
          type="number"
          placeholder="Type amount"
          size="small"
          required
          fullWidth
          color="yallo"
          error={amountInputError && amountInputError}
          helperText={amountInputError && amountInputError}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue < 1) {
              setAmount();
              setAmountInputError("Amuont can't be nagative number or zero");
            } else {
              setAmountInputError();
              setAmount(newValue);
            }
          }}
        />
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/withdraw")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={amountInputError ? true : false}
            variant="contained"
            color="yallo"
            size="small"
          >
            Confirm Withdraw
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
