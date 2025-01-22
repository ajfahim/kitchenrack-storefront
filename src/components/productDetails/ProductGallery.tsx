"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { useState } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Autoplay, EffectFade, FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

// Define the props type
interface ProductGalleryProps {
  images: string[]; // Array of image URLs
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperType>(null);

  return (
    <div className="flex gap-4">
      {/* Thumbnails Swiper */}
      <div className="hidden lg:block">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          slidesPerView={6}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className="h-[524px] w-20"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={300}
                height={300}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover rounded-md cursor-pointer size-20"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Swiper */}
      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, EffectFade, Thumbs]}
        autoplay={{ delay: 3000 }}
        effect="fade"
        className="w-full "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <AspectRatio ratio={1}>
              <Image
                width={500}
                height={500}
                src={image}
                alt={`Main Slide ${index + 1}`}
                className="object-cover rounded-md w-full h-auto"
              />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
