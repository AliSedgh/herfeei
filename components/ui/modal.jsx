import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useModalStore from "../../store/modalStore";
import { Button } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";

function Modal({ title, description, questionPage, code }) {
  const router = useRouter();
  const { isOpen, closeModal } = useModalStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="fixed w-full inset-0 z-40 overflow-y-auto"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed right-0 left-0 !w-full inset-0 bg-black/30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="flex  items-center justify-center h-screen">
            <div className="bg-white !mx-[3rem] relative z-50 rounded-[8px] p-4 md:p-6 max-w-md w-[90%]">
              <div
                // style={{ borderBottom: "2px solid red" }}
                className="flex w-full !border-mutedText/20 p-5 px-3 justify-between items-center"
              >
                <div className="mx-auto w-full">
                  {!questionPage && (
                    <div>
                      <div className="mx-auto w-full text-center  ">
                        <CheckCircleOutlineOutlinedIcon
                          style={{ fontSize: "50px" }}
                          className="text-[#4ADE80]  mx-auto !border-1"
                        />
                      </div>
                      <div className="mx-auto text-center mt-3 font-bold text-[18px]">
                        ثبت موفق
                      </div>
                    </div>
                  )}
                  {questionPage && (
                    <div
                      style={{
                        borderBottom: "2px solid rgb(156 156 156 / 0.4)",
                      }}
                      className="flex pb-2 items-center !w-full  justify-between"
                    >
                      <div
                        className={`${
                          code ? "text-center text-[18px] w-full font-bold" : ""
                        }`}
                      >
                        {title}
                      </div>
                      <Close
                        className="!border-0 top-4 right-3 bg-transparent items-center cursor-pointer flex text-center rounded-full"
                        onClick={closeModal}
                      />
                      {/* <button
                        onClick={closeModal}
                        className="!border-0 top-4 right-3 bg-transparent items-center cursor-pointer p-2 flex text-center rounded-full"
                      >
                        <CloseIcon />
                      </button> */}
                    </div>
                  )}
                </div>
                {!questionPage && (
                  <Close
                    className="absolute top-4 right-3 bg-[#EFEFEF] !border-0 items-center cursor-pointer flex text-center rounded-full"
                    onClick={closeModal}
                  />
                  // <button
                  //   onClick={closeModal}
                  //   className=" absolute top-4 right-3 bg-[#EFEFEF] !border-0 items-center cursor-pointer p-2 flex text-center rounded-full "
                  // >
                  //   <CloseIcon />
                  // </button>
                )}
              </div>

              <div
                className={`${
                  code
                    ? "text-center text-[#535763] text-[14px] w-full font-bold"
                    : "font-bold mt-3"
                }p-4 px-3 mt-0 mb-6`}
              >
                {description}
              </div>
              {code && (
                <div className="text-center">
                  <span className="mx-auto">
                    کد پیگیری:{" "}
                    <span className="mx-6 inline-block font-bold mt-2">
                      {code}
                    </span>
                  </span>

                  <div className="flex gap-4 justify-between !border-mutedText/20 p-5 px-3 ">
                    <Link
                      onClick={closeModal}
                      href="/"
                      style={{ border: "2px solid rgb(156 156 156 / 0.4)" }}
                      variant="outlined"
                      className="!w-full !text-center flex justify-center !items-center rounded-[8px] no-underline !border-2 text-black font-bold border-black whitespace-nowrap px-5"
                    >
                      رفتن به خانه
                    </Link>
                    <Button
                      className="!w-full px-5 text-white rounded-[8px] p-[10px] bg-primary whitespace-nowrap"
                      variant="outlined"
                      href="/order"
                      onClick={closeModal}
                    >
                      پیگیری سفارش
                    </Button>
                  </div>
                </div>
              )}

              {questionPage && (
                <div
                  style={{ borderTop: "2px solid red" }}
                  className="flex gap-4 justify-between !border-mutedText/20 p-5 px-3 "
                >
                  <Button
                    onClick={closeModal}
                    variant="outlined"
                    className="w-fit text-black font-bold rounded-[6px] border-mutedText whitespace-nowrap px-10"
                  >
                    ادامه سوالات
                  </Button>
                  <Button
                    onClick={() => {
                      closeModal();
                      // window.close();
                      // window.close();
                      router.push("/services");
                    }}
                    className="w-full flex justify-center rounded-[6px] border-solid border-[1px] text-center items-center text-[#F75555] border-error whitespace-nowrap"
                    variant="outlined"
                  >
                    خروج و ذخیره سفارش
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default Modal;
