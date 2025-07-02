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
    autoplaySpeed: 1500,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  return (
    <div className="lg:-mt-16 mt-16">
      <Slider {...settings}>
        {pricedeta.map((item, index) => (
          <div key={index} className="lg:pr-6">
            <div className=" flex items-center px-5 py-6 bg-dark_grey bg-opacity-80 rounded-xl">
              <div className="flex items-center gap-5">
                <div className="bg-light_grey rounded-full flex items-center justify-center w-16 h-16 flex-shrink-0">
                  <Image
                    src={`${getImagePrefix()}${item.icon}`}
                    alt="icon"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <p className="text-16 text-white leading-tight">
                  <span className="font-semibold">{item.title}</span>
                </p>
              </div>

            </div>
          </div>

        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;