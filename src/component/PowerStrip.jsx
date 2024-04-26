import SplitText from './layouts/SplitText'
import Image from "next/image"
import Link from 'next/link';
import {  useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PowerStrip = ({ backgroundColor, buttonInfo, description, heading, image, title }) => {
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
            {(title || heading || image || description || buttonInfo) &&
                <div className="stripwrap" data-color={backgroundColor}>
                    <div className="container">
                        <div className="stripwrapper">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="stripdtl">
                                        {title && <h6 className="label-text">{title}</h6>}
                                        {heading && <h2><SplitText copy={heading} role="heading" /></h2>}
                                        {description && <p className='fadeInUp'>{description}</p>}
                                        {buttonInfo && <div className="btnbox fadeInUp-btn">
                                            <Link className="elcom-btn primary-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                                        </div>}
                                    </div>
                                </div>
                                {image && <div className="col-lg-6">
                                    <div className="stripimg">
                                        <Image src={image?.sourceUrl} width={653} height={412} alt="PowerStripImg"></Image>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PowerStrip;