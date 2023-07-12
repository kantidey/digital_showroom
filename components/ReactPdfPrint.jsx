import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { Divider, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
export default function ReactPdfPrint({ children }) {
  const refCom = useRef();
  const handlePrint = useReactToPrint({
    content: () => refCom.current,
    documentTitle:"Write your customer name",
  });

  const router = useRouter();

  return (
    <div style={{ padding: "20px" }}>
      <div
        ref={refCom}
        style={{ with: "100%", height: "700", padding: "50px" }}
      >
        <Typography align="right" fontSize={36}>
          Invoice
        </Typography>{" "}
        <br></br>
        <Typography align="left">Kantidat's Shop</Typography>
        <Typography align="left">Mirpur, Dhanmondi, 32, Dhaka</Typography>{" "}
        <Typography align="left">kandy@gmail.com</Typography>{" "}
        <Typography align="left">+8801611111111</Typography> <br></br>
        <Typography align="left" fontSize={21}>
          BILL TO:
        </Typography>
        <Divider></Divider>
        {children}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <CreateFormButtonSpacer>
        <Button
          type="button"
          variant="contained"
          color="error"
          size="small"
          onClick={() => router.push("/dashboard")}
        >
          Cancel
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained"
          color="yallo"
          size="small"
        >
          Print
        </Button>
      </CreateFormButtonSpacer>{" "}
    </div>
  );
}
