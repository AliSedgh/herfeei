import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
import { East, NavigateBefore } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetUserOrderDetail } from "../../../core/hooks/useOrderApi";
import { useRouter } from "next/router";
import { FullSkeleton } from "../../../components/loadingSkeleton/LoadingSkeleton";
import InvoicePayment from "../../../components/invoicePayment/InvoicePayment";
import DepositPayment from "../../../components/depositPayment/DepositPayment";

const Index = () => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [id, setId] = useState(router.query?.id);
  const { data: orderDetails, isLoading } = useGetUserOrderDetail(
    router.query?.id
  );

  useEffect(() => {
    setId(router.query?.id);
  }, [router]);

  useEffect(() => {
    setStatus(orderDetails?.data?.status);
  }, [isLoading]);

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
      href="/order"
      className="text-[#999CA0] text-[8px] 2xs:text-[10px] xs:text-[14px] font-[400]"
    >
      سفارشات
    </Link>,
    <span
      key={3}
      className="text-[#999CA0] text-[8px] 2xs:text-[10px] xs:text-[14px] font-[400]"
    >
      سفارشات جاری
    </span>,
    <span
      key={4}
      className="text-[#000] text-[8px] 2xs:text-[10px] xs:text-[14px] font-[400]"
    >
      پرداخت سفارش
    </span>,
  ];

  return (
    <Box className=" w-full xl:w-[1242px] mx-auto min-h-[calc(100vh-212px)] mt-[20px] pb-[110px] flex flex-col items-center">
      <div className="w-full flex flex-col items-start justify-start">
        <Stack spacing={2}>
          <Breadcrumbs
            separator={
              <NavigateBefore className="text-[#999CA0]" fontSize="small" />
            }
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Link href="/order">
          <Button
            startIcon={<East />}
            variant="outlined"
            className="mt-6 border-none hover:border-none p-0 text-black"
          >
            <span className="px-[10px]">بازگشت</span>
          </Button>
        </Link>
      </div>
      <div className="flex mt-4 flex-col justify-center items-center w-full min-h-[calc(100vh-300.5px)] rounded-[8px]">
        {isLoading ? (
          <div className="w-full md:w-[748px] flex p-4 flex-col justify-center items-start gap-4 rounded-[8px] md:[border:1px_solid_#d9d9d9] border-none bg-white md:[box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] shadow-none relative min-h-[400px]">
            <FullSkeleton />
          </div>
        ) : (
          <DepositPayment data={orderDetails?.data} />
        )}
      </div>
    </Box>
  );
};

export default Index;
