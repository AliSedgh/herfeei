import Image from "next/image";
import Link from "next/link";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import ProfilePic from "../../public/icons/avatar-deafult.svg";
import Phone from "../../public/icons/phone2.svg";
import GoToLocationSvg from "../../public/icons/go-to-location.svg";
import info from "../../public/icons/info.svg";
import { useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  postExpertOrderAccepting,
  postExpertOrderRejecting,
  postExpertOrderStarting,
  postUserOrderCanceling,
} from "../../core/api/orderApi";
import { toast } from "react-toastify";
import { handleRequestError } from "../../core/utils/handle-req-err";
import {
  useExpertOrderReject,
  usePostExpertOrderAccepting,
  usePostExpertOrderStarting,
  useUpdateOrderGuarantee,
} from "../../core/hooks/useOrderApi";
import Router, { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { set } from "@neshan-maps-platform/ol/transform";
import { useGetAddressById } from "../../core/hooks/useAddressApi";
import { useExpertGoingToWork } from "../../core/hooks/useExpertApi";
import { ref } from "yup";
import ChangeExpertButton from "../changeExpert/ChangeExpertButton";

const Details = ({ id, expert }) => {
  return (
    <Button
      variant="outlined"
      className={`flex-[1_0_0] justify-center p-0 items-center h-[36px] rounded-[8px] [border:1px_solid_#1A1D1F] text-[#1A1D1F] text-[10px] 2xs:text-[14px] xs:text-[16px] md:text-[14px] lg:text-[16px]`}
    >
      <Link
        href={`${
          expert ? "/desk/expert-order/" + id : "/order/order-details/" + id
        }`}
        className="w-full p-[8px_16px] "
      >
        مشاهده جزئیات{" "}
      </Link>
    </Button>
  );
};

const Pay = ({ id, status }) => {
  return (
    <Button
      variant="contained"
      className={`flex-[1_0_0] p-[8px_4px] 2xs:p-[8px_16px] justify-center items-center h-[36px] rounded-[8px] [border:1px_solid_#0AD253] text-[#fff] bg-[#0AD253] border-none hover:bg-[#0AD253] text-[9px] 2xs:text-[16px]`}
    >
      {status === "PAYMENT" ? (
        <Link href={`/order/invoice-report/${id}`}>مشاهده و پرداخت</Link>
      ) : status === "DEPOSIT" ? (
        <Link href={`/order/deposit-payment/${id}`}>مشاهده و پرداخت</Link>
      ) : (
        ""
      )}
    </Button>
  );
};

const Invoice = ({ data }) => {
  return (
    <Button
      variant="contained"
      className={`flex-[1_0_0] 2xs:p-[8px_16px] justify-center items-center h-[36px] rounded-[8px] [border:1px_solid_#0AD253] text-[#fff] bg-[#0361FF] border-none hover:bg-[#0361FF] text-[9px] 2xs:text-[16px] p-0`}
    >
      <Link href={`/desk/invoice-request/${data.id}`} className="p-[8px_4px]">
        ارائه صورتحساب
      </Link>
    </Button>
  );
};

const Accepted = ({ id, allData, setAllData }) => {
  const queryClient = useQueryClient();
  const postExpertOrderAccepting = usePostExpertOrderAccepting();
  const handleClick = () => {
    postExpertOrderAccepting.mutate(
      { order_id: id, confirmation: "accepted" },
      {
        onError: () => {
          queryClient.getQueriesData(["expertOrder"]);
        },
        onSettled: () => {
          const newAllData = [...allData];
          const mapData = newAllData.map((item) => {
            if (item.id === id) {
              item.status = "EXPERT_ACCEPTED";
            }
            return item;
          });

          setAllData(mapData);
        },
      }
    );
  };

  // const handleClick = async () => {
  //   try {
  //     await postExpertOrderAccepting({
  //       order_id: id,
  //       confirmation: "accepted",
  //     });
  //     // location.reload(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      className={`flex-[1_0_0] p-[8px_4px] 2xs:p-[8px_16px] justify-center items-center h-[36px] rounded-[8px] [border:1px_solid_#0AD253] text-[#fff] bg-[#0361FF] border-none hover:bg-[#0361FF] text-[9px] 2xs:text-[16px]`}
    >
      قبول سرویس
    </Button>
  );
};

const GoingToWork = ({ id, allData, setAllData }) => {
  console.log("gggg", id);

  const postStarted = usePostExpertOrderStarting();
  const handleClick = async () => {
    postStarted.mutate(
      { order_id: id, confirmation: "accepted" },
      {
        onSettled: () => {
          const newAllData = [...allData];
          const mapData = newAllData.map((item) => {
            if (item.id === id) {
              item.status = "STARTED";
            }
            return item;
          });
          setAllData(mapData);
        },
      }
    );
    // location.reload(true);
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      className={`flex-[1_0_0] p-[8px_4px] 2xs:p-[8px_16px] justify-center items-center h-[36px] rounded-[8px] [border:1px_solid_#0AD253] text-[#fff] bg-[#0361FF] border-none hover:bg-[#0361FF] text-[9px] 2xs:text-[16px]`}
    >
      شروع کار
    </Button>
  );
};

