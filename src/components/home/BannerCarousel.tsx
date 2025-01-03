"use client";

import { CustomCarousel } from "@/components/ui/custom-carousel";
import Image from "next/image";

const bannerSlides = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
  // Add more banner images as needed
];

export function BannerCarousel() {
  const bannerItems = bannerSlides.map((slide, index) => (
    <Image
      key={index}
      src={slide}
      alt={`Banner ${index + 1}`}
      fill
      className="object-cover rounded-lg"
      priority={index === 0}
    />
  ));

  return <CustomCarousel items={bannerItems} showArrows />;
}
