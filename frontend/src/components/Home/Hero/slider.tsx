import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { pricedeta } from "@/app/api/data";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

const CardSlider = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 1800,
    speed: 360,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="mt-12 lg:mt-16">
      <Slider {...settings}>
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
