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
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import Link from "next/link";

export const SideDrawer = () => {
  const interfaceContext = useContext(UiContext);

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
          {/* Search bar implementation for mobile users */}

          <Link href="/auth/login">
            <ListItem
              sx={{
                cursor: "pointer",
              }}
            >
              {/* User is not logged in */}
              <ListItemIcon>
                <KeyRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Log In" />
            </ListItem>
          </Link>

          <Link href="/auth/register">
            <ListItem
              sx={{
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <PersonAddAlt1RoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </Link>

          {/* User is logged in */}

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

          {/* User is admin */}
          <ListItem
            sx={{
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <QueryStatsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Stats" />
          </ListItem>
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
        </List>
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
      </Box>
    </Drawer>
  );
};
