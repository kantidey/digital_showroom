import React from "react";
import {
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
export default function AccountOverview({ data }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "500px", sm: "500px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/totalSell.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Total Sell
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {`${data ? (data.totalSell ? data.totalSell : 0) : 0}`}$
            </Typography>
          />
        </ListItem>
      </Paper>
      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "500px", sm: "500px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/due.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Due
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {`${data ? (data.totalDueOnSell ? data.totalDueOnSell : 0) : 0}`}$
            </Typography>
          />
        </ListItem>
      </Paper>
      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "500px", sm: "500px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/cashOut.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Cash Out
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {`${
                data
                  ? data.totalWithdraw
                    ? data.totalWithdraw
                    : 0 + data.totalUtilityCost
                    ? data.totalUtilityCost
                    : 0
                  : 0
              } `}
              $
            </Typography>
          />
        </ListItem>
      </Paper>

      <Paper
        className="hoverAnimations"
        sx={{ width: { xs: "500px", sm: "500px", md: "200px" }, p: "10px" }}
      >
        <ListItem
          secondaryAction=<Image
            src="/icons/balance.png"
            height={60}
            width={60}
            quality={100}
            alt=""
          />
        >
          <ListItemText
            primary=<Typography component="h3" variant="bold">
              Balance
            </Typography>
            secondary=<Typography component="h4" variant="bold">
              {`${data ? (data.balance ? data.balance : 0) : 0}`} $
            </Typography>
          />
        </ListItem>
      </Paper>
    </Stack>
  );
}
