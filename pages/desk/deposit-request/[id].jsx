import { East, NavigateBefore } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import { DepositForm } from "../../../components/depositForm/DepositForm";

const breadcrumbs = [
  <Link
    key={1}
    href="/"
    className="text-[#999CA0] text-[8px] 2xs:text-[10px] xs:text-[14px] font-[400]"
  >
    حرفه ای
  </Link>,
  <Link
    key={2}
    href="/desk"
    className="text-[#999CA0] text-[8px] 2xs:text-[10px] xs:text-[14px] font-[400]"
  >
    میز کار
  </Link>,
  <span
    key={3}
    className="text-[#999CA0] text-[8px] 2xs:text-[10px] xs:text-[14px] font-[400]"
  >
    سفارشات
  </span>,
  <span
    key={4}
    className="text-[#000] text-[8px] 2xs:text-[10px] xs:text-[14px] font-[400]"
  >
    درخواست بیعانه
  </span>,
];

const Index = () => {
  return (
    <Box className=" w-full xl:w-[1242px] mx-auto min-h-[calc(100vh-212px)] mt-[20px] pb-[110px] p-4 flex flex-col items-center">
      <div className="w-full flex flex-col items-start justify-start">
        <Stack spacing={2} className="hidden md:block">
          <Breadcrumbs
            separator={
              <NavigateBefore className="text-[#999CA0]" fontSize="small" />
            }
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Link href="/desk">
          <Button
            startIcon={<East />}
            variant="outlined"
            className="mt-6 mb-2 border-none hover:border-none p-0 text-black"
          >
            <span className="px-[10px]">بازگشت</span>
          </Button>
        </Link>
      </div>
      <DepositForm />
    </Box>
  );
};

export default Index;
