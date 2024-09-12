import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import RTLTextField from "../../../components/RTLTextField";
import { InputAdornment } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useRouter } from "next/router";
import SupportItem from "../../../components/supportItem";
import FilterButtons from "../../../components/filterButtons";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";

const data = [
  {
    title: "شرایط و ضوابط عمومی",
    subtitle:
      "حرفه‌ای یک اپلیکیشن ارائه خدمات در منزل و محل کار می‌باشد که به کاربران خود این امکان را میدهد تا به متخصص دارای صلاحیت و با تجربه جهت انجام سرویس ها و خدمات درخواستی خود به راحتی دست پیدا کنند. متخصصان و تکنسین های فنی نیز میتوانند با ارائه مدارک لازم و مصاحبه های فنی، در حرفه‌ای ثبتنام کرده و پیشنهاد کار دریافت کنند. اگر شما یک متخصص در زمینه خدمات می‌باشید میتوانید با ثبت درخواست همکاری در اپلیکیشن حرفه‌ای همکاری خود را با این مجموعه آغاز نمایید. همچنین اگر تخصصی ندارید و میخواهید صاحب شغل شوید،‌ میتوانید درخواست آموزش ثبت کنید و بعد از گذراندن دوره های آموزشی جذب حرفه‌ای شوید و سفارش کال دریافت نمایید. ",
  },
  {
    title: "چطور سفارش بدهیم؟",
    subtitle:
      "شما میتوانید با انتخاب شهر موردنظر خود و سپس جستجوی سرویس مورد نیاز، به صفحه سرویس مورد نظرتان مراجعه کرده و شروع سفارش را بزنید. در ادامه با پاسخ به چند سوال و انتخاب تاریخ و آدرس ما میتوانیم بهترین متخصصان با شرایط مشخص شده را به شما عزیزان معرفی نماییم. شما میتوانید لیست متخصصین خود را اولویت بندی نموده و ثبت سفارش را نهایی کنید. بعد از آن منتظر  تایید سفارش از سوی متخصص بمانید تا کمتر از ۵ دقیقه متخصص پیشنهاد شما را تایید نماید.",
  },
  {
    title: "چطور سفارش خود را کنسل کنیم؟",
    subtitle:
      "کنسل کردن سفارش از لحظه ثبت سفارش تا قبل از شروع کار متخصص امکانپذیر میباشد و شما عزیزان میتوانید در صورت انصراف از درخواست خود دکمه لغو درخواست را بزنید یا درصورتی که از متخصص تخصیص داده شده راضی نبودید کار را به شخص دیگری واگذار نمایید.",
  },
  {
    title: "دریافت امتیاز معرفی دوستان ",
    subtitle:
      "حرفه‌ای برای دعوت از دوستانتان به استفاده از سرویس های این برنامه پاداش نقدی درنظر گرفته است. شما میتوانید با معرفی دوستانتان از طریق لینک معرفی خود آنها را زیر مجموعه خود قراردهید و با هر بار درخواست سرویس دوستانتان مبلغ ۳۰۰/۰۰۰ریال به عنوان اعتبار هدیه از حرفه‌ای دریافت نمایید.",
  },
];

const contactWays = [
  // {
  //   icon: "/icons/chat.svg",
  //   title: "چت زنده",
  //   subtitle: "از 9 صبح تا 9 شب",
  // },
  // {
  //   icon: "/icons/online-call.svg",
  //   title: "تماس آنلاین",
  //   subtitle: "از 9 صبح تا 9 شب",
  // },
  {
    icon: "/icons/call.svg",
    title: "تماس",
    subtitle: "از 9 صبح تا 9 شب",
    link: "tel:09129999999",
  },
  {
    icon: "/icons/our-website.svg",
    title: "وبسایت ما",
    subtitle: "www.herfeei.com",
    link: "https://www.herfeei.com",
  },
  {
    icon: "/icons/our-instagram.svg",
    title: "اینستاگرام ما",
    subtitle: "Herfeei_com@",
    link: "https://www.instagram.com/Herfeei_com",
  },
  {
    icon: "/icons/our-email.svg",
    title: "ایمیل به ما",
    subtitle: "info@herfeei.com",
    link: "mailto:info@herfeei.com",
  },
];

const filters = [
  { id: 1, name: "عمومی" },
  { id: 2, name: "پرداخت" },
  { id: 3, name: "سرویس ها" },
  { id: 4, name: "حساب کاربری" },
];

export default function Guide() {
  const router = useRouter();
  const { param } = router.query;
  const windowWidth = useWindowWidth();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("عمومی");

  useEffect(() => {
    if (param && param === "faqs") {
      setTab(0);
    } else setTab(1);
  }, [param]);
  const filterData = () => {
    return data.filter((item) => {
      return item.title.includes(search) || item.subtitle.includes(search);
    });
  };

  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="راهنمای استفاده" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        {tab === 0 && (
          <div className="text-center">
            <RTLTextField
              id="search"
              autoComplete="off"
              sx={{ width: "97%" }}
              variant="outlined"
              name="search"
              placeholder="جستجو در میان سوالات"
              hiddenLabel
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div className="flex items-center cursor-pointer">
                      <Image
                        className=" rounded-lg"
                        src="/icons/search.svg"
                        alt="edit icon"
                        width={20}
                        height={15}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}

        <div className="flex">
          <div
            className="cursor-pointer w-full text-center font-[600]"
            style={
              tab === 0
                ? { borderBottom: "solid 4px #3581FF" }
                : { borderBottom: "solid 2px gray" }
            }
            onClick={() => setTab(0)}
          >
            <p className={tab === 0 ? "text-[#3581FF]" : "text-[#B1B1B1]"}>
              سوالات پرتکرار
            </p>
          </div>
          <div
            className="cursor-pointer w-full text-center font-[600] "
            style={
              tab === 1
                ? { borderBottom: "solid 4px #3581FF" }
                : { borderBottom: "solid 2px gray" }
            }
            onClick={() => setTab(1)}
          >
            <p className={tab === 1 ? "text-[#3581FF]" : "text-[#B1B1B1]"}>
              تماس با ما
            </p>
          </div>
        </div>

        {tab === 0 && (
          <div>
            <FilterButtons
              filters={filters}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <div className="p-6 m-2 md:m-0 md:mt-4 bg-white rounded-xl w-full ">
              {filterData().map((item, i) => (
                <Accordion
                  key={i}
                  sx={{
                    bgcolor: "#FAFAFA",
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
                    <h1 className="text-base font-[700]"> {item.title}</h1>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderRadius: 3 }}>
                    <p className="text-sm">{item.subtitle}</p>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <div className="p-6 m-2 md:m-0 md:mt-4 bg-white rounded-xl w-full ">
              <div className="flex flex-wrap ">
                {contactWays.map((item, i) => (
                  <SupportItem key={i} {...item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
