// "use client";
// import React from "react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import { Navigation, Thumbs } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// const ProductGallery: React.FC = () => {
//   const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

//   const images = [
//     "/products/almond.png",
//     "/products/cashew.png",
//     "/products/walnut.png",
//   ];

//   return (
//     <div className="product-gallery">
//       <Swiper
//         modules={[Navigation, Thumbs]}
//         navigation
//         thumbs={{ swiper: thumbsSwiper }}
//         className="main-gallery"
//         spaceBetween={10}
//         slidesPerView={1}
//       >
//         {images.map((src, index) => (
//           <SwiperSlide key={index}>
//             <img src={src} alt={`Product Image ${index + 1}`} />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <Swiper
//         modules={[Thumbs]}
//         onSwiper={setThumbsSwiper}
//         spaceBetween={10}
//         slidesPerView={3}
//         watchSlidesProgress
//         className="thumb-gallery"
//       >
//         {images.map((src, index) => (
//           <SwiperSlide key={index}>
//             <img src={src} alt={`Thumbnail ${index + 1}`} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ProductGallery;

"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

const ProductGallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    "/products/almond.png",
    "/products/cashew.png",
    "/products/walnut.png",
  ];

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <AspectRatio ratio={1} className="mb-4">
        <img
          src={images[activeImage]}
          alt={`Main Product Image ${activeImage + 1}`}
          className="rounded-lg object-cover w-full h-full"
        />
      </AspectRatio>

      {/* Thumbnails */}
      <Tabs defaultValue={`thumb-${activeImage}`} className="thumbnails">
        <TabsList className="flex space-x-4">
          {images.map((src, index) => (
            <TabsTrigger
              key={index}
              value={`thumb-${index}`}
              onClick={() => setActiveImage(index)}
              className={`cursor-pointer p-2 border rounded ${
                activeImage === index ? "border-primary" : "border-gray-300"
              }`}
            >
              <AspectRatio ratio={1} className="w-16">
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full rounded"
                />
              </AspectRatio>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProductGallery;
