import React from "react";
import { InputAdornment } from "@mui/material";
import Image from "next/image";

const EditButton = ({ onClick, active }) => {
  return (
    <InputAdornment position="start">
      <div className="flex items-center cursor-pointer" onClick={onClick}>
        <Image
          className="rounded-lg"
          src={active ? "/icons/save.svg" : "/icons/edit.svg"}
          alt={active ? "save icon" : "edit icon"}
          width={20}
          height={15}
        />
        <p className="ml-2 mr-1 text-sm text-[#0361FF]">
          {active ? "ذخیره" : "ویرایش"}
        </p>
      </div>
    </InputAdornment>
  );
};

export default EditButton;
