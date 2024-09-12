import React from "react";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Image from "next/image";

const WorkSamplesS = ({ expertSampleListInitial }) => {
  return (
    <div className="border-solid border-[1px] border-[#D6D6D6] p-3 px-5">
      <h2 className="text-xl font-semibold mb-4">نمونه کار متخصص:</h2>
      <Swiper
        speed={500}
        spaceBetween={5} // Adjust the space between slides
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
        {expertSampleListInitial?.map((sample) => (
          <SwiperSlide
            key={sample.id}
            className="border-solid border-[1px] !w-[212px] mx-2 border-[#D6D6D6] rounded-[8px]"
          >
            <div>
              {/* Display expert work image */}
              <div className="relative !w-[212px]  h-[233px]">
                <Image
                  src={sample?.images[0]?.image}
                  alt={`Work Sample ${sample?.id}`}
                  fill
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-lg px-3 font-medium mb-2">{sample?.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSamplesS;
