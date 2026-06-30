"use client";

import { useCallback, useEffect, useRef } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { pricedeta } from "@/app/api/data";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

const AUTOPLAY_RESUME_MS = 2000;

const CardSlider = () => {
  const sliderRef = useRef<Slider>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedByDragRef = useRef(false);

  const pauseAutoplay = useCallback(() => {
    sliderRef.current?.slickPause();
  }, []);

  const scheduleAutoplayResume = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      sliderRef.current?.slickPlay();
    }, AUTOPLAY_RESUME_MS);
  }, []);

  const handleSwipeStart = useCallback(() => {
    pauseAutoplay();
    pausedByDragRef.current = true;
  }, [pauseAutoplay]);

  const handleDragEnd = useCallback(() => {
    if (!pausedByDragRef.current) return;

    pausedByDragRef.current = false;
    scheduleAutoplayResume();
  }, [scheduleAutoplayResume]);

  const bindDragEndListeners = useCallback(() => {
    const list = sliderRef.current?.innerSlider?.list;
    if (!list || list.dataset.dragEndBound === "true") return;

    list.dataset.dragEndBound = "true";
    list.addEventListener("mouseup", handleDragEnd);
    list.addEventListener("touchend", handleDragEnd);
    list.addEventListener("touchcancel", handleDragEnd);
  }, [handleDragEnd]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const settings: Settings = {
    autoplay: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: true,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 1800,
    speed: 360,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    swipeEvent: handleSwipeStart,
    onSwipe: handleDragEnd,
    onInit: bindDragEndListeners,
    onReInit: bindDragEndListeners,
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 1, swipeToSlide: true } },
      { breakpoint: 992, settings: { slidesToShow: 2, swipeToSlide: true } },
      { breakpoint: 1200, settings: { slidesToShow: 3, swipeToSlide: true } },
    ],
  };

  return (
    <div className="mt-12 lg:mt-16 cursor-grab active:cursor-grabbing [&_.slick-track]:cursor-grab [&_.slick-track]:active:cursor-grabbing">
      <Slider ref={sliderRef} {...settings}>
        {pricedeta.map((item, index) => (
          <div key={index} className="px-2 py-1">
            <div className="flex min-h-[108px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.09]">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary/15">
                <Image src={`${getImagePrefix()}${item.icon}`} alt={`${item.title} icon`} width={36} height={36} className="h-9 w-9 object-contain" />
              </div>
              <p className="text-16 font-semibold leading-snug text-white">{item.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
