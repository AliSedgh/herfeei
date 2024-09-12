// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import {
//   useGetExpertList,
//   usePostExpertPrioritizing,
// } from "../../core/hooks/useServiceApi";
// import ProgressBar from "../../core/utils/progress-bar";
// import Breadcrumb from "../../components/breadCrumb";
// import UserProfileCard from "../../components/userProfileCard";
// import { motion } from "framer-motion";
// import { MenuItem, Select } from "@mui/material";
// import { toast } from "react-toastify";
// import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
// import MyModal from "../../components/ui/modal";
// import useModalStore from "../../store/modalStore";
// import { Close } from "@mui/icons-material";

// const SelectExpert = () => {
//   const router = useRouter();
//   const orderId = localStorage.getItem("order_id");
//   const { data, isLoading } = useGetExpertList(orderId);
//   const postExpertPrioritizing = usePostExpertPrioritizing();
//   const [priortizing, setPriortizing] = useState([]);
//   console.log("dg", data?.data);

//   const categoryTitle = localStorage.getItem("category_title_modal");
//   const { isOpen, openModal } = useModalStore();

//   const buttonVariants = {
//     initial: { opacity: 0, x: 0 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: 0 },
//   };

//   const handleSubmit = (data) => {
//     postExpertPrioritizing.mutate(data);
//     if (priortizing.map((i) => i)[0] != null || undefined) {
//       router.push("/services/submit-order");
//     } else {
//       toast.error("لطفا متخصص ها را اولویت بندی کنید");
//     }
//   };

//   const breadcrumbPaths = [
//     { label: "حرفه ای", link: "/" },
//     { label: "سرویس ها", link: "/services" },
//     { label: "سوالات", link: "/services" },
//     { label: "توضیحات", link: "/services" },
//     { label: "انتخاب سفارش دهنده", link: "/services" },
//     { label: "اطلاعات کاربری", link: "/services" },
//     { label: "آدرس", link: "/services" },
//     { label: "زمان", link: "/services" },
//     { label: "متخصص", link: "/services" },
//   ];

//   useEffect(() => {
//     data?.data &&
//       setPriortizing(
//         Array.from(Array(data?.data.length).keys()).map(() => undefined)
//       );
//   }, [data?.data]);

//   useEffect(() => {
//     console.log("priortizing", priortizing);
//   }, [priortizing]);

//   return (
//     <div className="my-2">
//       <div className="flex mb-0 md:hidden justify-between items-center p-5">
//         <div>{categoryTitle}</div>
//         <div>
//           <Close className="cursor-pointer" onClick={openModal} />
//         </div>
//       </div>
//       <MyModal
//         open={isOpen}
//         title={`${categoryTitle}`}
//         description={`شما در حال تکمیل سفارش ${categoryTitle} هستید، آیا مایل به خروج از ادامه ثبت سفارش هستید؟`}
//         questionPage={true}
//       />
//       <Breadcrumb paths={breadcrumbPaths} />
//       <MultiStepProgressBar step={7} />
//       <div className="flex flex-col md:flex-row md:flex-wrap px-1 gap-2">
//         {isLoading ? (
//           <p>Loading ...</p>
//         ) : (
//           data?.data &&
//           data?.data.map((item, index) => (
//             <div key={item.id}>
//               {/* select component */}
//               <SelectComponent
//                 index={index}
//                 totalCount={data?.data.length}
//                 handleSelect={(selectIndex) => {
//                   const expertId = item.id;
//                   const priority = index + 1;
//                   setPriortizing((array) => {
//                     return array.map((item, idx) =>
//                       selectIndex == idx
//                         ? {
//                             expert: expertId,
//                             priorty: priority,
//                           }
//                         : item
//                     );
//                   });
//                 }}
//               />
//               <UserProfileCard {...item} />
//             </div>
//           ))
//         )}
//       </div>
//       <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] flex gap-2 md:gap-0 items-center justify-center px-2">
//         <motion.button
//           variants={buttonVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => {
//             router.push("/services/select-date");
//           }}
//           style={{ border: "1px solid red" }}
//           className="md:mx-auto block px-6 md:px-12 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText !w-full md:!w-[173px]"
//         >
//           مرحله قبل
//         </motion.button>
//         <motion.button
//           variants={buttonVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="md:mx-auto whitespace-nowrap block px-10 md:px-16  py-3 rounded-xl border-0 bg-primary text-white !w-full md:!w-[173px]"
//           onClick={() => {
//             handleSubmit({
//               order_id: orderId,
//               priortizing: priortizing,
//             });
//           }}
//         >
//           ادامه
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default SelectExpert;

