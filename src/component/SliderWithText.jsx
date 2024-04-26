import Head from 'next/head'
import Image from 'next/image';
import innerimg from "@/asset/images/innerimg.webp";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';

const SliderWithText = ({ sliderInfo }) => {
    const settings = {
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: false,
        autoplaySpeed: 5000,
    };
    if (sliderInfo) {
        return (
            <>
                <div className='wiringslider'>
                    <div className='innerslider'>
                        <div className="imgslider">
                            <Slider {...settings}>
                                {sliderInfo.map((item, index) => {
                                    const { backgroundImage, description, heading, subheading } = item;
                                    if (backgroundImage || heading || subheading || description) {
                                        return (
                                            <React.Fragment key={index}>
                                                <div className="wiringgrp">
                                                    {backgroundImage && <div className="innerimg flex-shrink-0" key={'  '}>
                                                        <Image src={backgroundImage.sourceUrl} alt="innerimg" width={1440} height={456} />
                                                    </div>}
                                                    <div className='wiringdtl'>
                                                        <div className='container'>
                                                            <div className='wiringbrief'>
                                                                <div className='wiringheading'>
                                                                    {heading && <h5>{heading}</h5>}
                                                                    {subheading && <h4>{subheading}</h4>}
                                                                    {description && <span>{description}</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                    return ''
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return ''
}

export default SliderWithText