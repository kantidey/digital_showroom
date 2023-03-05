import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import moment from "moment";
import ShowDataGrid from "./ShowDataGrid";
export default function ManageGroup({ data }) {
  const [withdraw, setWithdraw] = React.useState(data);
  const router = useRouter();
  async function recordFilteringFun(amount) {
    if (amount == "") {
      setWithdraw(data);
    } else {
      setWithdraw(data.filter((item) => item.amount == amount));
    }
  }
  //create columns for data grid
  const columns = React.useMemo(
    () => [
      {
        field: "amount",
        headerName: "Withdraw Amount",
        width: "200",
        renderCell: (params) => `${params.row.amount} $`,
      },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },
    ],
    [withdraw]
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
          placeholder="Filter by amount"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
        <Button
          sx={{ minWidth: "150px" }}
          size="small"
          variant="contained"
          color="yallo"
          onClick={() => router.push("/dashboard/withdraw/create")}
        >
          Withdraw
        </Button>
      </Stack>
      <ShowDataGrid rows={withdraw} columns={columns} />
    </React.Fragment>
  );
}
