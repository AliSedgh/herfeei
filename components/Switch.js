import React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40, // Adjust the width as needed
  height: 24, // Adjust the height as needed
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 20 // Adjust the thumb width as needed
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(14px)" // Adjust the checked transform as needed
    }
  },
  "& .MuiSwitch-switchBase": {
    padding: 4, // Adjust the padding as needed
    "&.Mui-checked": {
      transform: "translateX(18px)", // Adjust the checked transform as needed
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16, // Adjust the thumb width as needed
    height: 16, // Adjust the thumb height as needed
    borderRadius: 8, // Adjust the thumb border radius as needed
    transition: theme.transitions.create(["width"], {
      duration: 200
    })
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2, // Adjust the track border radius as needed
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
    boxSizing: "border-box"
  }
}));

export default function CustomSwitch(props) {
  return <AntSwitch {...props} />;
}
