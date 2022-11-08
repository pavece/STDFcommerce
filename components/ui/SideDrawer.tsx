import { useContext } from "react";
import {
  Drawer,
  ListItem,
  List,
  Box,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { UiContext } from "../../context/uiContext/uiContext";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Link from "next/link";
import { userLogOut } from "../../utils/userLogOut";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SearchBar } from "./searchBar";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export const SideDrawer = () => {
  const interfaceContext = useContext(UiContext);
  const uiContext = useContext(UiContext);
  const router = useRouter();
  const { data: session, status }: { data: any; status: string } = useSession();

  const hideMenu = () => {
    uiContext.uiCloseSideMenu();
  };

  const goTo = (url: string) => {
    hideMenu();
    router.replace(url);
  };

  return (
    <Drawer
      anchor="right"
      open={interfaceContext.sideMenuOpen}
      onClose={() => interfaceContext.uiCloseSideMenu()}
      sx={{
        backdropFilter: "blur(6px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <Box
        sx={{
          width: 250,
          paddingTop: 5,
        }}
      >
        <List>
          <ListItem sx={{ display: { xs: "", md: "none" }, padding: "0 10px" }}>
            <SearchBar></SearchBar>
          </ListItem>
          {status == "authenticated" ? (
            <>
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  userLogOut();
                  hideMenu();
                }}
              >
                <ListItemIcon>
                  <MeetingRoomRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  goTo("/user/orders");
                }}
              >
                <ListItemIcon>
                  <AssignmentTurnedInRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
              </ListItem>
            </>
          ) : (
            <ListItem
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                goTo("/auth/login");
              }}
            >
              <ListItemIcon>
                <KeyRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Log In / register" />
            </ListItem>
          )}

          {session?.user?.role === "admin" && status === "authenticated" ? (
            <>
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  goTo("/admin");
                }}
              >
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  goTo("/admin/products");
                }}
              >
                <ListItemIcon>
                  <Inventory2RoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  goTo("/admin/products/new");
                }}
              >
                <ListItemIcon>
                  <AddCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="New product" />
              </ListItem>
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  goTo("/admin/users");
                }}
              >
                <ListItemIcon>
                  <PeopleAltRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Clients" />
              </ListItem>
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  goTo("/admin/orders");
                }}
              >
                <ListItemIcon>
                  <LocalShippingRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </>
          ) : null}
        </List>
      </Box>
    </Drawer>
  );
};
