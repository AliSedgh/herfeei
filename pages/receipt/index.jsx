import {
  Box,
  Breadcrumbs,
  Button,
  Rating,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { East, NavigateBefore } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FullSkeleton } from "../../components/loadingSkeleton/LoadingSkeleton";
import { useGetOrderByTrackId } from "../../core/hooks/useOrderApi";
import SuccessIconSvg from "../../public/icons/successIcon.svg";
import FailIconSvg from "../../public/icons/failIcon.svg";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import { usePostExpertComment } from "../../core/hooks/useExpertApi";
import { toast } from "react-toastify";

const Index = () => {
  const router = useRouter();
  const { data, isLoading } = useGetOrderByTrackId(
    router?.query.order_track_id
  );

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
  const statusText = () => {
    if (router?.query.status === "204") {
      if (router?.query?.order_track_id && !!!router?.query?.type) {
        return "سرویس شما با موفقیت به پایان رسید";
      } else if (
        router?.query?.order_track_id &&
        router?.query?.type === "receipt"
      ) {
        return "سرویس شما با موفقیت به پایان رسید";
      } else {
        return "پرداخت موفق";
      }
    } else {
      return "پرداخت ناموفق";
    }
  };

  const detectTextBaseOnStatus = (status, type) => {
    const messages = {
      deposit: {
        success: "بیعانه با موفقیت پرداخت شد",
        failure: "بیعانه با موفقیت پرداخت نشد",
      },
      receipt: {
        success: "",
        failure: "",
      },
      user_increase_credit: {
        success: "افزایش اعتبار با موفقیت انجام شد",
        failure: "افزایش اعتبار با موفقیت انجام نشد",
      },
      expert_increase_credit: {
        success: "افزایش اعتبار با موفقیت انجام شد",
        failure: "افزایش اعتبار با موفقیت انجام نشد",
      },
    };

    const finalText =
      status === "204" ? messages[type]?.success : messages[type]?.failure;

    return [finalText || ""];
  };

  const [finalText] = detectTextBaseOnStatus(
    router?.query.status,
    router?.query.type
  );

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
        <Link href="/order">
          <Button
            startIcon={<East />}
            variant="outlined"
            className="mt-6 border-none hover:border-none p-0 text-black"
          >
            <span className="px-[10px]">
              {router?.query?.status === "204"
                ? "پرداخت موفق"
                : "پرداخت ناموفق"}
            </span>
          </Button>
        </Link>
      </div>
      <div className="flex mt-4 gap-4 flex-col justify-center items-center w-full min-h-[calc(100vh-300.5px)] rounded-[8px]">
        <div className="w-[95%] md:w-[748px] flex p-4 flex-col justify-center items-center gap-4 rounded-[8px] [border:1px_solid_#d9d9d9] border-none bg-white [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] shadow-none relative min-h-[210px]">
          {isLoading ? (
            <FullSkeleton />
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-5">
              <div className="relative w-[38px] h-[38px] overflow-hidden">
                <Image
                  src={
                    router?.query?.status == 204
                      ? SuccessIconSvg.src
                      : FailIconSvg.src
                  }
                  alt="close"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="m-0 p-0 text-[#1A1D1F] text-[16px] font-semibold">
                {statusText()}
              </p>
              <p className="m-0 p-0 text-[#535763] text-[12px] font-normal">
                {finalText}
              </p>
              {router?.query?.status == 204 &&
                router?.query?.order_track_id &&
                router?.query?.type !== "user_increase_credit" && (
                  <p className="m-0 p-0 text-[#0AD253] text-[12px] 3xs:text-[13px] 2xs:text-[14px] font-semibold">
                    از اینکه حرفه ای را انتخاب کرده اید از شما سپاسگذاریم.
                  </p>
                )}

              <div className="w-full flex justify-center items-center gap-10">
                <Button className="w-[151px] h-[38px] px-4 py-2 rounded-[4px] text-[#333334] bg-[#F9F9F9] text-[14px] font-semibold leading-snug">
                  {data?.data && data?.data.invoice.payment_type === "cash"
                    ? "پرداخت نقدی"
                    : "پرداخت آنلاین"}
                </Button>
                {router?.query.order_track_id &&
                  router?.query?.type !== "user_increase_credit" && (
                    <>
                      <div className="flex gap-1 justify-center items-center">
                        <p className="m-0 p-0 text-[#333334] text-[12px] font-normal">
                          کد پیگیری:{" "}
                        </p>
                        <p className="m-0 p-0 text-[#333334] text-[12px] font-semibold">
                          {router?.query.order_track_id}
                        </p>
                      </div>
                    </>
                  )}
              </div>
              {router?.query?.status !== "204" && (
                <Button
                  onClick={() => {
                    data?.data &&
                      data?.data.id &&
                      !router?.query.status == 204 &&
                      router.push(`/order/invoice-report/${data?.data.id}`);
                  }}
                  variant="contained"
                  className={`flex-[1_0_0] p-[10px_35px] justify-center items-center h-[36px] rounded-[8px] text-[#fff] bg-[#0361FF] hover:bg-[#0361FF] text-[14px] font-semibold`}
                >
                  تلاش دوباره
                </Button>
              )}
            </div>
          )}
        </div>
        {(router?.query?.type === "receipt" ||
          (!!router?.query?.order_track_id && !!!router.query?.type)) && (
          <AddComment
            expertName={data?.data?.expert?.user?.profile_name}
            avatarUrl={data?.data?.expert?.profile_name}
            orderId={data?.data?.id}
          />
        )}
      </div>
    </Box>
  );
};

