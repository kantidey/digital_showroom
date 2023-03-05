import { ListItem, ListItemText, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function DashboardLoader() {
  return (
    <React.Fragment>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        {[1, 2, 3, 4].map((value, index) => (
          <Paper
            elevation={2}
            key={index}
            sx={{
              width: { xs: "500px", sm: "500px", md: "200px" },
              height: "120px",
              pt:"23px"
            }}
          >
            <ListItem
              secondaryAction=<Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            >
              <ListItemText
                primary=<Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={25}
                />
                secondary=<Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
              />
            </ListItem>
          </Paper>
        ))}
      </Stack>
      <br></br>
      <Paper elevation={2}>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: "100%",
            height: "300px",
          }}
        />
      </Paper>
    </React.Fragment>
  );
}
