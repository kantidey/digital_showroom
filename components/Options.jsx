import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";
import Cookies from "js-cookie";
export default function Options() {
  const [user, setUser] = React.useState();
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setUser(userInfo ? userInfo.role : null);
  });
  return (
    <List dense={true}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard")}>
          <ListItemIcon>
            <Image
              src="/icons/dashboard.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard/product/sell")}>
          <ListItemIcon>
            <Image
              src="/icons/sell.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Sell Product</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard/customer-due")}>
          <ListItemIcon>
            <Image
              src="/icons/customer.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Customer Due</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard/product")}>
          <ListItemIcon>
            <Image
              src="/icons/product.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Product</ListItemText>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/product/category")}
        >
          <ListItemIcon>
            <Image
              src="/icons/category.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Category</ListItemText>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard/withdraw")}>
          <ListItemIcon>
            <Image
              src="/icons/withdraw.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Withdraw</ListItemText>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard/utility-cost")}>
          <ListItemIcon>
            <Image
              src="/icons/cost.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Utility Cost</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard/vat-discount")}>
          <ListItemIcon>
            <Image
              src="/icons/vatAndDiscount.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Set Vat & Discount</ListItemText>
        </ListItemButton>
      </ListItem>
   
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <Image
              src="/icons/settings.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense={true} disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
            }}
            onClick={() => router.push("/auth/password/reset")}
          >
            <ListItemIcon>
              <Image
                src="/icons/changePass.png"
                height={25}
                width={25}
                quality={100}
                alt="icon"
              />
            </ListItemIcon>
            <ListItemText primary="Change password" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              deleteFromStorage("userInfo");
              Cookies.remove("token");
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <Image
                src="/icons/logout.png"
                height={25}
                width={25}
                quality={100}
                alt="icon"
              />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
