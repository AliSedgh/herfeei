import React, { useEffect, useState } from "react";
import Slider from "../components/slider";
import Image from "next/image";
import MainSlider from "../components/mainSlider";
import ServiceItem from "../components/serviceItem";
import Banner from "../components/banner";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import comments from "../core/data/comments";
import mostServices from "../core/data/most-service";
import useWindowWidth from "../core/utils/useWindowWidth";
import {
  useGetEventService,
  useGetHomeComments,
  useGetSlider,
} from "../core/hooks/useHomeApi";
import { useGetServicesCategories } from "../core/hooks/useServiceApi";
import { useRouter } from "next/router";
import HLogo from "../public/images/hLogo.jpg";
const services = [
  {
    title: "",
    category_image: "",
    link: "/",
    id: 0,
    children: [
      {
        id: 0,
        title: "",
        children: [
          {
            id: 0,
            title: "",
          },
        ],
      },
    ],
  },
];

const clubImagesB = [
  "/images/club-b-1.png",
  "/images/club-b-2.png",
  "/images/club-b-3.png",
  "/images/club-b-4.png",
  "/images/club-b-5.png",
  "/images/club-b-6.png",
];

const clubImages = [
  "/images/club-1.png",
  "/images/club-2.png",
  "/images/club-3.png",
  "/images/club-1.png",
  "/images/club-2.png",
  "/images/club-3.png",
];

const blogPosts = [
  {
    imageSrc: "/images/blog.png",
    title: "ارور e04 پکیج بوتان چیست؟",
    time: "15 دقیقه قبل",
  },
  {
    imageSrc: "/images/blog.png",
    title: "ارور e04 پکیج بوتان چیست؟",
    time: "15 دقیقه قبل",
  },
  {
    imageSrc: "/images/blog.png",
    title: "ارور e04 پکیج بوتان چیست؟",
    time: "15 دقیقه قبل",
  },
  {
    imageSrc: "/images/blog.png",
    title: "ارور e04 پکیج بوتان چیست؟",
    time: "15 دقیقه قبل",
  },
  {
    imageSrc: "/images/blog.png",
    title: "ارور e04 پکیج بوتان چیست؟",
    time: "15 دقیقه قبل",
  },
];