export default Index;

const AddComment = ({ expertName, avatarUrl, orderId }) => {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const postComment = usePostExpertComment();
  const router = useRouter();
  const handleSendComment = async () => {
    try {
      const res = await postComment.mutateAsync({
        rate,
        comment,
        order_id: orderId,
      });
      if (res.status == 200) {
        console.log("res", res);
        toast.success(res.data.message);
        router.replace("/order");
        setRate(0);
        setComment("");
      } else {
        toast.error("خطایی در ثبت نظر رخ داد");
      }
    } catch (error) {}
  };
  return (
    <div className="w-[95%] md:w-[748px] flex p-4 flex-col justify-center items-center gap-4 rounded-[8px] [border:1px_solid_#d9d9d9] border-none bg-white [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] shadow-none relative min-h-[210px]">
      <div className="flex md:justify-between flex-col md:flex-row items-center gap-4  w-full">
        <div className="flex items-center gap-2">
          <div className="w-13 h-13 bg-gray-300 rounded-full">
            <Image
              className="w-full h-full object-contain cursor-pointer"
              src={avatarUrl || "/icons/avatar-deafult.svg"}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-3 items-center justify-between">
            <span className="text-[#616161] text-xs">کارشناس شما</span>
            <span className="text-sm font-semibold">{expertName}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-[#535763] text-xs">
            میزان رضایت شما از متخصص
          </span>
          <div className="flex flex-col items-center justify-center">
            <Rating
              name="simple-controlled"
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              dir="ltr"
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue);
              }}
            />
            <div className="flex justify-between flex-row-reverse w-[90%] items-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <span className="text-sm text-[#DEDEDE]" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        <p className="text-[#212121] font-semibold">نظر شما درمورد متخصص</p>
        <TextareaAutosize
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="نظر شما"
          minRows={5}
          className="outline-none p-4 border border-[#EBEBEB] bg-[#F9F9F9] rounded-lg placeholder:text-[#999CA0]"
        />
      </div>
      <div className="flex items-center justify-center">
        <Button
          disabled={!!!comment && !!!rate}
          onClick={handleSendComment}
          className="bg-[#0361FF] disabled:opacity-50 rounded-md text-white px-12"
        >
          ثبت نظر
        </Button>
      </div>
    </div>
  );
};