const Started = ({ id, allData, setAllData }) => {
  const queryClient = useQueryClient();
  const expertGoingToWork = useExpertGoingToWork();
  const handleClick = async () => {
    await expertGoingToWork.mutateAsync(id, {
      onError: () => {
        queryClient.getQueriesData(["expertOrder"]);
      },
      onSettled: () => {
        const newAllData = [...allData];
        const mapData = newAllData.map((item) => {
          if (item.id === id) {
            item.status = "GOING_TO_WORK";
          }
          return item;
        });
        setAllData(mapData);
      },
    });

    queryClient.invalidateQueries(["expertOrder", "items"]);
  };

  // const postStarted = usePostExpertOrderStarting();
  // const handleClick = async () => {
  //   postStarted.mutate({ order_id: id, confirmation: "accepted" });
  //   // location.reload(true);
  // };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      className={`flex-[1_0_0] p-[8px_4px] 2xs:p-[8px_16px] justify-center items-center h-[36px] rounded-[8px] [border:1px_solid_#0AD253] text-[#fff] bg-[#0361FF] border-none hover:bg-[#0361FF] text-[9px] 2xs:text-[16px]`}
    >
      رفتن به محل کار
    </Button>
  );
};

const TryAgain = () => {
  return (
    <Button
      variant="contained"
      className={`flex-[1_0_0] p-[8px_4px] 2xs:p-[8px_16px] justify-center items-center h-[36px] rounded-[8px] [border:1px_solid_#0AD253] text-[#fff] bg-[#0361FF] border-none hover:bg-[#0361FF] text-[9px] 2xs:text-[16px]`}
    >
      ثبت مجدد سرویس
    </Button>
  );
};

const CompleteOrder = () => {
  return (
    <Button
      variant="outlined"
      className={`flex-[1_0_0] p-[8px_16px] justify-center items-center h-[36px] rounded-[8px] text-[10px] 2xs:text-[16px]`}
    >
      تکمیل سفارش
    </Button>
  );
};

const Expert = ({ data }) => {
  const [showPhone, setShowPhone] = useState(false);
  console.log("datta", data);

  return (
    <>
      <div
        className={`w-full ${
          data?.status === "REJECTED" ? "opacity-25" : ""
        } h-[50px] flex flex-row-reverse justify-end items-center gap-[10px]`}
      >
        <div className="w-[50px] h-[50px] shrink-0 relative">
          <Image
            src={data?.expert?.avatar ? data?.expert?.avatar : ProfilePic}
            alt="profilePic"
            fill
            className="rounded-[50%]"
          />
        </div>
        <div className="flex flex-col items-end gap-[9px] flex-[1_0_0]">
          <span className="text-right text-[8px] 2xs:text-[10px] font-[400] text-[#616161]">
            کارشناس شما
          </span>
          <b className="font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
            {data?.expert?.name}
          </b>
        </div>
        <a
          onClick={(e) => {
            // شرط خود را در اینجا قرار دهید
            if (data?.status === "REJECTED") {
              e.preventDefault(); // لینک عمل نکند
            }
          }}
          href={`tel:${data && data?.expert && data?.expert.user?.username}`}
          className={`${
            data?.status === "REJECTED" ? "cursor-none" : "cursor-pointer"
          }`}
        >
          <Button
            disabled={data?.status === "REJECTED"}
            onClick={() => setShowPhone(true)}
            variant="outlined"
            className="flex border-none bg-white flex-row-reverse items-center gap-[8px] cursor-pointer hover:border-none rounded-[7px]"
          >
            <span className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[14px] text-right">
              تماس
            </span>
            <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px] flex items-center">
              <Image className="object-fill" src={Phone} fill alt="phone" />
            </div>
          </Button>

          <span
            onClick={() =>
              data && data?.expert ? setShowPhone(false) : setShowPhone(true)
            }
            className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[15px] text-right cursor-pointer"
          >
            {data && data?.expert && data?.expert.user?.username
              ? "0" + data?.expert.user?.username
              : ""}
          </span>
        </a>
      </div>
    </>
  );
};

const User = ({ data }) => {
  const [showPhone, setShowPhone] = useState(false);
  return (
    <>
      <div className="w-full h-[50px]  flex flex-row-reverse justify-end items-center gap-[10px]">
        <div className="w-[50px] h-[50px] shrink-0 relative">
          <Image src={ProfilePic.src} alt="profilePic" fill />
        </div>
        <div className="flex flex-col items-end gap-[9px] flex-[1_0_0]">
          <span className="text-right text-[8px] 2xs:text-[10px] font-[400] text-[#616161]">
            درخواست دهنده
          </span>
          <b className="font-[600] leading-[140%] text-[13px] 2xs:text-[10px] sm:text-[14px] text-right">
            {data?.user?.profile_name}
          </b>
        </div>
        {data.status !== "USER_ACCEPTED" && data.status !== "FINISHED" && (
          <a
            href={`tel:${
              data && data?.user?.username ? "0" + data?.user?.username : ""
            }`}
            className="flex flex-col"
          >
            <Button
              variant="outlined"
              className="flex border-none bg-white flex-row-reverse items-center gap-[8px] cursor-pointer hover:border-none rounded-[7px]"
            >
              <span className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[14px] text-right">
                تماس
              </span>
              <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px] flex items-center">
                <Image className="object-fill" src={Phone} fill alt="phone" />
              </div>
            </Button>

            <a
              href={`tel:${
                data && data?.user?.username ? "0" + data?.user?.username : ""
              }`}
              className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[15px] text-right cursor-pointer"
            >
              {data && data?.user?.username ? "0" + data?.user?.username : ""}
            </a>
          </a>
        )}
      </div>
    </>
  );
};

