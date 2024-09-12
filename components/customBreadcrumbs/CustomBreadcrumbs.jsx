import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function CustomBreadcrumbs() {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      حرفه ای
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      سرویس ها
    </Link>,
    <Typography key="3" color="text.primary">
      سوالات
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs dir="rtl" separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export { CustomBreadcrumbs };
