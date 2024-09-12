import React, { useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Breadcrumb from "../../breadCrumb";
import MyModal from "../../ui/modal";
import { useRouter } from "next/router";
import useModalStore from "../../../store/modalStore";
import useServiceStepsStore from "../../../store/serviceStepsStore";

function Steps({ serviceQuestions }) {
  const {
    currentStep,
    setCurrentStep,
    selectedOptions,
    setSelectedOptions,
    showServiceForWho,
    setShowServiceForWho,
    showUserDetail,
    setShowUserDetail,
    stage,
    setStage,
    setSelectedDate,
    setMe,
  } = useServiceStepsStore();

  const router = useRouter();

  const totalSteps = serviceQuestions.length;

  const { isOpen, openModal } = useModalStore();

  useEffect(() => {
    updateBreadcrumbPaths();
  }, [currentStep, showUserDetail, stage]);

  const [breadcrumbPaths, setBreadcrumbPaths] = useState([
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
  ]);

  useEffect(() => {
    updateBreadcrumbPaths();
  }, [currentStep, showUserDetail, stage]);

  const updateBreadcrumbPaths = () => {
    const newBreadcrumbPaths = [];
    newBreadcrumbPaths.push({ label: "حرفه ای", link: "/" });
    newBreadcrumbPaths.push({ label: "سرویس ها", link: "/services" });

    // Add dynamic breadcrumb paths based on the current step
    for (let i = 0; i < currentStep; i++) {
      const newLabel = serviceQuestions[i]?.title;
      const labelExists = newBreadcrumbPaths.some(
        (item) => item.label === newLabel
      );

      if (!labelExists) {
        newBreadcrumbPaths.push({
          label: newLabel,
          link: `/services/${encodeURIComponent(newLabel)}?step=${i}`,
        });
      }
    }
    if (stage > 2) {
      newBreadcrumbPaths.push({
        label: "اطلاعات کاربری",
        link: "/user-detail",
      });
    }
    if (stage > 3) {
      newBreadcrumbPaths.push({ label: "آدرس", link: "/addresses" });
    }
    setBreadcrumbPaths(newBreadcrumbPaths);
  };
  const handleTextSubmit = (text) => {
    setSelectedOptions({
      ...selectedOptions,
      [serviceQuestions[currentStep].step]: text,
    });
  };

  const handleNext = () => {
    if (stage === 3) {
      router.push("/services/select-address");

      setSelectedDate(true);
    } else if (stage === 3) {
      setShowUserDetail(false);
      setStage(stage + 1);
      setShowServiceForWho(false);
    } else if (stage === 2) {
      setStage(stage + 1);
      setShowUserDetail(true);
      setShowServiceForWho(false);
    } else if (currentStep < totalSteps - 1 && stage != 1) {
      setCurrentStep(currentStep + 1);
      setStage(stage + 1);
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setStage(stage + 1);
    }
  };

  const handleBack = () => {
    if (stage === 4) {
      setStage(stage - 1);
    } else if (stage === 3) {
      setStage(stage - 1);
    } else if (stage === 2) {
      setStage(stage - 1);
    } else if (currentStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "others") {
      setShowUserDetail(true);
      setMe(false);
      setStage(stage + 1);
    } else if (option === "me") {
      setShowUserDetail(true);
      setMe(true);
      setStage(stage + 1);
    } else if (currentStep > totalSteps - 1) {
      // handle other cases if needed
    }

    if (!showServiceForWho && stage < 2) {
      setSelectedOptions({
        ...selectedOptions,
        [serviceQuestions[currentStep].step]: option,
      });

      setCurrentStep(currentStep + 1);
      setShowServiceForWho(false);
    }
  };

  const renderProgressSteps = () => {
    const myArray = Array(totalSteps).fill(0);
    return (
      <div className=" mt-[-6rem] md:mt-[-1rem] md:mb-5 ">
        <div className="w-full flex justify-between items-center my-4 relative">
          <div>تعمیر یخچال و فریزر</div>
          <button className="bg-transparent border-0" onClick={openModal}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex bg-[#CDDFFF] ">
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

  const renderOptions = () => {
    const currentQuestion = serviceQuestions.find(
      (q) => q.step || 2 == currentStep + 1
    );

    // if (currentQuestion?.inputType === "text") {
    //   return (

    //   );
    // }
  };

  const renderStageComponents = () => {
    switch (stage) {
      default:
        return null;
    }
  };

  return (
    <div className="flex  flex-col mx-4 justify-between h-full ">
      <MyModal
        open={isOpen}
        title="تعمیر یخچال و فریزر"
        description="شما در حال تکمیل سفارش تعمیر یخچال و فریزر هستید، آیا مایل به خروج از ادامه ثبت سفارش هستید؟"
        questionPage={true}
      />
      <div>{renderProgressSteps()}</div>
      <div className="hidden md:block ">
        <Breadcrumb
          paths={breadcrumbPaths}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      {renderStageComponents()}

      {totalSteps - 1 >= currentStep &&
        stage === 1 &&
        !showUserDetail &&
        !showServiceForWho && <div>{renderOptions()}</div>}
      <div
        style={{ boxShadow: "0px -5px 10.300000190734863px 0px #6164751A" }}
        className="flex !z-20 bg-[white] fixed gap-6 md:py-6 pb-10 w-full md:gap-[20%] shadow  justify-center text-center bottom-0  left-0 right-0  p-4"
      >
        {currentStep > 0 && (
          <button
            className="mr-4 w-full whitespace-nowrap md:px-16   py-3 rounded-xl bg-white border-2 !border-mutedText  md:w-fit"
            onClick={handleBack}
          >
            مرحله قبل
          </button>
        )}
        {currentStep === 0 && (
          <button
            className="mr-4 w-full md:px-16   whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText  md:w-fit"
            onClick={() => window.history.back()}
          >
            مرحله قبل
          </button>
        )}
        <button
          className="w-full md:w-min md:px-16  py-3 rounded-xl border-0 bg-primary text-white "
          onClick={handleNext}
        >
          ادامه
        </button>
      </div>
    </div>
  );
}

export default Steps;
