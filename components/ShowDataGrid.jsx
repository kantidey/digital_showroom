import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function ShowDataGrid({ rows, columns }) {
  return (
    <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
