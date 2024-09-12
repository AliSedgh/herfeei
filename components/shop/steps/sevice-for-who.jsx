import React, { useState } from "react";

function SeviceForWho({ handleOptionSelect }) {
  const [meOrOthers, setMeOrOthers] = useState();

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };
  return (
    <div className="w-full">
      <h4>این سرویس را برای چه کسی درخواست می‌دهید:</h4>
      <div className="w-full grid grid-cols-1 grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
        <button
          onClick={(val) => {
            setMeOrOthers("me");
            handleOptionSelect("me");
          }}
          className={`${
            meOrOthers === "me"
              ? "[border:1px_solid_#0361FF] bg-[#B3D0FF]"
              : "[border:1px_solid_#EBEBEB] bg-[#F9F9F9]"
          } cursor-pointer w-full text-right text-[14px] rounded-[11px] px-2 py-3 hover:[border:1px_solid_#0361FF] hover:bg-[#B3D0FF] hover:scale-[1.03] duration-200`}
        >
          برای خودم
        </button>
        <button
          onClick={(val) => {
            setMeOrOthers("others");
            handleOptionSelect("others");
          }}
          className={`${
            meOrOthers === "others"
              ? "[border:1px_solid_#0361FF] bg-[#B3D0FF]"
              : "[border:1px_solid_#EBEBEB] bg-[#F9F9F9]"
          } cursor-pointer w-full text-right text-[14px] rounded-[11px] px-2 py-3 hover:[border:1px_solid_#0361FF] hover:bg-[#B3D0FF] hover:scale-[1.03] duration-200`}
        >
          برای شخصی دیگر
        </button>
      </div>
    </div>
  );
}

export default SeviceForWho;
