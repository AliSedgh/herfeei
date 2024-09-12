import React from "react";
import SupportItem from "../../../components/supportItem";
import Image from "next/image";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";

const data = [
  {
    icon: "/icons/chat.svg",
    title: "چت زنده",
    subtitle: "از 9 صبح تا 9 شب",
  },
  // {
  //   icon: "/icons/online-call.svg",
  //   title: "تماس آنلاین",
  //   subtitle: "از 9 صبح تا 9 شب",
  // },
  {
    icon: "/icons/call.svg",
    title: "تماس",
    subtitle: "از 9 صبح تا 9 شب",
    link: "tel:02191097201",
  },
];

export default function Support() {
  const windowWidth = useWindowWidth();
  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="پشتیبانی" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        <div className="flex flex-wrap ">
          {data.map((item, i) => (
            <SupportItem key={i} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
