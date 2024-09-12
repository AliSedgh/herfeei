import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Modal, Paper } from "@mui/material";
import DefaultProfileSvg from "../../public/icons/avatar-deafult.svg";
import {
  useGetAvatarList,
  useGetProfileAvatar,
  usePutUpdateProfileAvatar,
} from "../../core/hooks/useProfileApi";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

export default function ProfileHeader() {
  const [isPaperOpen, setIsPaperOpen] = useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const paperRef = useRef(null);
  const containerRef = useRef(null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetProfileAvatar();
  const { data: getAvatarList, isLoading: getAvatarListIsLoading } =
    useGetAvatarList();
  const putUpdateProfileAvatar = usePutUpdateProfileAvatar();

  // console.log(
  //   "ldas",
  //   !getAvatarListIsLoading && getAvatarList && getAvatarList?.data
  // );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        paperRef.current &&
        !paperRef.current.contains(event.target) &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsPaperOpen(false);
      }
    }

    // console.log(data)

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [paperRef, containerRef]);

  const handleSelectAvatar = (avatarId) => {
    putUpdateProfileAvatar.mutate(
      { avatar: avatarId },
      {
        onError: (err) => {
          queryClient.getQueriesData(["getProfileAvatar"]);
        },
        onSettled: (res) => {
          queryClient.invalidateQueries(["getProfileAvatar"]);
        },
        onSuccess: (res) => {
          queryClient.setQueryData(["getProfileAvatar"], res);
          setIsPaperOpen((prev) => !prev);
          if (res?.message === "آواتار انتخاب نشده است") {
            toast.error(res?.message);
          } else if (res?.message === "آواتار با موفقیت تغییر یافت") {
            toast.success(res?.message);
          } else {
            toast.error("خطا در ارتباط با سرور");
          }
        },
      }
    );
  };

  return (
    <div className="pt-1 md:flex md:mb-[.5rem] md:h-[9.5rem] relative ">
      <div className="bg-[#0361FF] md:bg-transparent absolute top-0 h-[10rem] w-full z-0 rounded-b-xl " />

      <div className="mx-6 flex flex-col items-center bg-white rounded-xl  mt-[6rem] md:flex-row md:mt-2 relative">
        <Image
          ref={containerRef}
          onClick={() => setIsPaperOpen((prev) => !prev)}
          className="mx-4 mt-[-4rem] md:mt-0 rounded-[50%] shadow-md cursor-pointer"
          src={
            !isLoading && data?.data?.avatar
              ? data?.data?.avatar
              : DefaultProfileSvg.src
          }
          width={115}
          height={115}
          alt=""
        />
        <div className="flex flex-col items-center px-3">
          <p className="mt-2 mb-0 text-[#1A1D1F] text-base font-bold">
            {user?.full_name || "کاربر جدید"}
          </p>
          <p className="mb-2 mt-0 text-[#999BA7] text-base">
            {user?.user.username && "0" + user?.user.username}
          </p>
        </div>
        {isPaperOpen && (
          <Paper
            ref={paperRef}
            className="absolute top-[105%] right-0 z-[1000] bg-[white] w-[100%] md:w-auto md:min-w-[100%] rounded-lg p-4 flex gap-2 md:gap-4 justify-center items-center flex-wrap"
          >
            {!getAvatarListIsLoading && getAvatarList ? (
              getAvatarList?.data?.map((item) => (
                <>
                  <div className="overflow-hidden relative w-[100px] h-[100px]">
                    <Image
                      onClick={() => handleSelectAvatar(item?.id)}
                      className="rounded-[50%] shadow-md cursor-pointer"
                      src={item?.avatar ? item?.avatar : DefaultProfileSvg.src}
                      fill
                      alt=""
                    />
                  </div>
                </>
              ))
            ) : (
              <p>آواتار موجود نیست</p>
            )}
          </Paper>
        )}
      </div>
      <div className="mx-6 flex flex-col gap-2 2xs:flex-row 2xs:gap-0 rounded-xl mt-2 md:mx-0 z-10">
        <Link
          href="/profile/credit"
          style={
            router.pathname === "/profile/credit"
              ? { background: "#CDDFFF" }
              : {}
          }
          className="flex bg-white  items-center justify-around 2xs:ml-1 rounded-lg md:flex-col md:justify-center md:px-8 w-full md:w-auto"
        >
          <Image
            className="bg-[#00DC82] rounded-lg p-[.4rem] cursor-pointer m-3 md:m-0 "
            src="/icons/plus.svg"
            width={32}
            height={32}
            alt="icon"
          />
          <div className="m-[.3rem] rounded-xl flex flex-col items-center">
            <p className="mt-2 mb-0 text-[#1A1D1F] text-base font-bold">
              افزایش اعتبار
            </p>
            <p className="mb-2 mt-0 text-[#00DC82] text-xs">
              موجودی شما {user?.credit} تومان
            </p>
          </div>
        </Link>
        <span
          // href="/profile/gifts"
          // style={
          //   router.pathname === "/profile/gifts"
          //     ? { background: "#CDDFFF" }
          //     : {}
          // }
          className="flex bg-white  items-center justify-around 2xs:mr-1 rounded-lg md:flex-col md:justify-center md:px-8 w-full md:w-auto"
        >
          <Image
            className="bg-[#0361FF] rounded-lg p-[.4rem] cursor-pointer  m-3  md:m-0 "
            src="/icons/balance.svg"
            width={32}
            height={32}
            alt="icon"
          />
          <Link
            href={"/profile/giftCredit"}
            className="m-[.3rem] rounded-xl cursor-pointer flex flex-col items-center"
          >
            <p className="mt-2 mb-0 text-[#1A1D1F] text-base font-bold">
              اعتبار هدیه
            </p>
            <p className="mb-2 mt-0 text-[#0361FF] text-xs">
              امتیاز شما {user?.bonus_points} تومان
            </p>
          </Link>
        </span>
      </div>
    </div>
  );
}
