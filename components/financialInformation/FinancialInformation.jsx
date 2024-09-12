import wallet from "../../public/icons/walletBlue.svg";
import graph from "../../public/icons/graph.svg";
import cooler from "../../public/images/cooler.png";
import bank from "../../public/images/bank.png";
import Image from "next/image";
import { Add, AddBox, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  useExpertIncreaseCredit,
  useGetCredit,
} from "../../core/hooks/useExpertApi";
import { useTransactionsList } from "../../core/hooks/useProfileApi";
import Link from "next/link";
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import formatNumberWithCommas, {
  formatDate,
} from "../../core/utils/formatNumbersWithCommas";
const FinancialInformation = ({ setClickSideBar }) => {
  const { data: credit, isLoading, refetch } = useGetCredit();
  const { data: transactions } = useTransactionsList();

  let number = credit?.credit;
  let numberString = Math.abs(number).toString();
  let length = numberString.length;
  const groups = [];
  for (var i = length; i > 0; i -= 3) {
    var group = numberString.substring(Math.max(0, i - 3), i);
    groups.unshift(group);
  }
  let result = groups.join("/");
  if (number < 0) {
    result = "-" + result;
  }
  return (
    <div
      dir="ltr"
      className="w-full rounded-2xl lg:px-20 lg:py-6 flex flex-col items-center gap-10 md:bg-white"
    >
      <div className="md:w-full md:px-4 flex flex-col gap-4 w-[100vw] bg-white px-4 sm:px-8 py-4 md:py-0">
        <div className="xs:w-full flex flex-wrap justify-between flex-row-reverse gap-4">
          <div className="w-full xs:w-[46%] h-[86px] p-3 bg-stone-50 rounded-2xl [border:1px_solid_#e5e7eb] flex-col justify-center items-center gap-4 inline-flex">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-zinc-900 text-lg font-semibold leading-[25.20px]">
                    کیف پول{" "}
                  </span>
                  <span className="text-zinc-900 text-[11px] font-normal leading-[18px]">
                    (تومان)
                  </span>
                </div>
                <span
                  className={`${
                    number < 0 ? "text-red-500" : "text-green-500"
                  } text-right text-lg font-bold leading-[25.20px]`}
                >
                  {result}
                </span>
              </div>
              <Image src={wallet} alt="wallet" className="w-10 h-10 p-1" />
            </div>
          </div>
          <div
            onClick={() => {
              setClickSideBar("credit");

              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="w-full xs:w-[46%] cursor-pointer h-[86px] p-3 bg-stone-50 rounded-2xl [border:1px_solid_#e5e7eb] flex-col justify-center items-center gap-4 inline-flex"
          >
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-3">
                <span className=" text-zinc-900 text-lg font-semibold leading-[25.20px]">
                  افزایش اعتبار
                </span>
              </div>
              <AddBox
                src={wallet}
                alt="wallet"
                className="text-[#00DC82] w-10 h-10"
              />
            </div>
          </div>
        </div>
        <span className="[border:1px_solid_#EFEFEF] w-full md:block rounded-[1px] hidden" />
      </div>
      <div className="w-full flex flex-col gap-4 px-4">
        {transactions?.reverse()?.map((transaction, index) => (
          <Accordion
            key={index}
            className="!rounded-2xl [border:1px_solid_rgb(229_231_235)] overflow-auto shadow-none"
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="w-full h-16 p-4  flex items-center flex-row-reverse justify-between cursor-pointer"
              sx={{
                "& .MuiAccordionSummary-content": {
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                },
              }}
            >
              <div className="flex h-full gap-[10px] items-center flex-row-reverse">
                <div
                  className={`hidden 2xs:flex w-10 h-10 justify-center items-center rounded-full ${
                    transaction?.type === "charge"
                      ? "bg-[#00DC82] bg-opacity-10"
                      : "bg-[#0057FF33]"
                  } `}
                >
                  {transaction?.type === "wage" ? (
                    <Image
                      src={
                        transaction?.order?.service?.category?.category_image
                      }
                      width={1000}
                      height={1000}
                      alt="cooler"
                      className="w-3/4 h-3/4 "
                    />
                  ) : transaction?.type === "charge" ? (
                    <Image
                      src={"/icons/plusCredit.svg"}
                      width={20}
                      height={20}
                      alt=""
                    />
                  ) : transaction?.type === "commission" ? (
                    <Image
                      src={"/images/commission.png"}
                      width={1000}
                      height={1000}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-zinc-900  text-right text-xs xs:text-base font-normal leading-snug">
                    {transaction?.description.replace("بابت", "")}
                  </span>
                  {transaction?.order?.order_track_id && (
                    <span className="text-blue-600 text-[8px] 2xs:text-[10px] xs:text-base font-normal leading-[18px]">
                      شماره سفارش {transaction?.order?.order_track_id}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`text-left flex items-center ${
                  ["wage"].includes(transaction?.type)
                    ? "text-green-400"
                    : ["charge"].includes(transaction?.type)
                    ? "text-black"
                    : "text-red-500"
                } text-[10px] 2xs:text-base font-bold leading-snug ml-1`}
              >
                {["charge", "wage"].includes(transaction?.type) ? "+" : "-"}
                تومان {formatNumberWithCommas(transaction?.amount.toString())}
              </span>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-4">
              <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-row-reverse justify-between">
                  <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                    :شرح تراکنش
                  </span>
                  <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                    {transaction?.order?.service?.category?.title}
                  </span>
                </div>
                <div className="w-full flex flex-row-reverse justify-between">
                  <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                    :نحوه پرداخت
                  </span>
                  <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                    آنلاین
                  </span>
                </div>
                <div className="w-full flex flex-row-reverse justify-between">
                  <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                    :ساعت و تاریخ
                  </span>
                  <p className="text-zinc-900 text-xs flex gap-1 flex-row-reverse xs:text-base font-normal leading-snug">
                    <span>{formatDate(transaction.created_at).day + " "} </span>
                    <span> {formatDate(transaction.created_at).month} </span>
                    <span> {formatDate(transaction.created_at).year}</span>-
                    <span>
                      {" "}
                      {formatDate(transaction.created_at).formattedTime} ساعت
                    </span>
                  </p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* <Accordion className="!rounded-2xl [border:1px_solid_rgb(229_231_235)] overflow-auto shadow-none">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="w-full h-16 p-4 bg-white flex items-center flex-row-reverse justify-between cursor-pointer"
            sx={{
              "& .MuiAccordionSummary-content": {
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
                alignItems: "center",
              },
            }}
          >
            <div className="flex h-full gap-[10px] items-center flex-row-reverse">
              <div className="hidden 2xs:flex w-10 h-10 justify-center items-center rounded-full bg-[#00DC821A]">
                <Add className="text-[#00DC82] w-3/4 h-3/4 " />
              </div>
              <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                افزایش اعتبار
              </span>
            </div>
            <span className="text-right text-zinc-900 text-[10px] 2xs:text-base font-bold leading-snug ml-1">
              +تومان 320/000
            </span>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-4">
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :شرح تراکنش
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  افزایش اعتبار حساب
                </span>
              </div>
              <div className="w-full flex flex-row-reverse justify-between items-center">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :بانک مبدأ
                </span>
                <div className="flex gap-2 items-center">
                  <Image
                    src={bank}
                    alt="bank"
                    className="hidden 2xs:block w-10 h-10"
                  />
                  <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                    6104-33**-****-1833
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :ساعت و تاریخ
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  1402/09/14 - 20:55
                </span>
              </div>
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :شماره پیگیری
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  141253356489524
                </span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="!rounded-2xl [border:1px_solid_rgb(229_231_235)] overflow-auto shadow-none">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="w-full h-16 p-4 bg-white flex items-center flex-row-reverse justify-between cursor-pointer"
            sx={{
              "& .MuiAccordionSummary-content": {
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
                alignItems: "center",
              },
            }}
          >
            <div className="flex h-full gap-[10px] items-center flex-row-reverse">
              <div className="hidden 2xs:flex w-10 h-10 justify-center items-center rounded-full">
                <Image src={graph} alt="graph" className="w-3/4 h-3/4" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  کسر کمیسیون
                </span>
                <span className="text-blue-600 text-[8px] 2xs:text-[10px] xs:text-base font-normal leading-[18px]">
                  بابت سفارش 14857
                </span>
              </div>
            </div>
            <div className="flex gap-1 items-center flex-row-reverse h-full">
              <span className="text-rose-600 text-[10px] 2xs:text-base font-bold leading-snug ml-1">
                -تومان 25/000
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-4">
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :شرح تراکنش
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  کمیسیون سفارش 14857
                </span>
              </div>
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :نحوه پرداخت
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  آنلاین
                </span>
              </div>
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :ساعت و تاریخ
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  1402/09/14 - 20:55
                </span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="!rounded-2xl [border:1px_solid_rgb(229_231_235)] overflow-auto shadow-none">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="w-full h-16 p-4 bg-white flex items-center flex-row-reverse justify-between cursor-pointer"
            sx={{
              "& .MuiAccordionSummary-content": {
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
                alignItems: "center",
              },
            }}
          >
            <div className="flex h-full gap-[10px] items-center flex-row-reverse">
              <div className="hidden 2xs:flex w-10 h-10 justify-center items-center rounded-full">
                <Image src={wallet} alt="graph" className="w-3/4 h-3/4" />
              </div>
              <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                تسویه
              </span>
            </div>
            <span className="text-green-500 text-[10px] 2xs:text-base font-bold leading-snug ml-1">
              +تومان 320/000
            </span>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-4">
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :شرح تراکنش
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  افزایش اعتبار حساب
                </span>
              </div>
              <div className="w-full flex flex-row-reverse justify-between items-center">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :بانک مبدأ
                </span>
                <div className="flex gap-2 items-center">
                  <Image
                    src={bank}
                    alt="bank"
                    className="hidden 2xs:block w-10 h-10"
                  />
                  <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                    6104-33**-****-1833
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :ساعت و تاریخ
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  1402/09/14 - 20:55
                </span>
              </div>
              <div className="w-full flex flex-row-reverse justify-between">
                <span className="text-zinc-400 text-[11px] xs:text-sm font-normal leading-tight">
                  :شماره پیگیری
                </span>
                <span className="text-zinc-900 text-xs xs:text-base font-normal leading-snug">
                  141253356489524
                </span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion> */}
      </div>
    </div>
  );
};

export { FinancialInformation };
