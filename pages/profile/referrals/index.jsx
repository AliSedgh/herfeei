import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import deskBg from "../../../public/images/desktop-invite.svg";
import mobileBg from "../../../public/images/mobile-invite.svg";
import Button from "@mui/material/Button";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

import {
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  InstapaperShareButton,
} from "next-share";
import { useGetInvitationCode } from "../../../core/hooks/useProfileApi";

export default function Referrals() {
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const { data, isLoading } = useGetInvitationCode();
  const [showCopy, setShowCopy] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (showCopy) {
      setTimeout(() => {
        setShowCopy(false);
      }, [1000]);
    }
  }, [showCopy]);

  const handleCopyAndSendSms = async () => {
    try {
      await navigator.clipboard.writeText(data?.invitation_link);

      const smsUrl = `sms:?body=${encodeURIComponent(data?.invitation_link)}`;
      window.location.href = smsUrl;
    } catch (err) {
      console.error("خطا در کپی کردن متن:", err);
    }
  };
  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="معرفی به دوستان" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        <div className="-md:hidden p-6 m-2 md:m-0 md:mt-4 bg-white rounded-xl w-full flex justify-center items-center">
          <Image src={deskBg} alt="bg" className="w-[100%]" />
        </div>
        <div className="md:hidden p-6 m-2 md:m-0 md:mt-4 bg-white rounded-xl w-full flex justify-center items-center">
          <Image src={mobileBg} alt="bg" sizes="100vw" className="w-[100%]" />
        </div>

        <div className="flex justify-center flex-col items-center">
          <div className="flex-wrap lg:w-[80%] xl:w-[60%] flex items-center justify-center m-4 border-[#EBEBEB] border-2 border-solid rounded-xl">
            <div className="h-[2.75rem] flex items-center m-2 border-[#EBEBEB] border-2 border-solid rounded-xl bg-[#F8F8F9]">
              <p className="text-[#ABADB8]">
                کد دعوت شما :{data?.invitation_code}
              </p>
              <Image
                className="mx-4 cursor-pointer"
                src="/icons/copy.svg"
                width={24}
                height={24}
                alt="icon"
                onClick={async () => {
                  await navigator.clipboard.writeText(data?.invitation_link);
                  setShowCopy(true);
                }}
              />
            </div>
            <Button
              variant="contained"
              sx={{
                fontSize: "14px",
                m: ".4rem",
                height: "2.375rem",
                borderRadius: "2rem",
              }}
              onClick={handleOpen}
            >
              دعوت از دوستان
            </Button>
          </div>
          <p className="text-[#424242] text-sm">
            با دعوت از دوستان خود از طریق کد معرف با هربار استفاده آنها از
            خدمات”حرفه ای” دو درصد از مبلغ سفارش آنها را هدیه بگیرید
          </p>

          <Modal
            open={open}
            onClose={handleClose}
            className="flex items-center justify-center"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box className="bg-white p-4 rounded-2xl flex flex-col justify-center items-center">
              <p
                id="modal-description"
                className="text-[#616161] font-[600] text-xs"
              >
                اشتراک گذاری از طریق{" "}
              </p>

              <div className="flex items-center justify-center ">
                <InstapaperShareButton url={"https://herfeei.com/"}>
                  <Image
                    className=" rounded-lg m-2 cursor-pointer hover:scale-105 transition-all	duration-300"
                    src="/icons/share-instagram.svg"
                    alt="icon"
                    width={47}
                    height={47}
                  />
                </InstapaperShareButton>

                <EmailShareButton url={"https://herfeei.com/"}>
                  <Image
                    className=" rounded-lg m-2 cursor-pointer hover:scale-105 transition-all	duration-500"
                    src="/icons/share-gmail.svg"
                    alt="icon"
                    width={47}
                    height={47}
                  />
                </EmailShareButton>
                {/* <Image
                  className=" rounded-lg m-2 cursor-pointer hover:scale-105 transition-all	duration-500"
                  src="/icons/share-sms.svg"
                  alt="icon"
                  width={47}
                  height={47}
                /> */}
                <WhatsappShareButton url={"https://herfeei.com/"}>
                  <Image
                    className=" rounded-lg m-2 cursor-pointer hover:scale-105 transition-all	duration-500"
                    src="/icons/share-whatsapp.svg"
                    alt="icon"
                    width={47}
                    height={47}
                  />
                </WhatsappShareButton>

                <TelegramShareButton url={"https://herfeei.com/"}>
                  <Image
                    className=" rounded-lg m-2 cursor-pointer hover:scale-105 transition-all	duration-500"
                    src="/icons/share-telegram.svg"
                    alt="icon"
                    width={47}
                    height={47}
                  />
                </TelegramShareButton>
                <div
                  style={{ border: "2.5px solid #f5f5f4" }}
                  onClick={handleCopyAndSendSms}
                  className="w-[48px] h-[48px] mb-2 rounded-xl bg-[#FCFCFC] flex items-center justify-center cursor-pointer hover:scale-105 transition-all	duration-500"
                >
                  <SmsFailedIcon className="text-blue-500 " />
                </div>
              </div>
              <div className="h-[2.75rem] flex items-center m-2 px-2 text-sm border-[#EBEBEB] border-2 border-solid rounded-xl bg-[#F8F8F9]">
                <p className="text-[#ABADB8]">
                  کد دعوت شما : {data?.invitation_code}
                </p>
                <Image
                  className="mx-4 cursor-pointer"
                  src="/icons/copy.svg"
                  width={24}
                  height={24}
                  alt="icon"
                  onClick={async () => {
                    await navigator.clipboard.writeText(data?.invitation_link);
                    setShowCopy(true);
                  }}
                />
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <CopyModal show={showCopy} />
    </>
  );
}

const CopyModal = ({ show }) => {
  return (
    <div
      className={`bg-[rgba(0,0,0,.5)] fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] text-center text-white py-2 rounded-md text-sm ${
        show ? "opacity-1" : "opacity-0"
      } transition-all duration-300 ease`}
    >
      متن با موفقیت کپی شد
    </div>
  );
};
