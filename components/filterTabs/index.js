import Button from "@mui/material/Button";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Image from "next/image";


const defaultStyles = {
  fontSize: "14px",
  height: "2rem",
  borderRadius: ".5rem"
};

const deselectedFilterStyle = {
  borderWidth: "2px",
  borderColor: "#999CA0",
  color: "#000000",
  fontWeight: "600",
  ...defaultStyles
};

const FilterTabs = ({ filters, selectedFilter, setSelectedFilter }) => {
  return (
    <div className="mr-6">
      <Swiper
        speed={500}
        spaceBetween={5}
        slidesPerView={"auto"}
        centeredSlides={false}
        freeMode={true}
        freeModeMomentum={true}
        freeModeSticky={false}
        modules={[FreeMode, Pagination]}
      >
        {filters.map((filter, index) => (
          <SwiperSlide style={{ width: "fit-content" }} key={index}>
            <Button
              key={filter.id}
              variant={selectedFilter === filter.name ? "contained" : "outlined"}
              sx={selectedFilter === filter.name ? defaultStyles : deselectedFilterStyle}
              onClick={() => setSelectedFilter(filter.name)}

            >
              <Image
                className="ml-2"
                src={filter.icon}
                alt="icon"
                width={24}
                height={24}
              />
              {filter.name}
            </Button>
          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
};

export default FilterTabs;