const GoToLocation = ({ data }) => {
  const { data: address } = useGetAddressById(data?.user_address?.id);

  return (
    <>
      <div className="w-full flex justify-center items-center ">
        <Button
          role="link"
          href={`https://nshn.ir/?lat=${address?.data?.lat}&lng=${address?.data?.long}`}
          variant="outlined"
          className="flex border-none flex-row-reverse items-center gap-[8px] cursor-pointer hover:border-none rounded-[7px]"
        >
          <span className="text-[#0361FF] font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
            مسیر یابی روی نقشه
          </span>
          <div className="flex items-center ">
            <Image src={GoToLocationSvg} alt="location" />
          </div>
        </Button>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
    </>
  );
};

const UserStartOrderDetails = ({ data }) => {
  return (
    <>
      <div className="w-full flex flex-col justify-end items-center gap-[10px]">
        {data?.deposit && (
          <>
            <div className="w-full flex flex-col gap-4">
              <ul className="m-0 p-0 list-none flex flex-col items-start justify-center">
                <li className="flex gap-1 text-right text-[10px] 2xs:text-[14px] font-[400] leading-[150%] text-[#333334]">
                  <span>مبلغ کل توافق شده:</span>
                  <span>{data?.deposit?.initial_agreed_amount} تومان</span>
                </li>
                <li className="flex gap-1 font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
                  <span className="mt-2">مبلغ بیعانه پرداخت شده:</span>
                  <span className="mt-2">{data?.deposit?.deposit} تومان</span>
                </li>
              </ul>
              <div className="flex flex-col">
                <span className="flex flex-col font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
                  بابت:
                </span>
                <ul className="m-0 px-5 pt-2 text-right text-[10px] 2xs:text-[14px] font-[400] leading-[150%] text-[#333334]">
                  <li>{data?.deposit?.deposit_description}</li>
                </ul>
              </div>
            </div>
            {/* <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" /> */}
          </>
        )}
      </div>
    </>
  );
};

