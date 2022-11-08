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
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
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
          {/* TODO: Implement menu hide on item click */}
          {/* Search bar implementation for mobile users */}
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
              <Link href="/user/orders">
                <ListItem
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    <AssignmentTurnedInRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItem>
              </Link>
            </>
          ) : (
            <Link href="/auth/login">
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <KeyRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Log In / register"
                  onClick={() => {
                    hideMenu();
                  }}
                />
              </ListItem>
            </Link>
          )}

          {session?.user?.role === "admin" && status === "authenticated" ? (
            <>
              <Link href="/admin">
                <ListItem
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link>

              <Link href="/admin/products">
                <ListItem
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    <Inventory2RoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItem>
              </Link>
              <Link href="/admin/products/new">
                <ListItem
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    <AddCircleRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="New product" />
                </ListItem>
              </Link>
              <Link href="/admin/users">
                <ListItem
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    <PeopleAltRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clients" />
                </ListItem>
              </Link>
              <Link href="/admin/orders">
                <ListItem
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon>
                    <LocalShippingRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
              </Link>
            </>
          ) : null}
        </List>
      </Box>
    </Drawer>
  );
};
