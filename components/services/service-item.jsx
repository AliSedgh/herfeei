import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ServiceItem({
  category_image,
  title,
  selected,
  onSelect,
}) {
  const handleSelect = () => {
    onSelect(title);
  };

  return (
    <div
      className={`cursor-pointer  h-[122px] flex flex-col items-center justify-between p-1 rounded-xl m-2 text-center mx-[13px] md:mx-[22px] ${
        selected ? "opacity-100" : "opacity-50"
      } `}
      onClick={handleSelect}
    >
      <div className="mt-2 flex items-center justify-center w-[64px] h-[64px]">
        {/* <img
          src={category_image}
          layout="fill"
          objectFit="contain"
          alt="icons"
          className={` object-cover ${
            title === "همه"
              ? "bg-[#5E3CE5] rounded-[10px] p-3"
              : "rounded-[10px] p-0 mx-auto text-center"
          }`}
        /> */}
        {category_image && (
          <Image
            src={category_image || ""}
            width={67}
            height={67}
            alt="icon"
            style={{ borderRadius: "10px" }}
          />
        )}
      </div>
      <p className="whitespace-normal text-center text-[#1A1D1F] text-[12px] font-[600] mt-2 ">
        {title}
      </p>
    </div>
  );
}
