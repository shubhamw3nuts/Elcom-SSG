import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Link from "next/link";
import SplitText from '@/component/layouts/SplitText'
import { removeHTMLTags } from '@/utils/utils';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const SectionTitle = ({ sectionHeading, heading, description, buttonInfo, showDivider }) => {
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });
    const isShowDivider = showDivider || "Yes";
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

    if (sectionHeading || heading || description || buttonInfo) {
        return (
            <div className={`mafaContent ${addClass ? 'visible' : ''}`} ref={inViewRef} >
                <div className="container">
                    <div className={`lineEl ${isShowDivider == 'Yes' ? 'show' : 'hide'}`}></div>
                    <div className="mafagrp">
                        <div className="row">
                            {sectionHeading && <div className="col-lg-12 ">
                                <div className="mafaText">
                                    <h5 className="label-text" >{sectionHeading}</h5>
                                </div>
                            </div>}
                            {heading && <div className="col-lg-6">
                                <h3><SplitText copy={removeHTMLTags(heading)} role="heading" /></h3>
                            </div>}
                            {(description || buttonInfo) && <div className="col-xl-5 col-lg-6">
                                <div className="mafaText">
                                    {description && <div className="fadeInUp custom_html" dangerouslySetInnerHTML={{ __html: description }}></div>}
                                    {
                                        buttonInfo &&
                                        <div className="btnbox fadeInUp-btn">
                                            <Link className="elcom-btn primary-black-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                                        </div>
                                    }
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default SectionTitle;