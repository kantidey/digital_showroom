import { Box, Typography } from "@mui/material";
import { useLocalStorage } from "@rehooks/local-storage";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

 function UserProfile() {
  const [userInfo] = useLocalStorage("userInfo");
  return (
    <Box
      sx={{
        height: "200px",
        width: "250px",
        display: "grid",
        placeContent: "center",
      }}
    >
      <Typography component="div" variant="bold" align="center">
        <Image
          src="/icons/profile.png"
          height={120}
          width={120}
          quality={100}
        />
      </Typography>
      <Typography component="h4" variant="bold" align="center">
        {userInfo && userInfo.email}
      </Typography>
      <Typography component="p" variant="bold" align="center">
        {userInfo && userInfo.role}
      </Typography>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(UserProfile), {
  ssr: false,
});