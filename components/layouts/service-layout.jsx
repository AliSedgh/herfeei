import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";
import MyModal from "../ui/modal";
import useModalStore from "../../store/modalStore";

function ServiceLayout({
  expertHandler,
  children,
  prevHref,
  nextHref,
  last,
  button,
  link,
  qnext,
  qprev,
  end,
  qaIndex,
  onSubmit,
}) {
  const { isOpen, openModal } = useModalStore();
  const categoryTitle = localStorage.getItem("category_title_modal");
  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  return (
    <div>
      <div className="flex mb-0 md:hidden justify-between items-center p-5">
        <div>{categoryTitle}</div>
        <div>
          <Close className="cursor-pointer" onClick={openModal} />
        </div>
      </div>
      {!last && (
        <MyModal
          open={isOpen}
          title={`${categoryTitle}`}
          description={`شما در حال تکمیل سفارش ${categoryTitle} هستید، آیا مایل به خروج از ادامه ثبت سفارش هستید؟`}
          questionPage={true}
        />
      )}
      {/* {last && (
        <MyModal
          open={isOpen}
          questionPage={false}
          title="تعمیر یخچال و فریزر"
          description="شما در حال تکمیل سفارش تعمیر یخچال و فریزر هستید، آیا مایل به خروج از ادامه ثبت سفارش هستید؟"
        />
      )} */}
      <main className="mt-[1rem] px-2 md:mt-0">{children}</main>
      <div>
        <div
          style={{
            boxShadow: "0px -5px 10.300000190734863px 0px #6164751A",
          }}
          className="flex  z-20 bg-[white] fixed gap-6 md:py-6  w-full lg:gap-[20%] shadow  justify-center text-center bottom-0  left-0 right-0  p-4"
        >
          <div
            style={{
              boxShadow: "0px -5px 10.300000190734863px 0px #6164751A",
            }}
            className="flex items-center md:grid  grid-cols-5 text-center z-20 px-2 bg-[white] fixed gap-2 lg:gap-20 md:py-6 pb-7 w-full  shadow  justify-center  bottom-0  left-0 right-0 pt-5"
          >
            <div className="hidden md:block"></div>
            {(expertHandler || button) && (
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!expertHandler) {
                    window.history.back();
                  } else if (qprev) {
                    qprev();
                  }
                  if (expertHandler) {
                    expertHandler();
                  }
                }}
                style={{ border: "1px solid red" }}
                className="mr-4 md:mx-auto  w-full block  md:px-16 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText  md:w-[173px] cursor-pointer"
              >
                مرحله قبل
              </motion.button>
            )}

            {!button && !expertHandler && (
              <Link href={prevHref} className="block w-full ">
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  style={{ border: "1px solid red" }}
                  className="md:mr-4  md:mx-auto  block w-full md:px-16 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText  md:w-[173px] cursor-pointer"
                >
                  مرحله قبل
                </motion.button>
              </Link>
            )}

            {!last && qaIndex && !end && (
              // <Link href={nextHref}>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full  md:mx-auto  whitespace-nowrap block md:w-[173px] md:px-16  py-3 rounded-xl border-0 bg-primary text-white cursor-pointer"
                onClick={() => {
                  if (qnext) {
                    qnext();
                  }
                }}
              >
                ادامه
              </motion.button>
              // </Link>
            )}
            <div className="hidden md:block"></div>
            {!last && onSubmit && (
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full  md:mx-auto  whitespace-nowrap block md:w-[173px] md:px-16  py-3 rounded-xl border-0 bg-primary text-white cursor-pointer"
                onClick={onSubmit}
              >
                ادامه
              </motion.button>
            )}
            {!last && !onSubmit && !qnext && (
              <Link href={nextHref}>
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full  md:mx-auto  whitespace-nowrap block md:w-[173px] px-8 md:px-16  py-3 rounded-xl border-0 bg-primary text-white cursor-pointer"
                  href={() => {
                    nextHref();
                  }}
                >
                  ادامه
                </motion.button>
              </Link>
            )}
            {last && (
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full  md:mx-auto  whitespace-nowrap block md:w-[173px] md:px-16  py-3 rounded-xl border-0 bg-primary text-white cursor-pointer"
                onClick={last}
              >
                ثبت نهایی
              </motion.button>
            )}
          </div>
          <div className="hidden md:block"></div>
        </div>
      </div>
    </div>
  );
}

export default ServiceLayout;
