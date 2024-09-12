import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Modal,
} from "@mui/material";
import Breadcrumb from "../../../components/breadCrumb";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { serviceDetailPageData } from "../../../core/api/serviceApi";
import Image from "next/image";
import { Close } from "@mui/icons-material";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import CloseSvg from "../../../public/icons/cancelOrderClose.svg";
import { useGetServiceActive } from "../../../core/hooks/useServiceApi";
import { CityContext } from "../../_app";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

// Define a function to fetch the category data
async function fetchCategoryData(slug) {
  const response = await serviceDetailPageData({ slug });
  return response.data;
}

function Detail({ sl }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [getServiceActiveState, setGetServiceActiveState] = useState();
  const { city, setCity } = useContext(CityContext);

  const localCity = localStorage.getItem("city_id");

  const router = useRouter();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    localStorage.setItem("service_path", router.asPath);
  }, []);

  // Use React Query's useQuery hook to fetch category data
  const {
    data: category,
    isLoading,
    isError,
  } = useQuery(
    ["serviceDetails", sl], // Unique key for this query
    () => fetchCategoryData(sl),
    { enabled: !!sl } // Function to fetch data
  );

  const {
    data: getServiceActive,
    isLoading: getServiceActiveIsLoading,
    refetch: fetchServiceActive,
  } = useGetServiceActive(category?.id, city);

  console.log(
    "asv",
    getServiceActive && !getServiceActiveIsLoading && getServiceActive
  );

  useEffect(() => {
    if (!getServiceActiveIsLoading && getServiceActive) {
      setGetServiceActiveState(getServiceActive?.data);
    }
  }, [getServiceActive?.data]);

  useEffect(() => {
    if (category?.category?.title) {
      localStorage.setItem("category_title_modal", category?.category?.title);
    }
  }, [category?.category?.title]);

  useEffect(() => {
    if (category?.id) {
      localStorage.setItem("service_id", category?.id);
    }
  }, [category?.id]);

  useEffect(() => {
    if (city) {
      localStorage.setItem("city_id", city);
    }
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  if (isError || !category) {
    return <div>Error fetching data</div>;
  }

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    {
      label: category?.category?.title,
      link: `/services/${category?.category?.title}`,
    },
  ];
  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const handleStartOrder = async () => {
    const { data } = await fetchServiceActive();

    if (data?.status == 200) {
      if (data?.data) {
        localStorage.removeItem("order_id");
        localStorage.removeItem("address_id");
        localStorage.removeItem("order_track_id");
        localStorage.setItem("service_id", category?.id);
        router.push(`/services/questions/${category?.id}`);
        // window.open(`/services/questions/${category?.id}`);
      } else {
        router.push(`/services/unavailable-service`);
        // window.open(`/services/unavailable-service`);
      }
    } else {
      toast.error("خطا در ارتباط با سرور");
    }
  };

  return (
    <>
      <Container className="relative mb-[10px] md:mb-[100px] p-0 md:p-3  w-full mt-[0rem] md:mt-[-6rem] bg-transparent">
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
                {category?.category?.title}
              </p>
            </div>
            <div className="w-full p-5 [border-top:1px_solid_#EBEBEB] [border-bottom:1px_solid_#EBEBEB]">
              <p className="m-0 p-0 text-[#212121] text-[16px] font-semibold">
                شما در حال تکمیل سفارش {category?.category?.title} هستید، آیا
                مایل به ادامه خروج از ثبت سفارش هستید؟
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
        <div className="pt-28  hidden md:block">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
        <div className="-z-0 w-[100%] bg-[#f9f9f9] top-0 md:top-40 left-0 right-0 h-[65vw] md:!h-[429px]">
          <div
            onClick={handleOpen}
            className="md:hidden absolute top-[20px] left-[20px] bg-[#FFFFFF4D] p-1 rounded-[4px] z-[1000] cursor-pointer hover:scale-[1.05] duration-300"
          >
            <div className="relative overflow-hidden w-[13px] h-[13px]">
              <Image src={CloseSvg.src} alt="close" fill />
            </div>
          </div>

          {isLoading && windowWidth >= 768 && !category?.image ? (
            <div className="w-full h-[264px] md:!h-[429px] object-cover"></div>
          ) : (
            isLoading &&
            !category?.mobile_size_image && (
              <div className="w-full h-[264px] md:!h-[429px] object-cover"></div>
            )
          )}

          {windowWidth >= 768 && category?.image ? (
            <div className="relative w-full h-full md:!h-[429px] overflow-hidden">
              <Image
                quality={100}
                src={
                  windowWidth >= 768 && category?.image
                    ? category?.image
                    : category?.mobile_size_image && category?.mobile_size_image
                }
                alt="cover"
                fill
                className={` ${!category?.image ? "hidden" : ""}`}
              />
            </div>
          ) : (
            category?.mobile_size_image && (
              <div className="relative w-full h-full md:!h-[429px] overflow-hidden">
                <Image
                  quality={100}
                  src={
                    windowWidth >= 768 && category?.image
                      ? category?.image
                      : category?.mobile_size_image &&
                        category?.mobile_size_image
                  }
                  alt="cover"
                  fill
                  className={` ${!category?.image ? "hidden" : ""}`}
                />
              </div>
            )
          )}

          {/* <img
            src={category?.image}
            alt="cover"
            className={`w-full  h-[264px] md:!h-[429px] object-cover ${
              !category?.image ? "hidden" : ""
            }`}
          /> */}
        </div>
        <div className="items-center p-3 -10 lg:mx-16 !z-30 mx-auto mt-[80px] 3xs:mt-[70px] 2xs:mt-[60px] ss:mt-[50px] md:mt-[0px] backdrop-blur-0">
          <h1 className="!z-50 font-bold text-[20px] 3xs:text-[21px] xs:text-[22px] md:text-[36px] !mt-[-160px] md:!mt-[-135px] text-white ">
            {category?.category?.title}
          </h1>
          <Card className="mb-5 shadow p-0 px-4 rounded-lg">
            {/* Render services */}
            <h2 className="text-grayText text-[16px] 3xs:text-[17px] xs:text-[18px]">
              معرفی سرویس:
            </h2>
            <p className="text-[#828282] text-[13px] 3xs:text-[14px] xs:text-[16px]">
              {category?.introduce}
            </p>
          </Card>{" "}
          <Card className="mb-5 shadow px-0 rounded-lg">
            <Card className=" shadow py-2 px-4">
              <h2 className="text-grayText text-[16px] 3xs:text-[17px] xs:text-[18px]">
                راهنمای قیمت:
              </h2>
              <p className="text-[#828282] text-[13px] 3xs:text-[14px] xs:text-[16px]">
                کاربر گرامی قیمت های اعلام شده تقریبی است و ملاک اصلی قیمت
                گذاری، توافق نهایی شما با کارشناس میباشد.
              </p>
              <Accordion
                sx={{
                  borderRadius: 3,
                  marginBottom: 1,
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  sx={{ borderRadius: 3 }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  {" "}
                  <div className="flex justify-between w-full items-center gap-1 !text-[14px]">
                    <h2 className=" text-[13px] 3xs:text-[14px] xs:text-[16px] mr-5">
                      شرح خدمات
                    </h2>
                    <p className="ml-3">
                      {" "}
                      <span className="text-[#828282]  text-[13px] 3xs:text-[14px] xs:text-[16px]">
                        واحد/
                      </span>
                      <span className="font-bold  text-[13px] 3xs:text-[14px] xs:text-[16px]">
                        قیمت (تومان)
                      </span>
                    </p>
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  {category?.items?.map((service, index) => (
                    <Card
                      className={`${
                        index % 2 != 0 ? "!bg-[#CDDFFF]" : "bg-[white]"
                      } mt-2 px-3 flex justify-between shadow items-center rounded-lg`}
                      key={index}
                    >
                      <strong className="text-grayText text-[14px] 3xs:text-[15px] xs:text-[16px]">
                        {service?.title}
                      </strong>
                      <p className="text-[14px] 3xs:text-[15px] xs:text-[16px]">
                        <span>
                          <span className="text-[#999CA0]">هر عدد/</span>
                          {formatPrice(service?.start_range)}{" "}
                          <span className="mx-1">-</span>{" "}
                          {formatPrice(service?.end_range)}
                        </span>
                      </p>
                    </Card>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Card>
          </Card>
          {/* Render other sections like guide, rules, and features */}
          {/* <Card className="shadow !overflow-y-scroll shadow-[#616475]/40 !shadow-current/30 min-h-[290px] mb-40 md:mb-20 pb-10 px-4 rounded-lg">
            <h2 className="text-[16px] 3xs:text-[17px] xs:text-[18px] text-grayText">
              راهنمای استفاده:
            </h2>

            <p className="text-[13px] 3xs:text-[14px] xs:text-[16px] text-[#828282]  ">
              {category?.guide}
            </p>

            <h2 className="text-[16px] 3xs:text-[17px] xs:text-[18px] text-grayText">
              قانون و مقررات:
            </h2>
            <p className="text-[13px] 3xs:text-[14px] xs:text-[16px] text-[#828282]  ">
              {category?.rule}
            </p>
          </Card> */}
          {/* <div className="w-full text-center">
          <Link
            href={`/services/questions/${category?.id}`}
            variant="contained"
            className="w-fit text-center py-2 rounded-lg text-white px-9 bg-[#0361FF] block mt-[-7rem] md:mt-[2rem] lg:mt-[-rem]  mx-auto items-center"
          >
            شروع سفارش
          </Link>
        </div> */}
        </div>
        <div
          style={{
            boxShadow: "0px -5px 10.300000190734863px 0px #6164751A",
          }}
          className="flex z-20 px-2 md:px-[26rem]  bg-[white] fixed gap-6 md:py-6 pb-5 w-full md:gap-[20%] shadow  justify-center text-center bottom-0  left-0 right-0  p-4"
        >
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit p-4 px-10 whitespace-nowrap block md:w-min md:px-16  py-3 rounded-xl border-0 bg-primary text-white cursor-pointer"
            onClick={handleStartOrder}
          >
            شروع سفارش
          </motion.div>
        </div>
      </Container>
    </>
  );
}

export default Detail;

export async function getServerSideProps(context) {
  const { slug } = context.query;

  return {
    props: {
      sl: slug,
    },
  };
}
