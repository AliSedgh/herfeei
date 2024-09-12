import React, { useState, useRef } from "react";
import { CameraAlt, PictureInPicture } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import useWindowWidth from "../../core/utils/useWindowWidth";
import ServiceLayout from "../../components/layouts/service-layout";
import { sendOrderDescription } from "../../core/api/serviceApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import Breadcrumb from "../../components/breadCrumb";
import { motion } from "framer-motion";

function OrderDescription() {
  const windowWidth = useWindowWidth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const descRef = useRef();
  const [showMboImgSelecModal, setShowMboImgSelecModal] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }

    // Clean up the input element to avoid issues
    e.target.value = null;
  };

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
    { label: "توضیحات", link: "/services" },
  ];

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const removeSelectedFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleGalleryAccess = () => {
    document.getElementById("galleryInput").click();
  };

  const handleDesktopGalleryAccess = () => {
    document.getElementById("desktopGalleryInput").click();
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.capture = "environment";
    input.onchange = handleFileChange;

    // Append input to the body to trigger file input
    document.body.appendChild(input);
    input.click();

    // Remove input from the body after use
    document.body.removeChild(input);
  };

  const url =
    typeof window != "undefined" ? localStorage.getItem("service_id") : "";

  const submitHandler = async () => {
    const oId = localStorage.getItem("order_id");
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("description", descRef.current.value);
    formData.append("order_id", oId);

    const res = await sendOrderDescription(formData);

    if (res == 200) {
      router.push("/services/select-address");
    } else {
      toast.error("something failed");
    }
  };

  return (
    <div className="w-full pt-2 md:pb-[100px]">
      <div className="hidden md:block">
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <MultiStepProgressBar step={2} />
      <p className="text-[18px] font-bold mb-5">
        در صورت تمایل توضیحات بیشتری را برای راهنمایی متخصص اضافه نمایید
      </p>
      <textarea
        style={{ height: "259px" }}
        className="p-5 resize-y w-full border border-solid outline-none border-[#EBEBEB] rounded-[8px] !bg-[#F9F9F9] text-[#4E4E4E]"
        placeholder="توضیح دهید..."
        cols={4}
        rows={5}
        ref={descRef}
      />

      <h3>در صورت تمایل میتوانید عکس یا فیلم اضافه نمایید</h3>
      <div className="w-full min-h-[220px] border-solid border-[#EBEBEB] border-1 p-4 flex flex-row-reverse flex-wrap items-center justify-center border-borderColor mb-24 rounded-lg relative">
        <div className="border relative border-[#999BA7] w-[150px] h-[150px] rounded-lg overflow-hidden">
          <input
            id="desktopGalleryInput"
            type="file"
            accept="image/*,video/*"
            className="absolute w-[150px] h-[150px] opacity-0 inset-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <div
            onClick={() =>
              windowWidth >= 768
                ? handleDesktopGalleryAccess()
                : setShowMboImgSelecModal(true)
            }
            className="flex justify-center items-center absolute w-[150px] h-[150px] inset-0 cursor-pointer text-[#999BA7] hover:text-[#9AC0FF] transition duration-300"
          >
            <img src="/icons/file.svg" />
          </div>
        </div>
        {selectedFiles.map((file, index) => {
          const isVideo = file.type.startsWith("video/");
          const fileURL = URL.createObjectURL(file);
          return (
            <div
              key={index}
              className="w-[132px] mx-3 h-[120px] relative rounded-lg overflow-hidden"
            >
              {isVideo ? (
                <video
                  src={fileURL}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={fileURL}
                  alt={`Selected ${index}`}
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => {
                  removeSelectedFile(index);
                  URL.revokeObjectURL(fileURL);
                }}
                className="absolute top-2 right-2 bg-black/30 text-white border-0 rounded-md p-1 cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>
          );
        })}
      </div>
      {windowWidth < 768 && showMboImgSelecModal && (
        <div>
          <div
            onClick={() => setShowMboImgSelecModal(false)}
            className="w-full h-[100vh] fixed z-30 top-0 left-0 bg-black/50"
          ></div>
          <div className="bg-[white] rounded-t-2xl fixed bottom-0 right-0 z-50 w-full">
            <div className="flex justify-between items-center my-5 pb-3 mx-5 [border-bottom:1px_solid_#d6d6d6]">
              <div>بارگذاری تصویر یا ویدئو</div>
              <button
                className="border-0 bg-transparent"
                onClick={() => setShowMboImgSelecModal(false)}
              >
                <CloseIcon className="text-gray-400" />
              </button>
            </div>
            <button
              className="flex bg-transparent items-center gap-2 hover:bg-[#9AC0FF] mb-3 rounded-xl w-full border-0 p-4 py-4 text-right"
              onClick={handleCameraCapture}
            >
              <CameraAlt />
              <div>از دوربین</div>
            </button>
            <button
              className="w-full bg-transparent flex items-center gap-2 hover:bg-[#9AC0FF] mb-3 rounded-xl border-0 p-4 py-4 text-right"
              onClick={handleGalleryAccess}
            >
              <PictureInPicture />
              <div>از گالری</div>
            </button>
            <input
              id="galleryInput"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
      <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] pb-2 flex gap-2 md:gap-0 items-center justify-center px-2">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            router.push(`/services/questions/${url}`);
          }}
          style={{ border: "1px solid red" }}
          className="md:mx-auto block px-6 md:px-12 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText !w-full md:!w-[173px] cursor-pointer"
        >
          مرحله قبل
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:mx-auto  whitespace-nowrap block px-10 md:px-16  py-3 rounded-xl border-0 bg-primary text-white !w-full md:!w-[173px] cursor-pointer"
          onClick={() => {
            submitHandler();
          }}
        >
          ادامه
        </motion.button>
      </div>
    </div>
  );
}

export default OrderDescription;
