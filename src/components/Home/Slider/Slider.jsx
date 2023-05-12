import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Slider.scss";

import background from "../../../images/background.jpg";
import background1 from "../../../images/background1.jpg";
import background2 from "../../../images/background3.jpg";

const Slider = () => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        fadeEffect={{
          crossFade: true,
        }}
      >
        <SwiperSlide>
          <img src={background} className="background" alt="background" />
          <div className="text-container">
            <div className="overlay overlay-1">
              <h1>FASHION</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={background1} className="background" alt="background" />
          <div className="text-container">
            <div className="overlay overlay-2">
              <h1>STYLES</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={background2} className="background" alt="background" />
          <div className="text-container">
            <div className="overlay overlay-3">
              <h1>FURNITURE</h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
