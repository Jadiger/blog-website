import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export  default function swipperSlide  ({array})  {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      
      {array.map(item=> {
        return (
            <SwiperSlide>Slide 1</SwiperSlide>
        )
      })}
      ...
    </Swiper>
  );
};