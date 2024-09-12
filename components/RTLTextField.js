import React from "react";
import TextField from "@mui/material/TextField";

export default function RTLTextField({ sx, ...props }) {
  const sxx = {
    ...sx,
    "& label": {
      transformOrigin: "right !important",
      left: "inherit !important",
      right: "2rem !important",
    },
    "& legend": {
      textAlign: "right",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      textAlign: "right",
    },
  };

  return <TextField {...props} sx={sxx} />;
}
