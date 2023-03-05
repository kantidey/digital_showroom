import * as React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
export default function Layout({ pageTitle, children }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Container maxWidth="sm">
        <Paper sx={{ px: "40px", py: "25px", mt: "100px" }}>{children}</Paper>
      </Container>
    </React.Fragment>
  );
}