const ExpertStartOrderDetails = ({ data, isGuaranteed }) => {
  const updateOrderGuarantee = useUpdateOrderGuarantee();

  const handleGuarantee = async (e) => {
    console.log(e.target.checked);

    await updateOrderGuarantee.mutateAsync({
      order_id: data?.id,
      guaranteed: e.target.checked ? "true" : "false",
    });
  };

  return (
    <>
      <div className="w-full flex flex-col justify-end items-center gap-[10px]">
        {data?.deposit && (
          <>
            <div className="w-full flex flex-col gap-4">
              <ul className="m-0 p-0 list-none flex flex-col justify-center items-start">
                <li className="flex gap-1 text-right text-[10px] 2xs:text-[14px] font-[400] leading-[150%] text-[#333334]">
                  <span>مبلغ کل توافق شده:</span>
                  <span>{data?.deposit?.initial_agreed_amount} تومان</span>
                </li>
                <li className="flex gap-1 font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
                  <span className="mt-2">مبلغ بیعانه درانتظار دریافت:</span>
                  <span className="mt-2">{data?.deposit?.deposit} تومان</span>
                </li>
              </ul>
              <div className="flex flex-col">
                <span className="flex flex-col font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
                  بابت:
                </span>
                <ul className="m-0 px-5 pt-2 text-right text-[10px] 2xs:text-[14px] font-[400] leading-[150%] text-[#333334]">
                  <li>{data?.deposit?.deposit_description}</li>
                </ul>
              </div>
            </div>
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
          </>
        )}

        {isGuaranteed && (
          <div className="w-full flex-start">
            <FormControlLabel
              control={<Checkbox onChange={handleGuarantee} />}
              label="این سرویس را گارانتی میکنم"
              className="m-0"
            />
          </div>
        )}
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        {data?.deposit ? (
          <></>
        ) : (
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <span className="text-right text-[8px] 2xs:text-[12px] font-[400] leading-[150%] text-[#333334]">
              متخصص گرامی تنها در صورتی می توانید از این گزینه استفاده کنید که
              سرویس مورد نظر بیش از یک روز کاری زمان نیاز داشته باشد
            </span>
            <div className="w-full flex justify-center">
              <Button
                variant="outlined"
                className="border-black hover:border-black rounded-lg text-black w-full md:w-[173px] p-0"
              >
                <Link
                  href={`/desk/deposit-request/${data?.id}`}
                  className="w-full p-[12px_16px] text-center"
                >
                  درخواست بیعانه
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const UserInDetail = ({ data }) => {
  const [showPhone, setShowPhone] = useState(false);
  return (
    <>
      <div className="w-full flex h-[50px] justify-between md:justify-start items-center gap-[10px]">
        <div className="flex justify-center items-center gap-[10px]">
          <div className="w-[50px] h-[50px] shrink-0 relative">
            <Image src={ProfilePic.src} alt="profilePic" fill />
          </div>
          <div className="w-auto 2xs:w-[156px] flex flex-col items-start gap-[9px]">
            <span className="text-right text-[8px] 2xs:text-[10px] font-[400] text-[#616161]">
              درخواست دهنده
            </span>
            <b className="font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
              {data?.user?.profile_name}
            </b>
          </div>
        </div>
        {data.status !== "USER_ACCEPTED" && data.status !== "FINISHED" && (
          <a
            href={`tel:${
              data && data?.user?.username ? "0" + data?.user?.username : ""
            }`}
            className="flex flex-col-reverse items-start "
          >
            <Button
              role="link"
              href={`tel:${
                data && data?.user?.username ? "0" + data?.user?.username : ""
              }`}
              variant="outlined"
              className="flex border-none bg-white flex-row items-center gap-[8px] cursor-pointer hover:border-none rounded-[7px]"
            >
              <span className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[14px] text-right">
                تماس
              </span>
              <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px] flex items-center">
                <Image className="object-fill" src={Phone} fill alt="phone" />
              </div>
            </Button>

            <span
              onClick={() =>
                data && data?.user?.username
                  ? setShowPhone(false)
                  : setShowPhone(true)
              }
              className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[15px] text-right cursor-pointer"
            >
              {data && data?.user?.username ? "0" + data?.user?.username : ""}
            </span>
          </a>
        )}
      </div>
    </>
  );
};

const PaymentPart = ({ data }) => {
  const calculateTotalCost = (invoice) => {
    const { service_cost, expertise, equipment_cost, transportation_cost } =
      invoice;

    let total = 0;
    if (
      service_cost &&
      service_cost !== null &&
      service_cost !== undefined &&
      service_cost !== 0 &&
      service_cost > 0
    )
      total += service_cost;
    if (
      expertise &&
      expertise !== null &&
      expertise !== undefined &&
      expertise !== 0 &&
      expertise > 0
    )
      total += expertise;
    if (
      transportation_cost &&
      transportation_cost !== null &&
      transportation_cost !== undefined &&
      transportation_cost !== 0 &&
      transportation_cost > 0
    )
      total += transportation_cost;

    return total;
  };

  const totalCost = calculateTotalCost(data?.invoice || {});

  return (
    <div
      dir="ltr"
      className="w-full h-[50px] flex flex-col justify-center items-start gap-[14px] self-stretch"
    >
      <span className="w-full text-[#0361FF] font-[700] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-center">
        سفارش شما با موفقیت به پایان رسید
      </span>
      <div className="w-full text-[#333334] font-[600] leading-[16px] text-[10px] 2xs:text-[12px] text-center flex justify-center gap-2">
        <div className="m-0 p-0 flex justify-center items-center gap-1">
          <span>تومان</span>
          <span>{totalCost}</span>
        </div>
        <span>: جمع کل صورتحساب</span>
      </div>
    </div>
  );
};

const BrandDetails = ({ data }) => {
  return (
    <ul className="list-disc w-full m-0">
      {data &&
        data?.answers.map((item) => (
          <li key={item?.id} className="my-2 text-[12px] 2xs:text-[14px]">
            <strong>{item?.title}</strong>
          </li>
        ))}
      <li className="my-2 text-[12px] 2xs:text-[14px]">
        سفارش برای
        <span> : </span>
        <strong>
          {data?.for_other
            ? "برای فرد دیگر " + "(" + data?.recipient + ")"
            : "برای خودم"}
        </strong>
      </li>
      <li className="my-2 text-[12px] 2xs:text-[14px]">
        توضیحات بیشتر
        <span> : </span>
        <strong>
          {data && data?.description === ""
            ? "توضیحی ارائه نشده است!"
            : data?.description}
        </strong>
      </li>
    </ul>
  );
};

const BrandExpertDetails = ({ data }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {data &&
        data?.answers.map((item) => (
          <div key={item?.id} className="w-full flex">
            <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[600] text-right">
              {item?.title}
            </span>
          </div>
        ))}

      <div className="w-full flex gap-4 ">
        <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
          سرویس برای:
        </span>
        <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[600] leading-[140%] text-right">
          {data?.for_other
            ? "برای فرد دیگر " + "(" + data?.recipient + ")"
            : data?.user?.profile_name}
        </span>
      </div>
      <div className="w-full flex items-start gap-4 ">
        <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
          توضیحات بیشتر:
        </span>
        <p className="text-[#333334] m-0 text-[10px] 2xs:text-[14px] font-[600] leading-[140%] text-right">
          {data?.description === ""
            ? "توضیحی ارائه نشده است!"
            : data?.description}
        </p>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
    </div>
  );
};

const MediaInOrder = ({ data }) => {
  const imgKeywords = [".jpeg", ".jpg", ".png", ".gif", ".webp", ".ico"];
  const videoKeywords = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
          تصاویر
        </span>
        <div className="w-full justify-center 2xs:justify-between sm:justify-start flex flex-wrap gap-4 ">
          {data?.files?.map((item) => {
            const isImg = data?.files
              ?.map((i) => i.file)
              .filter((it) =>
                imgKeywords.some((keyword) => it.includes(keyword))
              );
            const isVideo = data?.files
              ?.map((i) => i.file)
              .filter((it) =>
                videoKeywords.some((keyword) => it.includes(keyword))
              );
            return (
              <>
                {isImg.toString() === item?.file && item?.file && (
                  <div
                    className="w-[70%] 2xs:w-[47%] sm:w-[108px] h-[108px] relative rounded-md shadow-[0px_0px_10px_rgba(0,0,0,0.1)] overflow-hidden"
                    key={item?.id}
                  >
                    <Image
                      src={isImg.toString() === item?.file && item?.file}
                      alt="Media"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {isVideo.toString() === item?.file && item?.file && (
                  <video
                    src={isVideo.toString() === item?.file && item?.file}
                    controls
                    className="w-[70%] 2xs:w-[47%] sm:w-[108px] h-[108px] object-cover rounded-md shadow-[0px_0px_10px_rgba(0,0,0,0.1)] overflow-hidden"
                  >
                    مرورگر شما از تگ ویدیو پشتیبانی نمی کند.
                  </video>
                )}
              </>
            );
          })}
        </div>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
    </>
  );
};

export default MediaInOrder;

const Warning = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <b className="text-[#212121] text-[13px] 2xs:text-[14px] font-[600] leading-[140%] text-right">
        توجه:
      </b>
      <ul className="text-[#333334] text-[11px] 2xs:text-[12px] font-[400] leading-[140%] text-right">
        <li>
          از پرداخت هرگونه وجه اضافه به کارشناس خود داری فرمایید و در صورت
          درخواست وجه اضافه از طرف کارشناس مراتب را به پشتیبانی اطلاع دهید.
        </li>
        <li>
          در صورت درخواست لغو سرویس توسط کارشناس، از انجام آن اجتناب نموده و به
          پشتیبانی گزارش دهید.
        </li>
      </ul>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
    </div>
  );
};

const ExpertOnDetails = ({ data }) => {
  const [showPhone, setShowPhone] = useState(false);
  return (
    <>
      <div
        className={`w-full flex h-[50px] justify-between md:justify-start items-center ${
          data?.status === "REJECTED" ? "opacity-40" : ""
        } gap-[10px]`}
      >
        <div className="flex justify-center items-center gap-[10px]">
          <div className="w-[50px] h-[50px] shrink-0 relative">
            <Image
              src={data?.expert?.avatar ? data?.expert?.avatar : ProfilePic}
              alt="profilePic"
              fill
              className="rounded-[50%]"
            />
          </div>
          <div className="w-auto 2xs:w-[156px] flex flex-col items-start gap-[9px]">
            <span className="text-right text-[8px] 2xs:text-[10px] font-[400] text-[#616161]">
              کارشناس شما
            </span>
            <b className="font-[600] leading-[140%] 2xs:text-[12px] text-[10px] sm:text-[14px] text-right">
              {data?.expert?.name}
            </b>
          </div>
        </div>
        <a
          onClick={(e) => {
            if (data?.status === "REJECTED") {
              e.preventDefault();
            }
          }}
          className={`${data?.status === "REJECTED" ? "cursor-none" : ""}`}
          href={`tel:${data && data?.expert && data?.expert.user?.username}`}
        >
          <Button
            onClick={() => setShowPhone(true)}
            variant="outlined"
            className="flex border-none bg-white flex-row items-center gap-[8px] cursor-pointer hover:border-none rounded-[7px]"
          >
            <span className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[14px] text-right">
              تماس
            </span>
            <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px] flex items-center">
              <Image className="object-fill" src={Phone} fill alt="phone" />
            </div>
          </Button>

          <span
            onClick={() =>
              data && data?.expert ? setShowPhone(false) : setShowPhone(true)
            }
            className="text-[#0361FF] font-[600] leading-[140%] text-[13px] sm:text-[15px] text-right cursor-pointer"
          >
            {data && data?.expert && data?.expert.user?.username
              ? "0" + data?.expert.user?.username
              : ""}
          </span>
        </a>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
    </>
  );
};

