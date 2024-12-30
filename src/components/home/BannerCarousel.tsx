"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

const bannerSlides = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
  // Add more banner images as needed
];

export function BannerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 6000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [api]);

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
        align: "start",
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {bannerSlides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-[16/6] sm:aspect-[16/5] lg:aspect-[16/4]">
              <Image
                src={slide}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Custom Navigation Dots */}
      <div className="bg-background px-5 py-3 rounded-full absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
            }}
            className={`rounded-full size-3 transition-colors ${
              current === index
                ? "bg-primary w-8"
                : "bg-primary/50 hover:bg-primary/60 "
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
