import React from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import BackButton from "../../../components/backButton";
import Button from "@mui/material/Button";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import {
  useTransactionsList,
  useUserTransactions,
} from "../../../core/hooks/useProfileApi";
import { formatDate } from "../../../core/utils/formatNumbersWithCommas";

export default function Transactions() {
  const windowWidth = useWindowWidth();

  const { data: transactions } = useUserTransactions();
  console.log("transactions", transactions);

  return (
    <>
      <div className="flex flex-col min-w-[60%] md:w-full mx-3 md:mx-0">
        {windowWidth >= 768 ? null : <BackButton title="لیست تراکنش" />}
        <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-full">
          {transactions?.length === 0 && (
            <p className="text-center mt-5">تراکنشی موجود نیست</p>
          )}
          {transactions?.reverse()?.map((item, i) => (
            <Accordion
              key={i}
              sx={{
                borderRadius: 3,
                marginBottom: 1,
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                sx={{ borderRadius: 3 }}
                expandIcon={<ExpandMoreIcon />}
              >
                <div className="flex justify-between w-full">
                  <div className="flex items-center">
                    {/* <Image
                      className=" mx-2 my-0"
                      src={item.icon}
                      alt="service image"
                      width={32}
                      height={32}
                    /> */}
                    <div className="flex flex-col">
                      <h1 className="text-base font-normal my-0">
                        {item.description}
                      </h1>
                      {item?.order?.order_track_id && (
                        <p className="text-xs mr-2 flex items-center gap-2  my-1">
                          <span className="text-gray-600">کد پیگیری: </span>
                          <span className=" text-[#0361FF]">
                            {item?.order?.order_track_id}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex">
                    <p
                      className="text-sm md:ml-4 ml-2"
                      style={
                        ["wage", "deposit"].includes(item.type)
                          ? { color: "red" }
                          : { color: "#1EDF0D" }
                      }
                    >
                      {["wage", "deposit"].includes(item.type)
                        ? item.amount + "تومان -"
                        : item.amount + "تومان +"}
                    </p>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ borderRadius: 3 }}>
                <div className="flex justify-between">
                  <p className="text-sm text-[#999BA7]">شرح تراکنش:</p>
                  <p className="text-sm text-[#999BA7]">
                    {item?.type === "charge"
                      ? "بابت افزایش اعتبار"
                      : item?.order?.service?.category?.title}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-[#999BA7]">ساعت و تاریخ: </p>
                  <p className="text-sm text-[#999BA7]">
                    <span>{formatDate(item.created_at).day + " "} </span>
                    <span> {formatDate(item.created_at).month} </span>
                    <span> {formatDate(item.created_at).year}</span>-
                    <span>
                      {" "}
                      {formatDate(item.created_at).formattedTime} ساعت
                    </span>
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
