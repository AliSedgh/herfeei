import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
import { East, NavigateBefore } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AcceptDetails,
  GoingToWorkDetails,
  InvoiceDetails,
  Reject,
  StartedDetails,
} from "../../../components/orderCards/OrderCards";
import { FullSkeleton } from "../../../components/loadingSkeleton/LoadingSkeleton";
import { ExpertOrderCardDetails } from "../../../components/expertOrderCardDetails/ExpertOrderCardDetails";
import { useGetExpertOrderDetail } from "../../../core/hooks/useOrderApi";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [status, setStatus] = useState();
  const [id, setId] = useState(router.query?.id);
  const [data, setData] = useState();
  const {
    data: orderDetails,
    isLoading,
    refetch,
  } = useGetExpertOrderDetail(id);

  useEffect(() => {
    setId(router.query?.id);
  }, [router]);

  useEffect(() => {
    orderDetails?.data && setData(orderDetails?.data);
    setStatus(orderDetails?.data?.status);
    !isLoading && orderDetails?.data == undefined ? router.push("/desk") : "";
  }, [isLoading, orderDetails?.data]);

  const breadcrumbs = [
    <Link
      key={1}
      href="/"
      className="text-[#999CA0] text-[10px] 2xs:text-[12px] xs:text-[14px] font-[400]"
    >
      حرفه ای
    </Link>,
    <Link
      key={2}
      href="/desk"
      className="text-[#999CA0] text-[10px] 2xs:text-[12px] xs:text-[14px] font-[400]"
    >
      میز کار
    </Link>,
    <span
      key={3}
      className="text-[#999CA0] text-[10px] 2xs:text-[12px] xs:text-[14px] font-[400]"
    >
      سفارشات
    </span>,
    <span
      key={4}
      className="text-[#000] text-[10px] 2xs:text-[12px] xs:text-[14px] font-[400]"
    >
      جزئیات سفارش
    </span>,
  ];

  return (
    <Box className=" w-full xl:w-[1242px] mx-auto min-h-[calc(100vh-212px)] mt-[20px] pb-[110px] flex flex-col items-center">
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
            className="mt-6 border-none hover:border-none p-0 text-black"
          >
            <span className="px-[10px]">بازگشت</span>
          </Button>
        </Link>
      </div>
      <div className="flex mt-4 flex-col justify-center items-center w-[95%] min-h-[calc(100vh-300.5px)] [border:1px_solid_#D9D9D9] md:border-none [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] md:shadow-none md:p-0 rounded-[8px]">
        {isLoading ? (
          <div className="w-full md:w-[748px] flex p-4 flex-col justify-center items-start gap-4 rounded-[8px] md:[border:1px_solid_#d9d9d9] border-none bg-white md:[box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] shadow-none relative min-h-[400px]">
            <FullSkeleton />
          </div>
        ) : (
          data !== undefined && (
            <ExpertOrderCardDetails status={data?.status} data={data} />
          )
        )}
        {status === "PAYMENT" ? (
          <></>
        ) : (
          <div className="flex md:hidden w-full justify-center items-center mt-[20px] gap-6">
            {isLoading ? (
              <></>
            ) : (
              <>
                {status === "USER_ACCEPTED" ? (
                  <>
                    <Reject orderId={data?.id} />
                    <AcceptDetails orderId={data?.id} />
                  </>
                ) : status === "EXPERT_ACCEPTED" ? (
                  <StartedDetails id={data?.id} refetch={refetch} />
                ) : status === "STARTED" ||
                  status === "DEPOSIT" ||
                  status === "DEPOSIT_PAID" ? (
                  <InvoiceDetails orderId={data?.id} />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {status === "PAYMENT" ? (
        <></>
      ) : (
        <div className="w-[100vw] h-[110px] fixed right-0 bottom-0 hidden md:flex gap-[200px] justify-center items-center [box-shadow:0px_-5px_10.3px_0px_rgba(97,100,117,0.10)] bg-white">
          {isLoading ? (
            <></>
          ) : (
            <>
              {status === "USER_ACCEPTED" ? (
                <>
                  <Reject orderId={data?.id} />
                  <AcceptDetails orderId={data?.id} />
                </>
              ) : status === "EXPERT_ACCEPTED" ? (
                <StartedDetails id={data?.id} refetch={refetch} />
              ) : status === "GOING_TO_WORK" ? (
                <GoingToWorkDetails id={data?.id} refetch={refetch} />
              ) : status === "STARTED" ||
                status === "DEPOSIT" ||
                status === "DEPOSIT_PAID" ? (
                <InvoiceDetails orderId={data?.id} />
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      )}
    </Box>
  );
};

export default Index;
