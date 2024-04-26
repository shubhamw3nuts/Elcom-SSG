
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { FullDateWithYear } from "@/utils/utils";
import SplitText from '@/component/layouts/SplitText';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const PowerdisSec = ({ title, categories, author, excerpt, content, featuredImage, date }) => {
    const [addClass, setAddClass] = useState(false);
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });

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

    let commaSeparatedNames = '';
    if (categories?.nodes.length > 0) {
        const categoryNames = categories?.nodes.map(category => category.name);
        commaSeparatedNames = categoryNames.join(', ');
    }

    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
          const paragraphs = containerRef.current.querySelectorAll('p');
          const h1 = containerRef.current.querySelectorAll('h1');
          const h2 = containerRef.current.querySelectorAll('h2');
          const h3 = containerRef.current.querySelectorAll('h3');
          const h4 = containerRef.current.querySelectorAll('h4');
          const h5 = containerRef.current.querySelectorAll('h5');
          const h6 = containerRef.current.querySelectorAll('h6');
          paragraphs.forEach((p) => p.classList.add('fadeInUp'));
          h1.forEach((h1) => h1.classList.add('fadeInUp'));
          h2.forEach((h2) => h2.classList.add('fadeInUp'));
          h3.forEach((h3) => h3.classList.add('fadeInUp'));
          h4.forEach((h4) => h4.classList.add('fadeInUp'));
          h5.forEach((h5) => h5.classList.add('fadeInUp'));
          h6.forEach((h6) => h6.classList.add('fadeInUp'));
        }
        gsap.set(".fadeInUp", {y: "30%", opacity: 0,});
        ScrollTrigger.batch(".fadeInUp", {
          onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.3, stagger: 0.2, y:0}),
        });
        gsap.set(".fadeInUp-btn", {y: "30%", opacity: 0,});
        ScrollTrigger.batch(".fadeInUp-btn", {
          onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.6, stagger: 0.2, y:0}),
        });
      }, []);

    return (
        <>
            <div className="pdwrap">
                <div className="pdwrapper">
                    <div className="container">
                        <div className="pdsec">
                            {commaSeparatedNames && <div className="pdlabel">
                                <h6 className="label-text">{commaSeparatedNames}</h6>
                            </div>}
                            <div className="row">
                                <div className="col-lg-6">
                                    {title && <div className="pdtitle">
                                        <h3><SplitText copy={title} role="title" /></h3>
                                    </div>}
                                    <div className="pddate">
                                        {date && <h6>{FullDateWithYear(date)}  </h6>}
                                        {author && <span>By {author.node.firstName}</span>}
                                    </div>
                                </div>
                                {excerpt && <div className="col-lg-6">
                                    <div className="pddetail custom_html" ref={containerRef} dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                                </div>}
                            </div>
                        </div>
                        {featuredImage && <div className={`pdimg product ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                            <Image src={featuredImage.node.sourceUrl} width={1310} height={757} alt="pdimg" />
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PowerdisSec;