const HelpDeposit = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={`${
          isOpen
            ? "fixed w-[100vw] h-[100vh] top-0 right-0 flex justify-center items-center bg-[#00000080] z-[100]"
            : "hidden"
        } `}
      >
        <div className="w-[95%] 2xs:w-[343px] rounded-lg flex flex-col p-5 bg-white gap-[10px] relative">
          <div
            className="w-[25px] h-[25px] 2xs:w-[32px] 2xs:h-[32px] p-[2px] 2xs:p-1 flex justify-center items-center bg-[#EFEFEF] rounded-full absolute top-4 right-4 cursor-pointer hover:bg-[#d6d6d6]"
            onClick={handleClick}
          >
            <CloseRounded className="text-[#33383F] w-full h-full" />
          </div>
          <h3 className="text-[14px] 2xs:text-[18px] font-[600] leading-[140%] text-center text-[#0361FF]">
            راهنمای پرداخت بیعانه
          </h3>
          <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
          <p className="text-justify text-[#535763] text-[10px] 2xs:text-[14px] leading-[150%] font-[400]">
            مشتری گرامی ممکن است سرویس درخواستی شما برای انجام نیاز به پرداخت
            بیعانه داشته باشد. در اینصورت شما میتوانید مبلغی را بعنوان بیعانه به
            حساب امن واریز نمایید . درصورتی که متخصص به هر دلیلی در انجام سرویس
            کوتاهی نماید، این مبلغ به حساب شما بازخواهد گشت.
          </p>
        </div>
      </div>
      <div className="w-full">
        <Button className=" flex gap-1 text-[#68A0FF]" onClick={handleClick}>
          <div className="w-6 h-6 p-[2px] flex items-center justify-center relative">
            <Image src={info} alt="help" fill />
          </div>
          راهنمای پرداخت بیعانه
        </Button>
      </div>
    </>
  );
};