const MoreComponent = ({ height }) => {
  return (
    <div
      className="flex flex-col bg-[#3581FF] w-[8rem] rounded-2xl h-[233px] items-center justify-center"
      style={{ height }}
    >
      <p className="font-[900] font-lg text-[#fff] my-2"> بیشتر</p>
      <Image src="/icons/more-arrow.svg" width={40} height={24} alt="arrow" />
    </div>
  );
};
export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("زیبایی");
  const [eventService, setEventService] = useState();
  const [getSlider, setGetSlider] = useState();
  const [servicesCategories, setServicesCategories] = useState(services);
  const windowWidth = useWindowWidth();
  const router = useRouter();

  const { data: sliderData } = useGetSlider();
  const serviceQuery = useGetServicesCategories();
  const { data } = useGetEventService();
  const { data: homeComments } = useGetHomeComments();

  useEffect(() => {
    serviceQuery?.data && setServicesCategories(serviceQuery?.data);
    data?.data && setEventService(data?.data);
    sliderData && setGetSlider(sliderData);
  }, [serviceQuery?.data, data?.data, sliderData]);

  return (
    <>
      <main className="bg-white w-full">
        <MainSlider getSlider={getSlider}></MainSlider>

        <h2 className="text-[16px] font-[600] sm:text-[20px] md:text-[22px] md:font-[700] text-[#212121] mx-4 flex mt-5 mb-3">
          خدمات حرفه ای
        </h2>
        <div className="px-1 sm:flex sm:items-start sm:justify-evenly grid grid-cols-4">
          {servicesCategories.map((item, index) => (
            <ServiceItem {...item} key={index} />
          ))}
        </div>

        {/* <h2 className="text-[16px] font-[600] sm:text-[20px] md:text-[22px] md:font-[700] text-[#212121] mx-4 flex">
        کلاب حرفه‌ای‌ها
      </h2>
      <div className="mb-7">
        {windowWidth < 640 ? (
          <Slider data={clubImages} spaceBetween={15} slideWidth="100px">
            {(item) => (
              <div className="w-[100px] h-[110px]">
                <div className="w-full h-full">
                  <Image
                    src={item}
                    sizes="(width:100%) 100vw,(heigh:100%) 100vw"
                    fill
                    style={{ objectFit: "fill" }}
                    alt="banner"
                  />
                </div>
              </div>
            )}
          </Slider>
        ) : (
          <Slider data={clubImagesB} spaceBetween={50} slideWidth="200px">
            {(item) => (
              <div className="w-[200px] h-[92px]">
                <div className="w-full h-full">
                  <Image
                    src={item}
                    sizes="(width:100%) 100vw,(heigh:100%) 100vw"
                    fill
                    style={{ objectFit: "fill" }}
                    alt="banner"
                  />
                </div>
              </div>
            )}
          </Slider>
        )}
      </div> */}

        <Slider
          data={eventService ? eventService[1].items : []}
          spaceBetween={15}
          title="پرطرفدارهای فصل"
          // more={<MoreComponent height="13rem" />}
        >
          {(item) => (
            <div
              onClick={() => {
                item?.slug != null &&
                  router.push(
                    `/services/${item.slug?.slug_3}/${item.slug?.slug_2}/`
                  );
              }}
              className="my-3 mr-2 sm:mr-0 w-[277px] [box-shadow:0px_2px_5px_0px_rgba(97,_100,_117,_0.20)] flex flex-col rounded-2xl cursor-pointer hover:scale-[1.03] duration-300"
            >
              <Image
                className="rounded-t-2xl"
                src={item.image}
                width={278}
                height={124}
                quality={100}
                alt="banner"
              />
              <p className="text-sm font-[700] my-1 mx-2 text-[#757575]">
                {item.title}
              </p>
              <p className="text-xs truncate text-[#9C9C9C] my-1 mx-2">
                {item.description}
              </p>
              <p className="text-xs font-[600] text-[#0361FF] my-1 mx-2">
                {`قیمت از ${item.price_at} تومان تا ${item.price_end} تومان`}
              </p>
            </div>
          )}
        </Slider>

        <Slider
          data={eventService ? eventService[0].items : []}
          spaceBetween={15}
          title="خدمات پرتقاضا"
          // more={<MoreComponent height="13rem" />}
        >
          {(item) => (
            <div
              onClick={() => {
                item?.slug != null &&
                  router.push(
                    `/services/${item.slug?.slug_3}/${item.slug?.slug_2}/`
                  );
              }}
              className="my-3 mr-2 sm:mr-0 w-[277px] [box-shadow:0px_2px_5px_0px_rgba(97,_100,_117,_0.20)] flex flex-col rounded-2xl"
            >
              <Image
                className="rounded-t-2xl"
                src={item.image}
                width={278}
                height={124}
                quality={100}
                alt="banner"
              />
              <p className="text-sm font-[700] my-1 mx-2 text-[#757575]">
                {item.title}
              </p>
              <p className="text-xs truncate text-[#9C9C9C] my-1 mx-2">
                {item.description}
              </p>
              <p className="text-xs font-[600] text-[#0361FF] my-1 mx-2">
                {`قیمت از ${item.price_at} تومان تا ${item.price_end} تومان`}
              </p>
            </div>
          )}
        </Slider>

        <h2 className="text-[16px] font-[600] sm:text-[20px] md:text-[22px] md:font-[700] text-[#212121] mx-4 mt-4 mb-0 flex">
          از آموزش تا همکاری
        </h2>
        <div className={`mb-3 mx-auto ${windowWidth < 393 && "w-[95%]"}`}>
          <Banner />
        </div>

        <Slider
          data={comments}
          title="نظر کاربران"
          slideWidth="245px"
          spaceBetween={15}
          // more={<MoreComponent height="19rem" />}
        >
          {(item) => (
            <div className="my-3 mr-2 sm:mr-0 w-[241px] [box-shadow:0px_0px_8px_0px_rgba(97,_100,_117,_0.20)] flex flex-col rounded-2xl h-[19rem]">
              <div className="flex my-2">
                <Image
                  className=" m-2"
                  src={item.imageSrc}
                  width={48}
                  height={48}
                  quality={100}
                  alt="banner"
                />
                <div>
                  <p className="text-sm font-[700] my-1 mx-2 ">{item.name}</p>
                  <p className="text-xs  text-[#0361FF] my-1 mx-2">
                    {item.service}
                  </p>
                  <p className="text-xs font-[600] text-[#9C9C9C] my-1 mx-2">
                    {item.time}
                  </p>
                </div>
              </div>
              <Divider
                sx={{
                  backgroundColor: "#F6F6F6",
                  height: "2px",
                  margin: "0 auto",
                  width: "90%",
                }}
              />

              <p className="text-xs p-2 text-[#9C9C9C]  my-1 mx-2">
                {item.comment}
              </p>

              <div className="mt-auto flex justify-center items-center pb-4 ">
                <Image
                  className="m-1 cursor-pointer"
                  src="/icons/5-stars.svg"
                  alt="star icon"
                  width={119}
                  height={24}
                />
                <p className="text-sm font-[700] text-[#0361FF]">5 از 5</p>
              </div>
            </div>
          )}
        </Slider>

        {/* <div className=" mb-10 mt-0 mr-2 sm:mr-0">
          <Slider
            data={blogPosts}
            title="وبلاگ"
            spaceBetween={20}
            more={<MoreComponent />}
          >
            {(item) => (
              <div className="relative mt-3">
                <Image
                  src={item.imageSrc}
                  width={280}
                  height={233}
                  quality={100}
                  alt="blog post"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0px 0px 3px 1px #ccc",
                    filter: "grayscale(50%)",
                  }}
                />
                <div className="absolute w-full h-[98%] [background:linear-gradient(0deg,_rgba(0,0,0,0.83)_20%,_rgba(242,_242,_242,_0)_64%)] rounded-[10px] right-0 top-0"></div>
                <div className="absolute right-[.5rem] top-[10rem]">
                  <p className="text-sm text-[#fff] font-[700] m-1">
                    {item.title}
                  </p>
                  <div className="flex items-center">
                    <Image
                      className="m-2"
                      src="/icons/time.svg"
                      width={19}
                      height={19}
                      alt="icon"
                    />
                    <p className="text-xs text-[#fff] m-1">{item.time}</p>
                  </div>
                </div>
              </div>
            )}
          </Slider>
        </div> */}

        <div className="flex mt-[50px] bg-[#3581FF] rounded-2xl mx-4 py-3 min-h-[6.5rem] items-center -sm:flex-wrap justify-evenly">
          <div className="flex flex-col items-center xs:flex-row p-1">
            <Image
              className="p-2 bg-[#fff] rounded-2xl mx-4"
              src={HLogo.src}
              alt="Takhasos Niro logo"
              width={66}
              height={66}
            />
            <p className="text-[17px] font-[700] text-[#FFFFFF]">
              دانلود اپلیکیشن حرفه ای
            </p>
          </div>

          <div className="flex items-center  flex-1 flex-col md:flex-row flex-wrap xl:gap-10 justify-evenly px-4 md:px-0">
            <div className=" w-full md:w-fit   m-1">
              <Button
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                <span>دریافت برای IOS</span>
                <Image
                  className=" -translate-y-0.5  xs:-translate-y-0.5 "
                  src="/icons/apple-ios.svg"
                  alt="Takhasos Niro logo"
                  width={40}
                  height={31}
                />
              </Button>
            </div>
            <div className="  w-full md:w-fit m-1">
              <Button
                href="https://myket.ir/app/com.herfeei.twa"
                target="_blank"
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                دریافت از
                <Image
                  className=""
                  src="/icons/myket.svg"
                  alt="Takhasos Niro logo"
                  width={100}
                  height={31}
                />
              </Button>
            </div>
            <div className=" w-full md:w-fit  m-1">
              <Button
                href="https://cafebazaar.ir/app/com.herfeei.twa"
                target="_blank"
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                دریافت از
                <Image
                  className=""
                  src="/icons/bazar.svg"
                  alt="Takhasos Niro logo"
                  width={75}
                  height={31}
                />
              </Button>
            </div>
            <div className=" w-full md:w-fit m-1">
              <Button
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                دریافت مستقیم برای اندروید{" "}
              </Button>
            </div>
          </div>
        </div>
        <span className="h-[20px] block w-full" />
      </main>
    </>
  );
}
