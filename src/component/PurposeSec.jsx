import SplitText from '@/component/layouts/SplitText';
import { useState, useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Purpose = ({ info }) => {
    const { heading, description, backgroundColor } = info;
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
    if (heading || description) {
        return (
            <>
                <div className="purposeWrap">
                    <div className="container">
                        <div className="purposeText skyblue blue" data-color={backgroundColor}>
                            {heading && <h2><SplitText copy={heading} role="heading" /></h2>}
                            {description && <p className='fadeInUp'>{description}</p>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return ''
}

export default Purpose;