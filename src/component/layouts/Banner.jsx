import SplitText from "./SplitText";
import Image from "next/image"
import Link from 'next/link';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);
const Banner = ({ bannerData }) => {
    const settings = {
        infinite: false,
        dots: true,
        slidesToShow: 1,
        // fade: true,
        slidesToScroll: 1,
        lazyLoad: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    useEffect(() => {

        gsap.set(".fadeInUp", { y: "30%", opacity: 0, });
        ScrollTrigger.batch(".fadeInUp", {
            onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.3, stagger: 0.2, y: 0 }),
        });
        gsap.set(".fadeInUp-btn", { y: "30%", opacity: 0, });
        ScrollTrigger.batch(".fadeInUp-btn", {
            onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.6, stagger: 0.2, y: 0 }),
        });
    }, [])

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });


    const [addClass, setAddClass] = useState(false);

    useEffect(() => {
        if (inView && !addClass) {
            // Add a delay of 1000 milliseconds (1 second) before adding the class
            const delayTimeout = setTimeout(() => {
                setAddClass(true);
            }, 500);

            // Clear the timeout if the component goes out of view before the delay
            return () => clearTimeout(delayTimeout);
        }
    }, [inView, addClass]);

    return (
        <div className='bannerbg'>
            <div className="mainbanner">

                <div className="imgslider">
                    <Slider {...settings}>
                        {bannerData.map((item, index) => {
                            const { heading, subheading, image, backgroundImage, buttonInfo, darkGradientEffect } = item;
                            let mainClass = '';
                            if (backgroundImage) {
                                mainClass = 'slide2bg';
                            } else {
                                mainClass = 'slide1bg';
                            }
                            if (darkGradientEffect) {
                                mainClass = 'slide3bg'
                            }
                            return (
                                <div key={index} className="sliderwrap">
                                    {
                                        backgroundImage &&
                                        <div className={`${mainClass} slidesbg`}>
                                            <Image src={backgroundImage.sourceUrl} width={1440} height={837} alt="" />
                                        </div>
                                    }
                                    <div className={`slidergrp ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    {heading && <h1><SplitText copy={(heading)} role="heading" /></h1>}
                                                    {subheading && <p className="fadeInUp">{subheading}</p>}
                                                    {buttonInfo && <div className="btnbox fadeInUp-btn">
                                                        <Link className="elcom-btn primary-btn " href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {image &&
                                        <>
                                            <div className="imgbanner">
                                                <Image src={image.sourceUrl} width={650} height={700} alt="" />
                                            </div>
                                        </>
                                    }
                                </div>)
                        })}
                    </Slider>
                </div>

            </div>
        </div>

    )
}

export default Banner;

