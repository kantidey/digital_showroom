import Box from "@mui/material/Box";
import React from "react";

export default function CreateFormButtonSpacer({ children }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {children}
    </Box>
  );
}
