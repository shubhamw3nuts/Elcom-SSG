
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import SplitText from '@/component/layouts/SplitText'
import { removeHTMLTags } from '@/utils/utils';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TitlecsrDetail = ({heading,description}) => {
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
        <div className="container">
                <div className={`csrdtl ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="row">
                        {heading && 
                        <div className="col-lg-6">
                            <div className="csrttl">
                                <h5><SplitText copy={removeHTMLTags(heading)} role="heading" /></h5>
                            </div>
                        </div>
                        }
                        {description && 
                        <div className="col-lg-6">
                            <div className="csrtext fadeInUp custom_html" dangerouslySetInnerHTML={{__html : description}}></div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TitlecsrDetail;