import React from "react";
import { Drawer, ListItem, List, Typography, Divider } from "@mui/material";

export const SideDrawer = () => {
  return (
    <Drawer anchor="right" open={false} sx={{
      minWidth: "300px"
    }}>
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
