import Link from "next/link";
import React from "react";

const UnAvailableService = () => {
  return (
    <>
      <div className="p-2">
        <p>سرویس مورد نظر در حال حاظر در شهر انتخابی شما موجود نیست.</p>
        <p>
          <Link className="text-blue-500" href={"/services"}>
            بازگشت
          </Link>{" "}
          به صفحه سرویس ها
        </p>
      </div>
    </>
  );
};

export default UnAvailableService;
