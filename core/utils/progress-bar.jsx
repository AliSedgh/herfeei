import React from "react";
import useModalStore from "../../store/modalStore";

const ProgressBar = ({ currentStep = 1, title }) => {
  const myArray = Array(7).fill(0);
  const { isOpen, openModal } = useModalStore();
  return (
    <div className=" !mt-[-8em] bg-[red] !md:mt-[-1rem] mb-10 ">
      {/* <MyModal
        open={isOpen}
        title="تعمیر یخچال و فریزر"
        description="شما در حال تکمیل سفارش تعمیر یخچال و فریزر هستید، آیا مایل به خروج از ادامه ثبت سفارش هستید؟"
        questionPage={true}
      />
      <div className="w-full flex justify-between items-center my-4 relative">
        <div> {title} </div>
        <button className="bg-transparent border-0" onClick={openModal}>
          <CloseIcon />
        </button>
      </div> */}

      <div className="flex mt-3 mb-5 bg-[#CDDFFF] ">
        {myArray.map((item, ind) => {
          const stepBackgroundColor =
            currentStep + 1 > ind ? "bg-primary" : "bg-[#9AC0FF]";
          return (
            <div
              key={ind}
              className={`mx-1 h-[4px] w-full ${stepBackgroundColor}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
