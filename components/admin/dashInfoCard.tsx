import { Box } from "@mui/system";
import React from "react";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

const DashInfoCard = ({
  icon,
  value,
  text,
}: {
  icon: any;
  value: number;
  text: string;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: grey[300],
        borderRadius: "10px",
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
      <Typography variant="h6" component="p" sx={{mr: "20px"}}>
        {text}:
      </Typography>
      <Typography variant="h4" component="p">
        {value}
      </Typography>
    </Box>
  );
};

export default DashInfoCard;
