import SplitText from './layouts/SplitText'
import Image from "next/image"
import Link from 'next/link';
import React from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {  useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";

gsap.registerPlugin(ScrollTrigger);

const TowardGreen = ({backgroundImage,heading,description,buttonInfo}) => {

    useEffect(() => {
        gsap.set(".fadeInUp", {y: "30%", opacity: 0,});
         ScrollTrigger.batch(".fadeInUp", {
           onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.3, stagger: 0.2, y:0}),
         });
         gsap.set(".fadeInUp-btn", {y: "30%", opacity: 0,});
         ScrollTrigger.batch(".fadeInUp-btn", {
           onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.6, stagger: 0.2, y:0}),
         });
     }, [])

    return (
        <>
        {(backgroundImage || heading || description || buttonInfo) && 
         <div className="towardwrap">
            {backgroundImage && <div className="towardimg">
                <Image src={backgroundImage.sourceUrl} width={1440} height={456} alt="TowardImg"></Image>
            </div>}
            <div className="towardwrapper">
                <div className="container">
                    <div className="brackerdtl">
                        {heading && <h3><SplitText copy={heading} role="heading" /></h3>}
                        {description && <p className='fadeInUp'>{description}</p>}
                        {buttonInfo && <div className="btnbox justify-content-center fadeInUp-btn">
                            <Link className="elcom-btn primary-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                        </div>}
                    </div>
                </div>
            </div>
         </div>
         }
        </>
    )
}

export default TowardGreen;