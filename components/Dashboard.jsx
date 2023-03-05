import { Paper, Stack } from "@mui/material";
import React from "react";
import AmountOverview from "./AmountOverview";
import AmountOverviewChart from "./AmountOverviewChart";
export default function Dashboard({ data }) {
  return (
    <React.Fragment>
      <AmountOverview data={data} />
      <br></br>
      <Paper sx={{ p: "20px" }}>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
          sx={{
            width: "100%",
          }}
        >
          <AmountOverviewChart data={data} />
        </Stack>
      </Paper>
    </React.Fragment>
  );
}
