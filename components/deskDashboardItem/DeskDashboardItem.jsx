import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Image from "next/image";
import ArrowSvg from "../../public/icons/arrow.svg";
import { useGetNotifacations } from "../../core/hooks/useExpertApi";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

function DeskDashboardItem({
  imageSrc,
  imageBgColor,
  title,
  footerItem = false,
  children,
  onClick,
  clickSideBar,
}) {
  const { data: notifications, isLoading, refetch } = useGetNotifacations();

  return (
    <>
      <div className={footerItem && "md:hidden"} onClick={onClick}>
        <div className="flex bg-white items-center justify-between ml-1 rounded-lg h-[4rem] cursor-pointer hover:bg-[#F9F9F9]">
          <div className="m-[.3rem] rounded-xl flex items-center justify-center gap-2">
            <div className="w-[32px] h-[32px] relative">
              <Image
                className="!bg-[#F9F9F9] rounded-lg cursor-pointer object-contain"
                style={imageBgColor ? { background: imageBgColor } : {}}
                src={imageSrc}
                fill
                alt="icon"
              />
              {title === "اعلان ها" &&
                notifications?.filter((item) => item.status !== "READ").length >
                  0 && (
                  <div className="w-5 h-5 flex items-center justify-center absolute -top-1 right-0 rounded-full bg-red-500 text-white">
                    <span className="text-[10px]">
                      {
                        notifications?.filter((item) => item.status !== "READ")
                          ?.length
                      }
                    </span>
                  </div>
                )}
            </div>

            <div>
              <p className="xs:mt-2 xs:mb-0 text-[#1A1D1F] text-[14px] xs:text-base font-bold">
                {title}
              </p>
            </div>
          </div>
          <div className="w-[15px] h-[15px] relative m-4">
            <Image
              className="object-contain"
              src={ArrowSvg.src}
              fill
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
      {title === "پیام‌ها" && children}
    </>
  );
}

export { DeskDashboardItem };
