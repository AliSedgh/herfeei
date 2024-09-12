import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Image from "next/image";
import React from "react";

export default function SupportItem({ icon, title, subtitle, link }) {
  return (
    <div className="m-2 border-[#EBEBEB] border-2 border-solid rounded-xl flex items-center basis-[100%] lg:basis-[47%] cursor-pointer hover:scale-105 transition-all	duration-500">
      <Image
        className=" rounded-lg m-4"
        src={icon}
        alt={title}
        width={55}
        height={55}
      />
      <a href={link}>
        <h1 className="text-lg mb-0">{title}</h1>
        <h2 className="text-sm font-medium	text-[#999CA0] mt-0">{subtitle}</h2>
      </a>
    </div>
  );
}
