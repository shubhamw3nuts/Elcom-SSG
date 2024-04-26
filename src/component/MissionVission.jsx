

import SplitText from '@/component/layouts/SplitText';
import React from 'react';
import { useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionVision = ({ info }) => {
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
            <div className="visionWrap">
                <div className="container">
                    <div className="visionSec">
                        <div className="row">
                            {info.map((data, index) => {
                                const { heading, description, backgroundColor } = data;
                                if(heading || description){
                                    return (
                                        <React.Fragment key={index}>
                                            {(heading || description || backgroundColor) &&
                                                <div className="col-lg-6" >
                                                    <div className={`visionDtl ${backgroundColor == 'blue' ? 'blue' : ''}`}>
                                                        {heading && <h2><SplitText copy={heading} role="heading" /></h2>}
                                                        {description && <p className='fadeInUp'>{description}</p>}
                                                    </div>
                                                </div>
                                            }
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MissionVision; 