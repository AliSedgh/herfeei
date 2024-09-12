import React, { useContext, useEffect, useState } from "react";
import useWindowWidth from "../../core/utils/useWindowWidth";
import {
  useGetAddressList,
  useGetSearchCity,
  usePostCreateAddress,
} from "../../core/hooks/useAddressApi";
import { useGetNeighborhoodList } from "../../core/hooks/useServiceApi";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Modal, Switch, styled } from "@mui/material";
import dynamic from "next/dynamic";
import { useQueryClient } from "react-query";
import Image from "next/image";
import AddressIconSvg from "../../public/icons/address-icon.svg";
import MapJpg from "../../public/images/map.jpg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/breadCrumb";
import ProgressBar from "../../core/utils/progress-bar";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import { CityContext, UserContext } from "../_app";
import { Close } from "@mui/icons-material";
import MyModal from "../../components/ui/modal";
import useModalStore from "../../store/modalStore";
import { useDeleteUserOrder } from "../../core/hooks/useOrderApi";

// const Map = dynamic(() => import("../../components/map"), {
//   ssr: false,
// });
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 999999,
};
const UpdateMap = dynamic(() => import("../../components/map/UpdateMap"), {
  ssr: false,
});

export default function SelectAddress() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    neighborhood: "",
    // details: "",
    phone: "",
    default: false,
    lat: 35.715824,
    long: 51.33527,
    city: "",
  });

  const localCity = localStorage.getItem("city_id");
  const { city, setCity } = useContext(CityContext);
  const [newCity, setNewCity] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetAddressList();

  const deleteOrder = useDeleteUserOrder();

  const { data: getSearchCity, isLoading: GetSearchCityIsLoading } =
    useGetSearchCity();
  const { data: getNeighborhoodList, isLoading: isLoadingGetNeighborhoodList } =
    useGetNeighborhoodList(
      newCity ? newCity : city ? city : localCity ? localCity : 3
    );
  console.log("getNeighborhoodList", getNeighborhoodList);

  const postCreateAddress = usePostCreateAddress();

  const categoryTitle = localStorage.getItem("category_title_modal");
  const { isOpen, openModal } = useModalStore();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const addressId = localStorage.getItem("address_id");
  console.log("scd", newCity);

  const cancelOrderHandler = async () => {
    // const orderId = localStorage.getItem("order_id");
    // await deleteOrder.mutateAsync(orderId);
    handleClose();
    router.push("/services");
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("وارد کردن این فیلد الزامی می باشد"),
    // phone: Yup.string().matches(
    //   /^0\d{10}$/,
    //   "شماره تلفن باید 11 رقم باشد و با صفر شروع شود"
    // ),
    neighborhood: Yup.string().required("وارد کردن این فیلد الزامی می باشد"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("jk", values);
      if (typeof values?.neighborhood === "string") {
        values.neighborhood = parseInt(values.neighborhood);
      }
      if (values.phone.startsWith("0")) {
        values.phone = values.phone.substring(1);
      }
      postCreateAddress.mutate(values, {
        onSuccess: (res) => {
          if (res.status == 201) {
            queryClient.setQueryData(["useGetAddressList"]);
            formik.resetForm();
            setAddMode(false);
            toast.success("آدرس با موفقیت اضافه شد");
          } else {
            toast.error("خطایی رخ داده است");
          }
        },
      });
    },
  });

  useEffect(() => {
    data?.data && setAddressId(data?.data?.find((item) => item?.default)?.id);
    data?.data &&
      localStorage.setItem(
        "address_id",
        data?.data?.find((item) => item?.default)?.id
      );
  }, [data?.data]);

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
    { label: "توضیحات", link: "/services" },
    { label: "انتخاب سفارش دهنده", link: "/services" },
    { label: "اطلاعات کاربری", link: "/services" },
    { label: "آدرس", link: "/services" },
  ];

  const IOSSwitch = styled((props) => {
    console.log("props", props);
    return (
      <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        // checked={formik.values.default}
        // onChange={e=> formik.setFieldValue("")}
        {...props}
      />
    );
  })(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const submitHandler = async () => {
    if (addressId === null || addressId == undefined) {
      toast.error("لطفا یک آدرس را انتخاب کنید");
    } else {
      localStorage.setItem("address_id", addressId);
      router.push("/services/select-date");
    }
  };

  return (
    <>
      <div className="flex mb-0 md:hidden justify-between items-center p-5">
        <div>{categoryTitle}</div>
        <div>
          <Close className="cursor-pointer" onClick={() => setOpen(true)} />
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
                  router.replace("/");
                }}
                variant="outlined"
                color="inherit"
                className="text-[#F75555] [border:1px_solid_#F75555] rounded-lg font-semibold text-[12px] 3xs:text-[14px] 2xs:text-[16px] p-2"
              >
                خروج و ذخیره سفارش
              </Button>
              <Button
                onClick={cancelOrderHandler}
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

      <div className="hidden md:block">
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <MultiStepProgressBar step={5} />
      <div
        className={`flex flex-col pb-3 pt-1 px-2 md:m-0 md:mt-4 mx-auto ${
          addMode ? "bg-white" : "md:bg-white"
        } rounded-xl w-full`}
      >
        {!addMode ? (
          !isLoading ? (
            <>
              <p className="text-[14px] 2xs:text-[18px] font-semibold">
                آدرس خود را انتخاب کنید :
              </p>
              <div className="w-[80%] mx-auto grid grid-cols-1 gap-2 md:gap-4 md:p-8">
                {data?.data?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setAddressId(item.id)}
                    className={`${
                      addressId === item.id
                        ? "[border:1px_solid_#0361FF] bg-blue-100"
                        : "[border:1px_solid_#EBEBEB] bg-[#FFFFFF]"
                    } [border:1px__solid_#EBEBEB] hover:[border:1px__solid_#0361FF] rounded-lg md:rounded-2xl shadow-sm bg-[#FFFFFF] hover:bg-blue-100 px-2 py-3 xs:px-6 xs:py-5 flex gap-4 items-center cursor-pointer hover:scale-[1.02] duration-300 relative`}
                  >
                    {item?.default && (
                      <p className="absolute z-50 top-[-2px] left-[-24px] font-bold text-white px-6 custom-trapezoid -rotate-45">
                        پیشفرض
                      </p>
                    )}
                    <div className="flex flex-col items-start xs:flex-row xs:items-center justify-center gap-2 max-w-[80%] text-wrap">
                      <div className="flex items-center justify-center gap-2">
                        <div className="relative w-[32px] h-[32px] rounded-lg">
                          <Image
                            className="object-contain"
                            src={AddressIconSvg.src}
                            alt={item.title}
                            fill
                          />
                        </div>
                        <p className="text-[13px] 2xs:text-[14px] xs:text-[15px] font-semibold break-all">
                          {item.title}
                        </p>
                      </div>
                      {/* <p className="text-[14px] break-all">{item.details}</p> */}
                    </div>
                    <div className="mr-auto flex items-center justify-center">
                      <div className="relative w-[60px] h-[60px] 2xs:w-[67px] 2xs:h-[67px] xs:w-[74px] xs:h-[74px] rounded-lg">
                        <Image
                          className="object-contain rounded-lg"
                          src={MapJpg.src}
                          alt={item.title}
                          fill
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAddMode(true)}
                className="m-0 mt-4 mb-[100px] mx-auto text-[14px] font-semibold px-6 py-4 w-fit text-white bg-blue-600 border-0 rounded-lg cursor-pointer hover:scale-105 duration-300"
              >
                اضافه کردن آدرس جدید
              </button>
              <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] pb-2 flex gap-2 md:gap-0 items-center justify-center px-2">
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    router.push("/services/select-service-for-who");
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
            </>
          ) : (
            <p>Loading ...</p>
          )
        ) : (
          <>
            <div className="w-[80%] mx-auto flex flex-col md:flex-row gap-5 justify-center items-center md:items-start">
              <form
                onSubmit={formik.handleSubmit}
                className="min-w-[100%] md:min-w-fit md:w-[100%] flex gap-4 flex-col md:flex-row"
              >
                <div className="flex flex-col gap-4 p-1 w-full">
                  <div>
                    <label htmlFor="addressTitle">آدرس</label>

                    <input
                      className="w-full min-h-[64px] mt-2 px-2 rounded-[8px] [border:1px_solid_#EBEBEB]"
                      id="addressTitle"
                      name="title"
                      type="text"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <div className="mt-2">
                        <p className="m-0 p-0 text-red-500 text-[12px] 3xs:text-[13px] 2xs:text-[14px] xs:text-[16px]">
                          {formik.errors.title}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    {" "}
                    <label htmlFor="city">انتخاب شهر</label>
                    <select
                      className="w-full min-h-[64px] mt-2 px-2 bg-transparent rounded-[8px] [border:1px_solid_#EBEBEB]"
                      id="city"
                      name="city"
                      placeholder=""
                      onChange={(e) => {
                        setNewCity(e.target.value);
                        console.log("new city", e.target.value);
                      }}
                      value={
                        newCity ? newCity : city ? city : localCity && localCity
                      }
                    >
                      {!GetSearchCityIsLoading &&
                        getSearchCity?.data.map((item) => (
                          <option key={item.id} value={item?.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    {" "}
                    <label htmlFor="neighborhood">انتخاب محله</label>
                    <select
                      className="w-full min-h-[64px] mt-2 px-2 bg-transparent rounded-[8px] [border:1px_solid_#EBEBEB]"
                      id="neighborhood"
                      name="neighborhood"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.neighborhood}
                    >
                      <option value="">انتخاب کنید</option>
                      {!isLoadingGetNeighborhoodList &&
                        getNeighborhoodList?.data.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    {formik.errors.neighborhood &&
                      formik.touched.neighborhood && (
                        <div className="mt-2">
                          <p className="m-0 p-0 text-red-500 text-[12px] 3xs:text-[13px] 2xs:text-[14px] xs:text-[16px]">
                            {formik.errors.neighborhood}
                          </p>
                        </div>
                      )}
                  </div>

                  {/* <div>
                    <label htmlFor="addressDetail">جزییات آدرس</label>

                    <input
                      className="w-full min-h-[80px] mt-2 px-2 rounded-[8px] [border:1px_solid_#EBEBEB] text-right"
                      id="addressDetail"
                      name="details"
                      type="text"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.details}
                    />
                    {formik.errors.details && formik.touched.details && (
                      <div className="mt-2">
                        <p className="m-0 p-0 text-red-500 text-[12px] 3xs:text-[13px] 2xs:text-[14px] xs:text-[16px]">
                          {formik.errors.details}
                        </p>
                      </div>
                    )}
                  </div> */}

                  {/* <div>
                    <label htmlFor="phoneNumber">تلفن</label>

                    <input
                      className="w-full min-h-[64px] mt-2 px-2 rounded-[8px] [border:1px_solid_#EBEBEB]"
                      id="phoneNumber"
                      name="phone"
                      type="text"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <div className="mt-2">
                        <p className="m-0 p-0 text-red-500 text-[12px] 3xs:text-[13px] 2xs:text-[14px] xs:text-[16px]">
                          {formik.errors.phone}
                        </p>
                      </div>
                    )}
                  </div> */}

                  <div className="hidden md:flex md:items-center md:justify-between">
                    <div>انتخاب به عنوان آدرس پیش فرض</div>
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={formik.values.default}
                      onChange={(e) =>
                        formik.setFieldValue("default", e.target.checked)
                      }
                      name="default"
                    />
                  </div>

                  <div className="hidden md:flex md:justify-center md:gap-3">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "100%",

                        height: "2.25rem",
                        borderRadius: ".6rem",
                      }}
                    >
                      ذخیره آدرس
                    </Button>
                    <Button
                      onClick={() => {
                        setAddMode(false);
                      }}
                      variant="outlined"
                      sx={{
                        width: "100%",

                        height: "2.25rem",
                        borderRadius: ".6rem",
                      }}
                    >
                      انصراف
                    </Button>
                  </div>
                </div>
                <div className="w-full md:translate-y-[32.5px]">
                  {/* <Map
                    location={{
                      lat: formik.values.lat,
                      lng: formik.values.long,
                    }}
                    onLocationChange={(loc) => {
                      // setInitialValues((data) => ({
                      //   ...formik.,
                      //   // check names
                      //   lat: loc.lat,
                      //   long: loc.lng,
                      // }));
                      formik.setFieldValue("lat", loc.lat.toPrecision(8));
                      formik.setFieldValue("long", loc.lng.toPrecision(8));
                      console.log("location", loc.lat.toPrecision(8));
                    }}
                  /> */}
                  <UpdateMap
                    className="min-h-[300px]"
                    location={{
                      lat: formik.values.lat,
                      lng: formik.values.long,
                    }}
                    onLocationChange={(loc) => {
                      formik.setFieldValue("lat", loc.lat);
                      formik.setFieldValue("long", loc.lng);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between md:hidden">
                  <div>انتخاب به عنوان آدرس پیش فرض</div>
                  <IOSSwitch
                    sx={{ m: 1 }}
                    name="default"
                    checked={formik.values.default}
                    onChange={(e) =>
                      formik.setFieldValue("default", e.target.checked)
                    }
                  />
                </div>
                <div className="flex justify-center gap-3 md:hidden">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "100%",

                      height: "2.25rem",
                      borderRadius: ".6rem",
                    }}
                  >
                    ذخیره آدرس
                  </Button>
                  <Button
                    onClick={() => {
                      setAddMode(false);
                    }}
                    variant="outlined"
                    sx={{
                      width: "100%",

                      height: "2.25rem",
                      borderRadius: ".6rem",
                    }}
                  >
                    انصراف
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
