// import { East, NavigateBefore } from "@mui/icons-material";
// import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { InvoiceFrom } from "../../../components/invoiceForm/InvoiceForm";
// import { useGetExpertOrderDetail } from "../../../core/hooks/useOrderApi";
// import { FullSkeleton } from "../../../components/loadingSkeleton/LoadingSkeleton";
// import { useRouter } from "next/router";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetExpertOrderDetail } from "../../../../core/hooks/useOrderApi";
import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
import { East, NavigateBefore } from "@mui/icons-material";
import { InvoiceFrom } from "../../../../components/invoiceForm/InvoiceForm";
import { FullSkeleton } from "../../../../components/loadingSkeleton/LoadingSkeleton";
import { EditInvoiceFrom } from "../../../../components/editInvoiceForm/EditInvoiceForm";

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
    درخواست صورتحساب
  </span>,
];

const Index = () => {
  const router = useRouter();
  const [id, setId] = useState(router?.query.id);
  const { data: expertOrderDetail, isLoading } = useGetExpertOrderDetail(id);
  const [status, setStatus] = useState();
  const [initialAgreedAmount, setInitialAgreedAmount] = useState();
  const [deposit, setDeposit] = useState();

  useEffect(() => {
    expertOrderDetail?.data.status && setStatus(expertOrderDetail?.data.status);
    expertOrderDetail?.data?.deposit?.initial_agreed_amount &&
      setInitialAgreedAmount(
        expertOrderDetail?.data?.deposit?.initial_agreed_amount
      );
    expertOrderDetail?.data?.deposit?.deposit &&
      setDeposit(expertOrderDetail?.data?.deposit?.deposit);
  }, [expertOrderDetail]);

  useEffect(() => {
    router?.query && setId(router?.query.id);
  }, [router?.query]);

  return isLoading ? (
    <div className="w-full xl:w-[1242px] mx-auto min-h-[calc(100vh-212px)] mt-[20px] pb-[110px] flex flex-col items-center">
      <FullSkeleton />
    </div>
  ) : (
    <Box className="w-full p-2 xl:w-[1242px] mx-auto min-h-[calc(100vh-212px)] mt-[20px] pb-[110px] flex flex-col items-center">
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
        <Link href={`/desk/expert-order/${id}`}>
          <Button
            startIcon={<East />}
            variant="outlined"
            className="mt-6 border-none hover:border-none p-0 text-black"
          >
            <span className="px-[10px]">بازگشت</span>
          </Button>
        </Link>
      </div>
      <EditInvoiceFrom
        status={status}
        initialAgreedAmount={initialAgreedAmount}
        deposit={deposit}
        expertOrderDetail={expertOrderDetail}
      />
    </Box>
  );
};

export default Index;
