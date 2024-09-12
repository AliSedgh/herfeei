import React from "react";
import { useRouter } from "next/router";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import useWindowWidth from "../../core/utils/useWindowWidth";

export default function Banner() {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isProfilePage = router.pathname.startsWith("/profile");

  return (
    <div
      className={`${
        windowWidth < 393 && "w-[95%] items-center"
      } flex md:flex-row flex-col-reverse w-fit mx-auto align-middle justify-center mt-10 md:mt-8 ${
        isProfilePage
          ? ""
          : "[box-shadow:0px_0px_8px_0px_rgba(97,_100,_117,_0.20)]"
      } md:[box-shadow:0px_0px_0px_0px] rounded-b-[16px]`}
    >
      <div
        className={`${windowWidth < 393 && "w-[95%] translate-x-2"}
          ${windowWidth <= 768 ? "-mt-2 rounded-lg" : ""}
        flex flex-col bg-white xl:pl-[31px] md:[box-shadow:0px_0px_8px_0px_rgba(97,_100,_117,_0.20)] w-[361px] md:w-fit rounded-r-2xl p-4 max-h-[auto] md:max-h-[135px] lg:max-h-[118px] xl:max-h-[145px] ml-[-1rem] translate-y-[-25px] md:translate-y-0`}
      >
        <p
          className={`text-xs xl:leading-[20px] xl:text-[14px] text-[#9C9C9C] md:text-[#29303C] m-0`}
        >
          اگر شما یک متخصص در زمینه خدمات فنی می باشید، تیم “حرفه‌ای” از شما
          دعوت می نماید تا به مجموعه متخصصان ما بپیوندید و یا تخصصی ندارید ولی
          مشتاق هستید که در یک یا چند تخصص آموزش ببینید و پس از آن فرصت کار در
          مجموعه ما را داشته باشید می توانید از طریق راه های زیر اقدام کنید.{" "}
        </p>
        <div
          className={
            "flex items-center justify-center md:justify-start gap-[15px] mt-8 md:mt-3 xl:mt-6 "
          }
        >
          <Button
            onClick={() => {
              localStorage.removeItem("sign_up_type");
              localStorage.setItem("sign_up_type", "expert");
              router.push("/expert-sign-up");
            }}
            variant="contained"
            sx={
              windowWidth > 355
                ? {
                    m: ".5rem",
                    height: "2.25rem",
                    borderRadius: ".6rem",
                    margin: "0",
                    fontSize: "14px",
                  }
                : {
                    py: "25px",
                    m: ".5rem",
                    height: "2.25rem",
                    borderRadius: ".6rem",
                    margin: "0",
                    fontSize: "14px",
                  }
            }
          >
            ثبت نام متخصص
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("sign_up_type");
              localStorage.setItem("sign_up_type", "educator");
              router.push("/expert-sign-up");
            }}
            variant="outlined"
            color="inherit"
            sx={
              windowWidth > 355
                ? {
                    m: ".5rem",
                    height: "2.25rem",
                    borderRadius: ".6rem",
                    margin: "0",
                    fontSize: "14px",
                  }
                : {
                    py: "25px",
                    m: ".5rem",
                    height: "2.25rem",
                    borderRadius: ".6rem",
                    margin: "0",
                    fontSize: "14px",
                  }
            }
          >
            آموزش و ثبت نام
          </Button>
        </div>
      </div>
      <Link href="/">
        <Image
          className="mt-[-22px] translate-y-[-20px] md:translate-y-[13px] xl:translate-y-[9px]"
          src="/images/banner-mobile.png"
          width={
            windowWidth >= 1280
              ? 420
              : windowWidth < 1280 && windowWidth > 393
              ? 361
              : isProfilePage
              ? (windowWidth * 85) / 100
              : (windowWidth * 95) / 100
          }
          height={
            (windowWidth <= 768 ? 140 : windowWidth > 1024 ? 128 : 145) |
            (windowWidth >= 1280 && 160)
          }
          quality={100}
          alt="banner"
        />
      </Link>
    </div>
  );
}