// const SelectComponent = ({ index, totalCount, handleSelect }) => {
//   return (
//     <Select defaultValue={index} className="w-[45%] mb-2">
//       {Array.from(Array(totalCount).keys()).map((idx) => (
//         <MenuItem
//           key={idx}
//           value={idx}
//           onClick={() => {
//             handleSelect(idx);
//           }}
//         >{` اولویت ${idx + 1}`}</MenuItem>
//       ))}
//     </Select>
//   );
// };

// part 1
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetExpertList,
  usePostExpertPrioritizing,
  usePostOrderConfirmation,
} from "../../core/hooks/useServiceApi";
import Breadcrumb from "../../components/breadCrumb";
import UserProfileCard from "../../components/userProfileCard";
import { motion } from "framer-motion";
import { Box, Button, MenuItem, Modal, Select } from "@mui/material";
import { toast } from "react-toastify";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import MyModal from "../../components/ui/modal";
import useModalStore from "../../store/modalStore";
import { Close } from "@mui/icons-material";
import { useGetExpertProfile } from "../../core/hooks/useExpertApi";
import { useUserCancelExpert } from "../../core/hooks/useOrderApi";

const SelectExpert = () => {
  const router = useRouter();
  const orderId = localStorage.getItem("order_id");
  const { data, isLoading } = useGetExpertList(orderId);
  console.log("ggggggggggggg", data);

  const { data: expertProfile } = useGetExpertProfile();
  const mutation = useUserCancelExpert();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [priortizing, setPriortizing] = useState([]);
  const categoryTitle = localStorage.getItem("category_title_modal");
  const { isOpen, openModal } = useModalStore();

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const handleSubmit = async (data) => {
    const postData = {
      order_id: data.order_id,
      confirmation: "accepted",
      discount: null,
    };
  };

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
    { label: "توضیحات", link: "/services" },
    { label: "انتخاب سفارش دهنده", link: "/services" },
    { label: "اطلاعات کاربری", link: "/services" },
    { label: "آدرس", link: "/services" },
    { label: "زمان", link: "/services" },
    { label: "متخصص", link: "/services" },
  ];

  // تغییر در مقداردهی اولیه‌ی priortizing
  useEffect(() => {
    if (data?.data) {
      setPriortizing(
        data.data.map((item, index) => ({
          expert: item.id,
          priorty: index + 1,
        }))
      );
    }
  }, [data?.data]);

  useEffect(() => {
    console.log("priortizing", priortizing);
  }, [priortizing]);

  return (
    <div className="my-2 mb-[100px] px-3">
      <div className="flex mb-0 md:hidden justify-between items-center p-5">
        <div>{categoryTitle}</div>
        <div>
          <Close className="cursor-pointer" onClick={setOpen} />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-2xl min-h-[225px] w-[270px] 3xs:w-[90%] 2xs:w-[343px] bg-white flex flex-col items-center justify-between"
        >
          <div className="flex flex-row-reverse w-full justify-between items-center p-4">
            <Close
              onClick={handleClose}
              className="text-[#999CA0] cursor-pointer hover:scale-[1.05] duration-300"
            />
            <p className="m-0 p-0 text-[#000000] text-[16px]">
              {categoryTitle}
            </p>
          </div>
          <div className="w-full p-5 [border-top:1px_solid_#EBEBEB] [border-bottom:1px_solid_#EBEBEB]">
            <p className="m-0 p-0 text-[#212121] text-[16px] font-semibold">
              شما در حال تکمیل سفارش {categoryTitle} هستید، آیا مایل به ادامه
              خروج از ثبت سفارش هستید؟
            </p>
          </div>
          <div className="w-full min-h-[70px] flex-col-reverse items-center justify-center gap-3 3xs:gap-3 3xs:py-5">
            <div className="flex gap-1 justify-center w-full">
              <Button
                onClick={() => {
                  handleClose();
                  router.push("/services");
                }}
                variant="outlined"
                color="inherit"
                className="text-[#F75555] [border:1px_solid_#F75555] rounded-lg font-semibold text-[12px] 3xs:text-[14px] 2xs:text-[16px] p-2"
              >
                خروج و ذخیره سفارش
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  router.replace("/");
                }}
                variant="outlined"
                color="inherit"
                className="text-[#F75555] [border:1px_solid_#F75555] rounded-lg font-semibold text-[12px] 3xs:text-[14px] 2xs:text-[16px] p-2"
              >
                انصراف از سفارش
              </Button>
            </div>
            <div className="w-full flex items-center justify-center">
              <Button
                onClick={handleClose}
                variant="outlined"
                color="inherit"
                className="text-white bg-primary mt-2 [border:1px_solid_#999CA0] rounded-lg font-semibold w-[80%] text-[12px] 3xs:text-[14px] 2xs:text-[16px] p-2"
              >
                ادامه سفارش
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Breadcrumb paths={breadcrumbPaths} />
      <MultiStepProgressBar step={8} />

      <div className="flex flex-col md:flex-row md:flex-wrap px-1 gap-2">
        {isLoading ? (
          <p>Loading ...</p>
        ) : data?.data && data?.data.length > 0 ? (
          data?.data.map((item, index) => (
            <div
              key={item.id}
              data-aos={index % 2 == 0 ? "slide-left" : "slide-right"}
              data-aos-anchor-easing="ease-in-out"
              data-aos-duration="60000"
            >
              {/* select component */}

              <UserProfileCard
                {...item}
                commentCount={expertProfile?.data?.comments_number}
              />
            </div>
          ))
        ) : (
          <>
            <div>
              در حال حاضر هیچ متخصصی در مکان درخواستی شما موجود نیست. لطفا در
              زمان دیگری تلاش کنید.
            </div>
          </>
        )}
      </div>
      <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] pb-2 flex gap-2 md:gap-0 items-center justify-center px-2">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            router.push("/services/select-date");
          }}
          style={{ border: "1px solid red" }}
          className="md:mx-auto block px-6 md:px-12 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText !w-full md:!w-[173px]"
        >
          مرحله قبل
        </motion.button>
        {/* <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:mx-auto whitespace-nowrap block px-10 md:px-16  py-3 rounded-xl border-0 bg-primary text-white !w-full md:!w-[173px]"
          onClick={() => {
            handleSubmit({
              order_id: orderId,
              priortizing: priortizing,
            });
          }}
        >
          ثبت نهایی
        </motion.button> */}
      </div>
    </div>
  );
};

export default SelectExpert;

// تغییر در SelectComponent برای نمایش پیش‌فرض priortizing
const SelectComponent = ({ index, totalCount, handleSelect, priortizing }) => {
  const value = priortizing[index]?.priorty
    ? priortizing[index].priorty - 1
    : index;

  return (
    <Select
      defaultValue={value} // استفاده از value به جای defaultValue
      className="w-[45%] mb-2"
      onChange={(event) =>
        handleSelect(
          index,
          event.target.value === "no"
            ? event.target.value
            : event.target.value + 1
        )
      } // استفاده از onChange برای به‌روزرسانی
    >
      {Array.from(Array(totalCount).keys()).map((idx) => (
        <MenuItem key={idx} value={idx}>{` اولویت ${idx + 1}`}</MenuItem>
      ))}
      {totalCount > 1 && <MenuItem value={"no"}>عدم تمایل</MenuItem>}
    </Select>
  );
};
