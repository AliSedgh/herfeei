import React from "react";
import { useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import BackButton from "../../../components/backButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useWindowWidth from "../../../core/utils/useWindowWidth";

const data = [
  {
    title: "تعمیر کولر",
    subtitle: "سفارش شماره 53783 ",
    amount: "200000",
    received: false,
  },
  {
    title: "پاداش معرفی",
    subtitle: "سفارش شماره 53783 ",
    amount: "200000",
    received: true,
  },
  {
    title: "پاداش معرفی",
    subtitle: "سفارش شماره 53783 ",
    amount: "200000",
    received: false,
  },
];

export default function Gifts() {
  const router = useRouter();
  const windowWidth = useWindowWidth();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="اعتبار هدیه" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        <div className="flex flex-wrap  justify-between items-center ml-4">
          <div className="basis-[100%] lg:basis-[46%]">
            <div className="m-2 w-full rounded-xl flex items-center justify-center p-1 cursor-pointer ">
              <Image
                src="/icons/crown.svg"
                alt="crown icon"
                width={99}
                height={99}
              />
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm text-[#1A1D1F] mx-4">
                  مجموع اعتبار هدیه شما
                </p>
                <p className="font-bold text-[#0361FF]">10000 تومان</p>
              </div>
            </div>
          </div>

          <div className="basis-[100%] lg:basis-[46%]">
            <p className="text-xs mr-4">
              اعتبار هدیه بعد ازاتمام 5 سفارش به شکل نقدی قابل دریافت خواهد بود.
            </p>
            <div className=" m-2 w-full rounded-xl border-[#EBEBEB] border-2 border-solid flex items-center justify-center p-1 cursor-pointer ">
              <Image
                src="/icons/step.svg"
                alt="crown icon"
                width={205}
                height={15}
              />
              <Button
                disabled
                sx={{ margin: 1, borderRadius: 3, fontWeight: 1000 }}
                variant="contained"
              >
                دریافت
              </Button>
            </div>
            <div className="flex justify-end" onClick={handleOpen}>
              <span className="text-xs text-[#0361FF]">قوانین استفاده</span>
              <Image
                className="mx-2"
                src="/icons/question.svg"
                alt="question icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <h1 className="text-base font-normal">لیست هدایا</h1>

        {data.map((item, i) => (
          <div
            key={i}
            className="h-[4rem] m-2 rounded-xl border-[#EBEBEB] border-2 border-solid flex justify-between items-center p-1 cursor-pointer "
          >
            <div className="flex flex-wrap">
              <h1 className="text-base font-normal my-0">{item.title}</h1>
              <p className="text-xs text-[#0361FF] mr-2 my-1">
                {item.subtitle}
              </p>
            </div>

            <div className="flex items-center ">
              {item.received && (
                <p className="text-xs whitespace-pre	 m-0 text-[#333334] font-semibold p-1 rounded-lg border-[#999CA0] border-2 border-solid  md:ml-4 ml-2">
                  دریافت شده
                </p>
              )}
              <p
                className="text-sm text-[#1EDF0D] md:ml-4 ml-2"
                style={item.received ? { opacity: ".5" } : {}}
              >
                {" "}
                {item.amount}تومان +
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="bg-white p-4 rounded-2xl flex flex-col justify-center items-center">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-base font-[700]">
              راهنمای استفاده از اعتبار هدیه
            </h2>
            <Image
              className="m-1"
              src="/icons/close.svg"
              alt="close icon"
              width={10}
              height={10}
              onClick={handleClose}
            />
          </div>

          <p className="text-[#424242] text-sm font-[600] w-[80vw]">
            ۱-هر سفارش سرویس به میزان ۳درصد از مبلغ پرداختی آن بعنوان هدیه به
            شما تعلق میگیرد.
            <br />
            <br />
            ۲-درصورتی که سرویس درخواستی برای شخص دیگری باشد نیز این میزان هدیه
            به شما تعلق خواهد گرفت.
            <br />
            <br />
            ۳-درصورتی که دوستانتا با کد معرف شما در حرفه ای ثبتنام نمایند، با هر
            بار درخواست سرویس توسط آنها ۲درصد از مبلغ سرویس به عنوان هدیه به شما
            تعلق میگیرد.
            <br />
            <br />
            ۴-اعتبار هدیه بصورت نقدی و همچنین جهت پرداخت صورت حساب خدمات دریافتی
            شما قابل استفاده میباشد.
            <br />
            <br />
            5- تنها درصورت انجام ۵سفارش از طریق حساب کاربری خود امکان استفاده از
            هدایا را دارا میباشید.
            <br />
            <br />
            6- درصورتی که بصورت نقدی اعتبار هدیه را دریافت کنید مجددا باید برای
            دریافت اعتبارهای هدیه بعدی ، ۵سفارش دیگر را به پایان برسانید.
          </p>
        </Box>
      </Modal>
    </>
  );
}
