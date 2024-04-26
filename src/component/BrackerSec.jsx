import SplitText from './layouts/SplitText';
import Image from "next/image";
import Link from 'next/link';
import { gsap } from "gsap/dist/gsap";
import {  useEffect } from 'react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const BrackerSec = ({ smallHeading, heading, description, buttonInfo, leftImage, rightImage }) => {
    useEffect( () => {
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
            <div className="brackerwrap">
                {leftImage && <div className="brackerleft">
                    <Image src={leftImage?.sourceUrl} width={681} height={454} alt="bracker2"></Image>
                </div>}
                {rightImage && <div className="brackerright">
                    <Image src={rightImage?.sourceUrl} width={582} height={402} alt="bracker1"></Image>
                </div>}
                <div className="container">
                    <div className="brackerdtl">
                        {smallHeading && <h6 className="label-text">{smallHeading}</h6>}
                        {heading && <h2><SplitText copy={heading} role="heading" /></h2>}
                        {description && <p className='fadeInUp'>{description}</p>}
                        {
                            buttonInfo &&
                            <div className="btnbox justify-content-center fadeInUp-btn">
                                <Link className="elcom-btn primary-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}
export default BrackerSec;