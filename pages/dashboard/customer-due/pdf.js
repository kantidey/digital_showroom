import { useRouter } from "next/router";
import React from "react";
import ReactPdfPrint from "../../../components/ReactPdfPrint";
import Layout from "../../../components/Layout";
import { Typography } from "@mui/material";

export default function Index() {
  const router = useRouter();
  return (
    <Layout pageTitle="Print Customer Due">
      <ReactPdfPrint>
        <Typography>Name: {router.query.customerName}</Typography>
        <Typography>Phone: {router.query.customerPhone}</Typography>
        <Typography>Due: {router.query.amount} $</Typography>
        <Typography>Date: {router.query.date}</Typography>
      </ReactPdfPrint>
    </Layout>
  );
}