const FixedHelpDeposit = ({ isOpen, handleClick }) => {
  return (
    <div
      className={`${
        isOpen
          ? "fixed w-[100vw] h-[100vh] top-0 right-0  bg-[#00000080] flex justify-center items-center z-[100]"
          : "hidden"
      } `}
    >
      <div className="w-[95%] 2xs:w-[343px] rounded-lg flex flex-col p-5 bg-white gap-[10px] relative">
        <div
          className="w-[25px] h-[25px] 2xs:w-[32px] 2xs:h-[32px] p-[2px] 2xs:p-1 flex justify-center items-center bg-[#EFEFEF] rounded-full absolute top-4 right-4 cursor-pointer hover:bg-[#d6d6d6]"
          onClick={handleClick}
        >
          <CloseRounded className="text-[#33383F] w-full h-full" />
        </div>
        <h3 className="text-[14px] 2xs:text-[18px] font-[600] leading-[140%] text-center text-[#0361FF]">
          راهنمای پرداخت بیعانه
        </h3>
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        <p className="text-justify text-[#535763] text-[10px] 2xs:text-[14px] leading-[150%] font-[400]">
          مشتری گرامی ممکن است سرویس درخواستی شما برای انجام نیاز به پرداخت
          بیعانه داشته باشد. در اینصورت شما میتوانید مبلغی را بعنوان بیعانه به
          حساب امن واریز نمایید . درصورتی که متخصص به هر دلیلی در انجام سرویس
          کوتاهی نماید، این مبلغ به حساب شما بازخواهد گشت.
        </p>
      </div>
    </div>
  );
};

const EndOrderDetails = ({ data }) => {
  const [offer, setOffer] = useState("0");
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <h4 className="text-[#212121] font-[600] leading-[140%] text-[10px] 2xs:text-[14px] m-0">
          شرح کار:
        </h4>
        <ul className="flex flex-col gap-2 m-0">
          <li className="text-[#333334] font-[400] text-[10px] 2xs:text-[12px] leading-[150%]">
            {data?.invoice?.description}
          </li>
        </ul>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        <li className="flex gap-4">
          <span className="text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
            هزینه سرویس:{" "}
          </span>
          <span className="text-[10px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
            {data?.invoice?.service_cost} تومان
          </span>
        </li>
        <li className="flex gap-4">
          <span className="text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
            هزینه ایاب و ذهاب:{" "}
          </span>
          <span className="text-[10px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
            {data?.invoice?.transportation_cost} تومان
          </span>
        </li>
        <li className="flex gap-4">
          <span className="text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
            مجموع هزینه ها:{" "}
          </span>
          <span className="text-[10px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
            {data?.invoice?.service_cost +
              data?.invoice?.transportation_cost +
              data?.invoice?.expertise}{" "}
            تومان
          </span>
        </li>
        <li className="flex gap-4">
          <span className="text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
            تخفیف:{" "}
          </span>
          <span
            className={`text-[10px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]`}
          >
            0 تومان
          </span>
        </li>
      </ul>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <div className="w-full flex items-center justify-between">
        <div className="text-[10px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
          <span>مبلغ پرداخت شده: </span>
          <span>
            {data?.invoice?.service_cost +
              data?.invoice?.transportation_cost +
              data?.invoice?.expertise}{" "}
            تومان
          </span>
        </div>
        {data && data.status === "FINISHED" && (
          <span className="text-[10px] 2xs:text-[14px] p-[4px_16px] bg-[#F9F9F9] text-[#333334] rounded-[4px]">
            {data && data?.invoice.payment_type === "cash"
              ? "پرداخت نقدی"
              : "پرداخت آنلاین"}
          </span>
        )}
      </div>
    </>
  );
};

