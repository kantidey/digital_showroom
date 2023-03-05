import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import Image from "next/image";
import { writeStorage } from "@rehooks/local-storage";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export default function Login() {
  const [open, setOpen] = useState(false);
  const [showHidePassword, setShowHidePassword] = React.useState(false);
  const [loginCredentials, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  //user login
  const hubmitHandler = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.post(
      `/api/auth/user/login?email=${loginCredentials.email}&password=${loginCredentials.password}`
    );
    setOpen(false);
    if (loginCredentials.email == data.email) {
      e.target.reset();
      writeStorage("userInfo", data);
      Cookies.set("token", data.token);
      router.replace("/dashboard");
    } else {
      Swal.fire("Failed to login", data, "error");
    }
  };
  return (
    <Stack spacing={1} component="form" onSubmit={hubmitHandler}>
      <Typography align="center">
        <Image
          src="/icons/login.gif"
          height={100}
          width={100}
          quality={100}
          alt="login"
        />
      </Typography>
      <Typography
        align="center"
        variant="bold"
        sx={{ fontSize: "25px", fontWeight: 700 }}
      >
        Digital Showroom
      </Typography>
      <Divider>Please, sign in to continue</Divider>

      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="text"
        placeholder="Email"
        required
        InputProps={{
          endAdornment: <EmailIcon />,
          disableUnderline: true,
        }}
        onChange={(e) =>
          setLoginCredential({
            ...loginCredentials,
            email: e.target.value,
          })
        }
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type={showHidePassword ? "text" : "password"}
        placeholder="Password"
        required
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => setShowHidePassword(!showHidePassword)}
              >
                {showHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) =>
          setLoginCredential({
            ...loginCredentials,
            password: e.target.value,
          })
        }
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="medium"
          variant="contained"
          sx={{
            width: "120px",
            backgroundColor: "#47A7FF",
            color: "#FFFFFF",
          }}
          type="submit"
        >
          Sign In
        </Button>
      </div>
      <Link href="/auth/password/reset">Forgot password?</Link>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
}
