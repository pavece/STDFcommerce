import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { useState } from "react";
import { grey } from "@mui/material/colors";

export const Counter = ({
  initialValue,
  maxValue,
  getValue,
}: {
  initialValue: number;
  maxValue: number;
  getValue: (arg0: number) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        width: "200px",
        margin: "20px 0",
      }}
    >
      <RemoveCircleRoundedIcon
        onClick={() => {
          setValue(value > 1 ? value - 1 : value);
          getValue(value == 1 ? value : value - 1);
        }}
        sx={{
          margin: "0 20px 0 0",
          color: grey[900],
          cursor: "pointer",
        }}
      />
      <Typography>{value}</Typography>
      <AddCircleRoundedIcon
        color="primary"
        sx={{
          margin: "0 0 0 20px",
          color: grey[900],
          cursor: "pointer",
        }}
        onClick={() => {
          setValue(value < maxValue ? value + 1 : value);
          getValue(value == maxValue ? value : value + 1);
        }}
      />
    </Box>
  );
};
