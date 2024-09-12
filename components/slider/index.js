import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Link from "next/link";

const Slider = ({
  data = [],
  children,
  title,
  link = "/",
  bg = "white",
  slideWidth = "280px",
  spaceBetween = "30",
  more,
}) => {
  return (
    <div className="px-2 w-full" style={{ background: bg }}>
      {title && (
        <div className="flex items-center justify-start flex-wrap ">
          <Link
            className="text-2xl m-1 md:mt-4 text-[1rem] text-[#fff]"
            href={link}
          >
            <h2 className=" text-[16px] font-[600] sm:text-[20px] md:text-[22px] md:font-[700] md:mt-4 text-[#212121]">
              {title}
            </h2>
          </Link>
        </div>
      )}

      <Swiper
        speed={500}
        spaceBetween={spaceBetween} // Adjust the space between slides
        slidesPerView={"auto"}
        // Lazy={true}
        lazyPreloadPrevNext={true}
        breakpoints={{
          0: {
            lazyPreloadPrevNext: 10,
          },
          325: {
            lazyPreloadPrevNext: 10,
          },
          393: {
            lazyPreloadPrevNext: 10,
          },
          768: {
            lazyPreloadPrevNext: 10,
          },
        }} // Automatic number of slides
        centeredSlides={false} // Align slides to the start
        // navigation={true}
        freeMode={{
          enabled: true,
          sticky: false,
        }}
        // freeModeMomentum={true}
        // freeModeSticky={false}
        // scrollbar={{ draggable: true }}
        modules={[FreeMode, Pagination, Navigation, Scrollbar]}
      >
        {data.map((item, index) => (
          <SwiperSlide
            style={{ width: slideWidth, borderRadius: "1rem" }}
            key={index}
          >
            {typeof children === "function" ? children(item) : children}
          </SwiperSlide>
        ))}

        <SwiperSlide style={{ width: "fit-content" }}>
          <Link href={link}>{more}</Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
