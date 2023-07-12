import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import UserProfile from "./UserProfile";
import Options from "./Options";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
export default function Layout({ pageTitle, children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Admin Dashboard"}</title>
      </Head>

      <Stack direction={{ xs: "column", sm: "row", md: "row" }}>
        <Paper
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            width: "250px",
            minHeight: "100vh",
            backgroundColor: "#EE6C4D",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              overflowY: "scroll",
              scrollBehavior: "smooth",
              position: "fixed",
            }}
          >
            <UserProfile />
            <Divider />
            <Options />
          </Box>
        </Paper>
        <Container
          sx={{
            flex: 1,
            p: { xs: "5px", sm: "30px", md: "50px" },
            background: "#EAEAEA",
          }}
        >
          <Typography
            sx={{ display: { xs: "block", sm: "block", md: "none" } }}
            align="right"
            component="div"
          >
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Typography>
          <Paper
            sx={{
              px: { xs: "5px", sm: "30px", md: "80px" },
              py: "30px",
              borderRadius: "50px",
            }}
            elevation={0}
          >
            <Typography
              variant="bold"
              component="h1"
              align="center"
              sx={{
                color: "gray",
                mb: "25px",
                borderRadius: "4px",
                fontSize: "35",
                fontWeight: "900",
              }}
            >
              {router.asPath == "/dashboard" ? null : pageTitle}
            </Typography>
            <Divider
              sx={{ display: router.asPath == "/dashboard" ? "none" : "block" }}
            />
            <br />

            {children}
          </Paper>
        </Container>
      </Stack>

      {/* for mobile */}
      <Drawer open={open} onClose={() => setOpen(!open)}>
        <UserProfile />
        <Divider />
        <Options />
      </Drawer>
    </React.Fragment>
  );
}