const ExpertInvoiceData = ({ data }) => {
  const router = useRouter();

  const orderId = router.query.id;

  // const [offer, setOffer] = useState("0");
  // console.log("wqe", data.status);

  const calculateTotalCost = (invoice) => {
    const { service_cost, expertise, equipment_cost, transportation_cost } =
      invoice;

    let total = 0;
    if (
      service_cost &&
      service_cost !== null &&
      service_cost !== undefined &&
      service_cost !== 0 &&
      service_cost > 0
    )
      total += service_cost;
    if (
      expertise &&
      expertise !== null &&
      expertise !== undefined &&
      expertise !== 0 &&
      expertise > 0
    )
      total += expertise;
    if (
      equipment_cost &&
      equipment_cost !== null &&
      equipment_cost !== undefined &&
      equipment_cost !== 0 &&
      equipment_cost > 0
    )
      total += equipment_cost;
    if (
      transportation_cost &&
      transportation_cost !== null &&
      transportation_cost !== undefined &&
      transportation_cost !== 0 &&
      transportation_cost > 0
    )
      total += transportation_cost;
    if (
      data?.deposit?.deposit &&
      data?.deposit?.deposit !== null &&
      data?.deposit?.deposit !== undefined &&
      data?.deposit?.deposit !== 0 &&
      data?.deposit?.deposit > 0
    )
      total -= data?.deposit.deposit;

    return total;
  };

  const totalCost = calculateTotalCost(data?.invoice || {});

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <h4 className="text-[#212121] font-[600] leading-[140%] text-[12px] 2xs:text-[14px] m-0">
          شرح کار:
        </h4>
        {data?.invoice?.description && (
          <ul className="flex flex-col gap-2 m-0">
            <li className="text-[#333334] font-[400] text-[10px] 2xs:text-[12px] leading-[150%]">
              {data?.invoice?.description}
            </li>
          </ul>
        )}
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      {data?.deposit.deposit && (
        <>
          <div className="w-full flex items-center justify-start gap-1">
            <span className="text-[#333334] text-[12px] md:text-[14px] font-semibold">
              مبلغ بیعانه دریافت شده:
            </span>
            <span className="text-[#333334] text-[12px] md:text-[14px] font-semibold">
              {data?.deposit.deposit} تومان
            </span>
          </div>
          <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        </>
      )}

      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        {data?.invoice?.service_cost !== null &&
          data?.invoice?.service_cost !== undefined &&
          data?.invoice?.service_cost !== 0 &&
          data?.invoice?.service_cost > 0 && (
            <li className="flex gap-4">
              <span className="text-[12px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
                هزینه دستمزد:{" "}
              </span>
              <span className="text-[12px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
                {data.invoice.service_cost} تومان
              </span>
            </li>
          )}
        {data?.invoice?.expertise !== null &&
          data?.invoice?.expertise !== undefined &&
          data?.invoice?.expertise !== 0 &&
          data?.invoice?.expertise > 0 && (
            <li className="flex gap-4">
              <span className="text-[12px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
                هزینه کارشناسی:{" "}
              </span>
              <span className="text-[12px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
                {data.invoice.expertise} تومان
              </span>
            </li>
          )}
        {data?.invoice?.equipment_cost !== null &&
          data?.invoice?.equipment_cost !== undefined &&
          data?.invoice?.equipment_cost !== 0 &&
          data?.invoice?.equipment_cost > 0 && (
            <li className="flex gap-4">
              <span className="text-[12px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
                هزینه وسایل:{" "}
              </span>
              <span className="text-[12px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
                {data.invoice.equipment_cost} تومان
              </span>
            </li>
          )}
        {data?.invoice?.transportation_cost !== null &&
          data?.invoice?.transportation_cost !== undefined &&
          data?.invoice?.transportation_cost !== 0 &&
          data?.invoice?.transportation_cost > 0 && (
            <li className="flex gap-4">
              <span className="text-[12px] 2xs:text-[14px] font-[400] leading-[140%] text-[#333334]">
                هزینه ایاب و ذهاب:{" "}
              </span>
              <span className="text-[12px] 2xs:text-[14px] font-[600] leading-[140%] text-[#333334]">
                {data.invoice.transportation_cost} تومان
              </span>
            </li>
          )}
      </ul>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <div className="w-full flex items-center justify-between">
        <div className="text-[14px] font-[600] leading-[140%] text-[#333334]">
          <span>مبلغ کل قابل دریافت: </span>
          <span>{totalCost} تومان</span>
        </div>
        {data && data.status === "FINISHED" && (
          <span className="text-[14px] p-[4px_16px] bg-[#F9F9F9] text-[#333334] rounded-[4px]">
            {data && data?.invoice.payment_type === "cash"
              ? "پرداخت نقدی"
              : "پرداخت آنلاین"}
          </span>
        )}
      </div>
      <div className="flex items-center justify-center w-full">
        <Button
          variant="outlined"
          className="text-white hover:bg-[#0361FF] bg-[#0361FF]  rounded-lg"
          href={`/desk/expert-order/edit/${orderId}`}
        >
          ویرایش صورت حساب
        </Button>
      </div>
    </>
  );
};

const OptOut = ({ orderId }) => {
  const router = useRouter();
  const handleClick = async () => {
    try {
      await postUserOrderCanceling({ order_id: orderId, status: "canceled" });
      toast.success("انصراف از سفارش با موفقیت انجام شد");
      router.push("/order");
    } catch (error) {
      toast.error("متاسفانه مشکلی در انجام عملیات رخ داده است");
      return handleRequestError(err);
    }
  };
  const handleChangeExpert = () => {
    localStorage.setItem("orderId", orderId);

    const navigateRoute = `/services/select-expert?type=change`;
    router.push(navigateRoute);
  };
  return (
    <div className="flex gap-4 items-center">
      <Button
        onClick={handleClick}
        variant="outlined"
        className="text-[#F75555] border-[#F75555] hover:border-[#F75555] md:w-[173px] xs:h-[46px] rounded-[8px] p-2 text-[10px] xs:text-[16px] h-[38px] w-full"
      >
        انصراف از سفارش
      </Button>
      <ChangeExpertButton />
    </div>
  );
};

const Reject = ({ orderId }) => {
  const handleClick = async () => {
    try {
      await postExpertOrderRejecting({ order_id: orderId, status: "rejected" });
      // location.reload(true);
    } catch (err) {
      return handleRequestError(err);
    }
  };
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      className="text-[#F75555] border-[#F75555] hover:border-[#F75555] md:w-[173px] xs:h-[46px] rounded-[8px] p-2 text-[10px] xs:text-[16px] h-[38px] w-full"
    >
      رد کردن سفارش
    </Button>
  );
};

const RequestServices = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-2 text-[10px] xs:text-[16px]"
    >
      تکمیل سفارش
    </Button>
  );
};

const ReceiptDownload = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-2 text-[10px] xs:text-[16px]"
    >
      دانلود رسید
    </Button>
  );
};

const ReceiptShare = ({ id }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      className={`flex-[1_0_0] justify-center p-0 items-center h-[36px] rounded-[8px] [border:1px_solid_#1A1D1F] text-[#1A1D1F] text-[10px] 2xs:text-[14px] xs:text-[16px] md:text-[14px] lg:text-[16px]`}
    >
      اشتراک رسید
    </Button>
  );
};

const OrderTracking = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-2 text-[10px] xs:text-[16px]"
    >
      پیگیری
    </Button>
  );
};

const SubmitAgain = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-2 text-[10px] xs:text-[16px]"
    >
      ثبت مجدد سرویس
    </Button>
  );
};

const InvoiceDetails = ({ orderId }) => {
  return (
    <Button
      variant="contained"
      className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-0 text-[10px] xs:text-[16px]"
    >
      <Link href={`/desk/invoice-request/${orderId}`} className="p-2">
        ارائه صورتحساب
      </Link>
    </Button>
  );
};

