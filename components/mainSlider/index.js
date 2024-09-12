import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import frame from "../../public/images/frame.jpg";
import frame1 from "../../public/images/frame1.jpg";
import useWindowWidth from "../../core/utils/useWindowWidth";
import { useRouter } from "next/router";

const MainSlider = ({ data = [], getSlider }) => {
  const windowWidth = useWindowWidth();
  const router = useRouter();
  return (
    <div
      className={`group hover:cursor-pointer w-[100%] 2xl:mt-4 xl:mt-3 lg:mt-3 md:mt-3 sm:mt-3 xs:mt-3 mt-3 2xl:h-[410px] xl:h-[335px] lg:h-[300px] md:h-[290px] sm:h-[250px] xs:h-[210px] ${
        windowWidth < 320 ? "h-[120px]" : " h-[155px]"
      } mx-auto`}
    >
      <Swiper
        modules={[Pagination, Navigation, Scrollbar, Autoplay]}
        observer={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        lazyPreloadPrevNext={2}
        speed={500}
        initialSlide={1}
        centeredSlides={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={true}
        breakpoints={{
          0: {
            slidesPerView: 1.07,
            lazyPreloadPrevNext: 2,
            spaceBetween: 0,
          },
          325: {
            slidesPerView: 1.07,
            lazyPreloadPrevNext: 2,
            lazyPreloadPrevNext: 2,
            spaceBetween: 0,
          },
          393: {
            slidesPerView: 1.07,
            lazyPreloadPrevNext: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            lazyPreloadPrevNext: 2,
            spaceBetween: 0,
          },
        }}
        className="w-full h-full"
      >
        {getSlider?.map((item, index) => (
          <SwiperSlide
            onClick={() => router.push(item?.url)}
            className="w-full"
            style={{
              objectFit: "contain",
              aspectRatio: "auto",
              height: "100%",
            }}
            key={index}
          >
            <div className="relative h-full lg:w-[96%] md:w-[95%] sm:w-[98%] xs:w-[97.5%] w-[97.5%] mx-auto">
              <Image
                className={`rounded-[16px] sm:rounded-[20px] w-full h-full ${
                  windowWidth > 1024 ? "object-cover" : "object-fill"
                } `}
                src={
                  item !== null && windowWidth < 1024
                    ? item?.image_phone_size
                    : item !== null && windowWidth > 1024
                    ? item?.image_desktop_size
                    : windowWidth > 1024
                    ? frame
                    : frame1
                }
                quality={100}
                fill
                alt="banner"
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev-custom opacity-0 group-hover:opacity-100 hidden md:block w-[22px] h-[22px] xs:w-[27px] xs:h-[27px] sm:w-[33px] sm:h-[33px] md:w-[40px] md:h-[40px] aspect-square absolute z-[5] right-[0px] xs:right-[1px] sm:right-[3px] md:right-[1px] xl:right-[5px] 2xl:right-[10px] 2xl:top-[185px] xl:top-[152px] lg:top-[135px] md:top-[128px] sm:top-[120px] xs:top-[91px] top-[80px] cursor-pointer  hover:scale-105 transition-all	duration-200">
          <Image
            src="/icons/slider-right-arrow.svg"
            alt="navigation icon"
            sizes="(width:100%) 100vw,(heigh:100%) 100vw"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="swiper-button-next-custom opacity-0 group-hover:opacity-100 hidden md:block w-[22px] h-[22px] xs:w-[27px] xs:h-[27px] sm:w-[33px] sm:h-[33px] md:w-[40px] md:h-[40px] aspect-square absolute z-[5] left-[0px] xs:left-[1px] sm:left-[3px] md:left-[1px] xl:left-[5px] 2xl:left-[10px] 2xl:top-[185px] xl:top-[152px] lg:top-[135px] md:top-[128px] sm:top-[120px] xs:top-[91px] top-[80px] cursor-pointer  hover:scale-105 transition-all	duration-200">
          <Image
            src="/icons/slider-left-arrow.svg"
            alt="navigation icon"
            sizes="(width:100%) 100vw,(heigh:100%) 100vw"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </Swiper>
    </div>
  );
};

export default MainSlider;
