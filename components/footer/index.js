import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Divider } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Divider
        sx={{
          backgroundColor: "#F6F6F6",
          height: "2px",
          margin: "0 auto",
          width: "100%",
          mb: 4,
        }}
      />
      <footer className="bg-white px-[40px] lg:px-[70px] xl:px-[120px] py-3">
        <div className="flex justify-between flex-wrap gap-3 [border-bottom:1px_solid_#E2E6E9] p-4 px-[75px]">
          <div className="flex flex-col items-center">
            <Image
              className="mx-4"
              src="/icons/new-logo.svg"
              width={125}
              height={78}
              alt="icon"
            />
          </div>

          <div className="flex flex-col items-center">
            <Image
              className="mx-4"
              src="/icons/footer-safe.svg"
              width={54}
              height={54}
              alt="icon"
            />
            <p className="text-sm text-[#0361FF]">پرداخت امن</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              className="mx-4"
              src="/icons/footer-staff.svg"
              width={54}
              height={54}
              alt="icon"
            />
            <p className="text-sm text-[#0361FF]">متخصصین حرفه ای</p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              className="mx-4"
              src="/icons/footer-seal.svg"
              width={54}
              height={54}
              alt="icon"
            />
            <p className="text-sm text-[#0361FF]">گارانتی و پیگیری</p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              className="mx-4"
              src="/icons/footer-support.svg"
              width={54}
              height={54}
              alt="icon"
            />
            <p className="text-sm text-[#0361FF]">پشتیبانی حرفه ای</p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              className="mx-4"
              src="/icons/footer-gift.svg"
              width={54}
              height={54}
              alt="icon"
            />
            <p className="text-sm text-[#0361FF]">تخفیفات و جوایز</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <ul className="flex flex-col p-0 items-start text-sm font-medium text-[#2F3643] mt-10">
            <p className="font-[700] ">حرفه ای</p>
            <Link href="/about-us" className="  hover:underline   ">
              درباره ما{" "}
            </Link>

            <Link href="/" className="text-sm  hover:underline   ">
              چرا حرفه ای{" "}
            </Link>
            <Link href="/" className="text-sm  hover:underline   ">
              وبلاگ{" "}
            </Link>
            <Link href="/" className="text-sm hover:underline   ">
              ثبت نام متخصصین{" "}
            </Link>
          </ul>

          <ul className="flex flex-col p-0 items-start text-sm font-medium text-[#2F3643] mt-10">
            <p className="font-[700] ">خدمات مشتریان</p>

            <Link href="/legal/privacyPolicy" className="  hover:underline   ">
         حریم خصوصی و قوانین سایت
            </Link>

            <Link href="/" className="  hover:underline   ">
              پیشنهادات و انتقادات
            </Link>

            <Link href="/" className="text-sm  hover:underline   ">
              سنجش رضایتمندی
            </Link>
            <Link href="/" className="text-sm  hover:underline   ">
              سوالات متداول
            </Link>
            <Link href="/" className="text-sm hover:underline   ">
              شرایط استفاده{" "}
            </Link>
          </ul>

          <ul className="flex flex-col p-0 items-start text-sm font-medium text-[#2F3643] mt-10">
            <p className="font-[700] ">ارتباط با حرفه ای</p>
            <Link href="/" className="  hover:underline   ">
              تلفن پشتیبانی: 9100248
            </Link>

            <Link href="/" className="text-sm  hover:underline   ">
              ایمیل: info@Herfeei.com{" "}
            </Link>
            <Link href="/" className="text-sm  hover:underline   ">
              آدرس: بوشهر، خیابان دانشجو،
              <br />
              نبش شبنم 3 پلاک 23{" "}
            </Link>
          </ul>

          <div className="flex flex-col justify-center items-end basis-[30%] mt-10">
            <div className="flex">
              <Link
                href="https://trustseal.enamad.ir/?id=479217&Code=jzsiFZ45Ygx0PxZsqLVO9n2B7A0eyX2t"
                referrerPolicy="origin"
                target="_blank"
              >
                <div className="m-2 border-solid border-[#E2E6E9] inline-block rounded-lg">
                  <img
                    id="jzsiFZ45Ygx0PxZsqLVO9n2B7A0eyX2t"
                    referrerPolicy="origin"
                    className="m-1 cursor-pointer w-[69px] h-[69px]"
                    src="https://trustseal.enamad.ir/logo.aspx?id=479217&Code=jzsiFZ45Ygx0PxZsqLVO9n2B7A0eyX2t"
                    alt="e-namad"
                  />
                </div>
              </Link>
            </div>

            <ul className="p-0 flex flex-wrap text-sm font-medium text-[#2F3643]">
              <Link href="/">
                <Image
                  className="m-3"
                  src="/icons/footer-telegram.svg"
                  alt="telegram icon"
                  width={22}
                  height={18}
                />
              </Link>
              <Link href="/">
                <Image
                  className="m-3"
                  src="/icons/footer-youtube.svg"
                  alt="youtube icon"
                  width={24}
                  height={16}
                />
              </Link>
              <Link href="/">
                <Image
                  className="m-3"
                  src="/icons/footer-twitter.svg"
                  alt="twitter icon"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="/">
                <Image
                  className="m-3"
                  src="/icons/footer-aparat.svg"
                  alt="aparat icon"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="/">
                <Image
                  className="m-3"
                  src="/icons/footer-instagram.svg"
                  alt="instagram icon"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="/">
                <Image
                  className="m-3"
                  src="/icons/footer-linkdin.svg"
                  alt="linkdin icon"
                  width={24}
                  height={24}
                />
              </Link>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
