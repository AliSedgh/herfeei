import Button from "@mui/material/Button";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


const defaultStyles = {
  fontSize: "14px",
  m: ".4rem",
  height: "2rem",
  borderRadius: "2rem"
};

const deselectedFilterStyle = {
  borderWidth: "2px",
  borderColor: "#3581FF",
  color: "#3581FF",
  fontWeight: "600",
  ...defaultStyles
};

const FilterButtons = ({ filters, selectedFilter, setSelectedFilter }) => {
  return (
    <div className="flex flex-wrap">
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
              {filter.name}
            </Button>
          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
};

export default FilterButtons;