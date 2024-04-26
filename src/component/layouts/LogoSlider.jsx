import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

const LogoSlider = ({ logosInfo }) => {
    var settings = {
        dots: false,
        arrows: false,
        // infinite: true,
        speed: 500,
        slidesToShow: logosInfo.length > 7 ? 7 :  logosInfo.length,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 8000,
        pauseOnHover: false,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 767,
                settings: { slidesToShow: logosInfo.length > 2 ? 2 :  logosInfo.length  }
            },
            {
                breakpoint: 991,
                settings: { slidesToShow: logosInfo.length > 4 ? 4 :  logosInfo.length  }
            },
            {
                breakpoint: 1199,
                settings: { slidesToShow: logosInfo.length > 5 ? 5 :  logosInfo.length  }
            }
        ]
    };
    if (logosInfo?.length > 0) {
        return (
            <div className="truecomp-sec">
                
                    {/* <h5>Trusted by the world's most innovative companies</h5> */}
                    <div className="slider-wrap">
                        <Slider {...settings}>
                            {logosInfo.map((logo, index) => {
                                let image = '';
                                if (logo.logoImage) {
                                    image = logo.logoImage?.sourceUrl;
                                } else if (logo.image) {
                                    image = logo.image?.sourceUrl;
                                } else {
                                    image = logo.logoImage?.sourceUrl;
                                }
                                return (
                                    <React.Fragment key={index}>
                                        {image &&
                                            <div className="logo-box">
                                                <Image src={image} width={116} height={87} alt="Certificate Logo" />
                                            </div>}
                                    </React.Fragment>
                                )
                            })}
                        </Slider>
                    </div>
                
            </div>
        )
    } else {
        return null;
    }
}
export default LogoSlider;