const StartedDetails = ({ id, refetch }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postStarted = usePostExpertOrderStarting();
  const expertOrderReject = useExpertOrderReject();
  const queryyClient = useQueryClient();
  const expertGoingToWork = useExpertGoingToWork();

  const handleClick = async () => {
    await expertGoingToWork.mutateAsync(id);
    queryClient.invalidateQueries({
      queryKey: ["expertOrderDetail", id],
    });
    refetch();
  };
  // const handleClick = () => {
  //   postStarted.mutate(
  //     { order_id: id, confirmation: "accepted" },
  //     {
  //       onError: () => {
  //         queryClient.getQueriesData(["expertOrderDetail"]);
  //       },
  //       onSettled: () => {
  //         queryClient.invalidateQueries(["expertOrderDetail"]);
  //       },
  //       onSuccess: (data) => {
  //         queryClient.setQueryData(["expertOrderDetail"], data);
  //       },
  //     }
  //   );

  // };
  const handleRejectOrder = () => {
    expertOrderReject.mutate(id, {
      onError: () => {
        queryClient.getQueriesData(["expertOrderDetail"]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["expertOrderDetail"]);
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["expertOrderDetail"], data);
        router.push("/desk");
      },
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <Button
        onClick={handleRejectOrder}
        variant="outlined"
        className="text-[#F75555] border-[#F75555] hover:border-[#F75555] md:w-[173px] xs:h-[46px] rounded-[8px] p-2 text-[10px] xs:text-[16px] h-[38px] w-full"
      >
        لغو سفارش
      </Button>
      <Button
        onClick={handleClick}
        variant="contained"
        className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-2 text-[10px] xs:text-[16px]"
      >
        رفتن به محل کار
      </Button>
    </div>
  );
};

const GoingToWorkDetails = ({ id, refetch }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postStarted = usePostExpertOrderStarting();
  const expertOrderReject = useExpertOrderReject();

  const handleClick = async () => {
    await postStarted.mutateAsync({ order_id: id, confirmation: "accepted" });
    queryClient.invalidateQueries({
      queryKey: ["expertOrderDetail", id],
    });
    refetch();
  };

  const handleRejectOrder = () => {
    expertOrderReject.mutate(id, {
      onError: () => {
        queryClient.getQueriesData(["expertOrderDetail"]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["expertOrderDetail"]);
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["expertOrderDetail"], data);
        router.push("/desk");
      },
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <Button
        onClick={handleRejectOrder}
        variant="outlined"
        className="text-[#F75555] border-[#F75555] hover:border-[#F75555] md:w-[173px] xs:h-[46px] rounded-[8px] p-2 text-[10px] xs:text-[16px] h-[38px] w-full"
      >
        لغو سفارش
      </Button>
      <Button
        onClick={handleClick}
        variant="contained"
        className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-2 text-[10px] xs:text-[16px]"
      >
        شروع کار
      </Button>
    </div>
  );
};

const AcceptDetails = ({ orderId }) => {
  const queryClient = useQueryClient();
  const postExpertOrderAccepting = usePostExpertOrderAccepting();
  const handleClick = () => {
    postExpertOrderAccepting.mutate(
      { order_id: orderId, confirmation: "accepted" },
      {
        onError: () => {
          queryClient.getQueriesData(["expertOrderDetail"]);
        },
        onSettled: () => {
          queryClient.invalidateQueries(["expertOrderDetail"]);
        },
        onSuccess: (data) => {
          queryClient.setQueryData(["expertOrderDetail"], data);
        },
      }
    );
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      className="bg-[#0361FF] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-2 text-[10px] xs:text-[16px]"
    >
      قبول سرویس
    </Button>
  );
};

const SeeAndPay = ({ id, status }) => {
  return (
    <Button
      variant="contained"
      className="bg-[#0AD253] md:w-[173px] xs:h-[46px] rounded-[8px] h-[38px] w-full p-0 text-[10px] xs:text-[16px]"
    >
      {status === "PAYMENT" ? (
        <Link href={`/order/invoice-report/${id}`}>مشاهده و پرداخت</Link>
      ) : status === "DEPOSIT" ? (
        <Link href={`/order/deposit-payment/${id}`}>مشاهده و پرداخت</Link>
      ) : (
        ""
      )}
    </Button>
  );
};

const GeneralInformation = ({ data }) => {
  console.log("vds", data);
  return (
    <ul
      className="w-full flex flex-col m-0 font-[600] leading-[140%]"
      dir="rtl"
    >
      {data &&
        data?.answers.map((item) => (
          <li key={item?.id} className="text-[14px]">
            <strong>{item?.title}</strong>
          </li>
        ))}
    </ul>
  );
};

export {
  Details,
  Pay,
  TryAgain,
  CompleteOrder,
  Expert,
  PaymentPart,
  BrandDetails,
  Warning,
  ExpertOnDetails,
  HelpDeposit,
  EndOrderDetails,
  OptOut,
  RequestServices,
  OrderTracking,
  // Support,
  SeeAndPay,
  SubmitAgain,
  FixedHelpDeposit,
  Invoice,
  Accepted,
  Started,
  GoingToWork,
  User,
  GeneralInformation,
  UserInDetail,
  Reject,
  AcceptDetails,
  StartedDetails,
  InvoiceDetails,
  GoToLocation,
  BrandExpertDetails,
  MediaInOrder,
  UserStartOrderDetails,
  ExpertStartOrderDetails,
  ExpertInvoiceData,
  GoingToWorkDetails,
};
