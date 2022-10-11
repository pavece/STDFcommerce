import { useContext } from "react";
import { Drawer, ListItem, List, Typography, Divider } from "@mui/material";
import { UiContext } from "../../context/uiContext/uiContext";

export const SideDrawer = () => {
  const interfaceContext = useContext(UiContext);

  return (
    <Drawer
      anchor="right"
      open={interfaceContext.sideMenuOpen}
      onClose={() => interfaceContext.uiCloseSideMenu()}
      sx={{
        minWidth: "300px",
      }}
    >
      <List>
        <ListItem>
          <Typography>Sign in</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography>Admin</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};
