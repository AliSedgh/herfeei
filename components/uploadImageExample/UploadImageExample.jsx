import { useState, useRef, useEffect } from "react";
import { CameraAlt, PictureInPicture } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import useWindowWidth from "../../core/utils/useWindowWidth";
import { sendOrderDescription } from "../../core/api/serviceApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button, FormLabel, TextField } from "@mui/material";
import { createPortal } from "react-dom";
import { usePostCreateSample } from "../../core/hooks/useExpertApi";
import { useFormik } from "formik";

function UploadImageExample({ setIsShowCreate }) {
  const [title, setTitle] = useState("");
  const windowWidth = useWindowWidth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sendFile, setSendFile] = useState();
  const postSample = usePostCreateSample();
  const [showMboImgSelecModal, setShowMboImgSelecModal] = useState(false);
  const router = useRouter();
  const handleFileChange = (e) => {
    if (windowWidth < 768) {
      return setShowMboImgSelecModal(!showMboImgSelecModal);
    }
    const files = e.target.files;

    if (files && files?.length > 0) {
      const newFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };
  const removeSelectedFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleGalleryAccess = () => {
    document.getElementById("galleryInput").click();
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; // Use the rear camera
    input.onchange = (e) => handleFileChange(e);
    input.click();
  };

  // useEffect(() => {
  //   setSendFile();
  // }, [selectedFiles]);

  const formik = useFormik({
    initialValues: {
      title,
      images: selectedFiles,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      values.images.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("title", values.title);
      postSample.mutate(formData);
      setIsShowCreate(false);
    },
  });

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   postSample.mutate
  //   const res = await post({
  //     files: selectedFiles,
  //     description: title,
  //     order_id: oId,
  //   });
  //   if (res == 200) {
  //     router.push("/services/select-service-for-who");
  //   } else if (res?.detail) {
  //   } else {
  //     toast.error("something faild");
  //   }
  // };
  return (
    <div className="w-full rounded-md bg-white flex flex-col items-end gap-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-white flex flex-col items-end gap-4"
      >
        <div className="w-full flex flex-col gap-2 items-start">
          <FormLabel
            htmlFor="title"
            className="text-right text-neutral-800 text-xs sm:text-base font-semibold leading-snug"
          >
            برای نمونه کار خود یک عنوان بنویسید
          </FormLabel>
          <TextField
            className="w-full sm:w-[345px] text-xs sm:text-base placeholder:text-xs placeholder:sm:text-base"
            dir="rtl"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="برای مثال:تعمیر یخچال فریزر"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <FormLabel className="text-right text-neutral-800 text-xs sm:text-base font-semibold leading-snug">
            عکس یا فیلم اضافه نمایید
          </FormLabel>
          <div
            onClick={() => {
              if (windowWidth < 768) {
                return setShowMboImgSelecModal(!showMboImgSelecModal);
              }
            }}
            className="w-full h-[220px] z-20 border-solid border-[#EBEBEB] border-1 flex items-center justify-center border-borderColor rounded-lg relative"
          >
            {selectedFiles &&
              selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="w-[132px] mx-3 h-[120px] relative rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeSelectedFile(index)}
                    className="absolute top-2 right-2 bg-black/30 text-white border-0 rounded-md p-1 cursor-pointer"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            <div className="bord   z-0  ml-3 relative border-[#999BA7] w-[150px] h-[150px] rounded-lg overflow-hidden ">
              <input
                // disabled={windowWidth < 768 && true}
                type="file"
                accept="image/*" // Allow only image files
                className={`${
                  windowWidth < 768 ? "!z-0 bg-[blue]" : "z-30"
                } absolute z-20 w-[150px]  h-[150px] opacity-0 inset-0  cursor-pointer`}
                onChange={(e) => {
                  if (windowWidth < 768) {
                    return setShowMboImgSelecModal(false);
                  }
                  handleFileChange(e);
                }}
              />
              <div className="flex justify-center items-center absolute w-[150px] h-[150px]  inset-0 m-auto  cursor-pointer z-0 text-[#999BA7] hover:text-[#9AC0FF] transition duration-300">
                <img src="/icons/file.svg" />
              </div>
            </div>
          </div>
          {windowWidth < 768 && showMboImgSelecModal && (
            <>
              {createPortal(
                <div className=" z-30 bg">
                  <div
                    onClick={() => {
                      setShowMboImgSelecModal(false);
                    }}
                    className="w-full h-[100vh] scroll  fixed z-30 top-0 left-0 bg-black/50"
                  ></div>
                  <div className="bg-[white] rounded-t-2xl right-0 fixed bottom-0 !z-50 w-full">
                    <div className="border-solid flex justify-between items-center border-borderColor my-5 border-t-0 pb-3 border-x-0 mx-5">
                      <div>بارگذاری تصویر</div>
                      <button
                        className="border-0 bg-transparent"
                        onClick={() => {
                          setShowMboImgSelecModal(false);
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <button
                      className=" flex bg-transparent items-center gap-2 hover:bg-[#9AC0FF] mb-3 md:mb-0 rounded-xl w-full border-0 p-4 py-4 text-right"
                      onClick={handleCameraCapture}
                    >
                      <CameraAlt />
                      <div>از دوربین</div>
                    </button>
                    <button
                      className="w-full p-2 bg-transparent flex items-center gap-2 hover:bg-[#9AC0FF] mb-3 md:mb-0 rounded-xl border-0 py-4 text-right"
                      onClick={handleGalleryAccess}
                    >
                      <PictureInPicture />
                      <div>از گالری</div>
                    </button>
                    <input
                      id="galleryInput"
                      type={
                        windowWidth > 768 || (showMboImgSelecModal && "file")
                      }
                      accept={
                        windowWidth > 768 || (showMboImgSelecModal && "image/*")
                      }
                      className="hidden"
                      capture="gallery"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </div>
                </div>,
                document.body
              )}
            </>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button
            variant="contained"
            type="submit"
            className="w-[170px] h-[46px] p-4 rounded-lg"
          >
            ذخیره
          </Button>
        </div>
      </form>
    </div>
  );
}

export { UploadImageExample };
