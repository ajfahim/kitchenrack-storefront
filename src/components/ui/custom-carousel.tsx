"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CustomCarouselProps {
  items: React.ReactNode[];
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  itemsToShow?: number;
}

export function CustomCarousel({
  items,
  autoplay = true,
  interval = 6000,
  showDots = true,
  showArrows = false,
  itemsToShow = 1,
}: CustomCarouselProps) {
  console.log("🚀 ~ items:", items);
  console.log("🚀 ~ itemsToShow:", itemsToShow);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap());
  //   });
  // }, [api]);

  // useEffect(() => {
  //   if (!api || !autoplay || isPaused) {
  //     return;
  //   }

  //   const autoplayInterval = setInterval(() => {
  //     api.scrollNext();
  //   }, interval);

  //   return () => clearInterval(autoplayInterval);
  // }, [api, autoplay, interval, isPaused]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        className={cn("w-full relative")}
        opts={{
          loop: true,
          align: "center",
        }}
        setApi={setApi}
      >
        <CarouselContent
          className={cn(itemsToShow > 1 && "-ml-1 md:-ml-2 lg:-ml-3 xl:-ml-3")}
        >
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn(
                itemsToShow > 1 &&
                  `pl-1 md:pl-2 lg:pl-3 xl:pl-3 basis-full md:basis-1/${
                    itemsToShow - 2
                  } lg:basis-1/${itemsToShow - 1} xl:basis-1/${itemsToShow}`
              )}
            >
              {itemsToShow > 1 ? (
                item
              ) : (
                <div
                  className={cn(
                    "relative aspect-[14/6] sm:aspect-[16/5] lg:aspect-[16/5]"
                  )}
                >
                  {item}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrow Navigation */}
        {showArrows && (
          <>
            <button
              onClick={() => api?.scrollPrev()}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-20",
                "size-10 rounded-full flex items-center justify-center",
                "bg-background/80 hover:bg-background transition-colors",
                "border border-neutral/10",
                "focus:outline-none focus:ring-2 focus:ring-primary"
              )}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 z-20",
                "size-10 rounded-full flex items-center justify-center",
                "bg-background/80 hover:bg-background transition-colors",
                "border border-neutral/10",
                "focus:outline-none focus:ring-2 focus:ring-primary"
              )}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {showDots && (
          <div
            className={cn(
              "bg-background px-3 py-2 md:px-5 md:py-3 rounded-full absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"
            )}
          >
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  api?.scrollTo(index);
                }}
                className={cn(
                  "rounded-full size-2 md:size-3 transition-colors",
                  current === index
                    ? cn("bg-primary w-6 md:w-8")
                    : cn("bg-primary/50 hover:bg-primary/60")
                )}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}