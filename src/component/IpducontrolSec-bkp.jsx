import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useLayoutEffect, useRef , useEffect , useState } from 'react';

const IpducontrolSec = ({ info }) => {

  gsap.registerPlugin(ScrollTrigger)

  const triggerBlkRef = useRef(null);

  useEffect(() => {

    let targetElements = document.querySelectorAll(".ipdudtl");
    let spanElements = document.querySelectorAll(".ipduwrapper .ipduheading h2 span");

    function isElementScrolledByNegative50Percent(element) {
        let elementRect = element.getBoundingClientRect();
        let viewportHeight = window.innerHeight;
        let elementCenter = elementRect.top + elementRect.height / 2;
        let scrollThreshold = viewportHeight * -0.10; // Set to -10% of viewport height
    
        console.log('isElementScrolledByNegative50Percent', elementRect, viewportHeight, elementCenter);
    
        return elementCenter >= scrollThreshold && elementCenter <= scrollThreshold + elementRect.height;
    }

    function addClassOnScroll() {
        function isElementInViewport(element, scrollThreshold) {
            let elementRect = element.getBoundingClientRect();
            let viewportHeight = window.innerHeight;
            let elementBottom = elementRect.top + elementRect.height;
        
            return (
                elementBottom >= viewportHeight * scrollThreshold &&
                elementRect.top <= viewportHeight
            );
        }
        
        targetElements.forEach((targetElement, targetIndex) => {
            if (targetIndex === 0) {
                // Special condition for the first target element
                // Toggle the 'active' class based on scroll
                if (isElementInViewport(targetElement, 0.2)) {
                    spanElements[targetIndex].classList.add("active");
                } else {
                    spanElements[targetIndex].classList.remove("active");
                }
            } else {
                // General condition for other target elements
                if (isElementScrolledByNegative50Percent(targetElement)) {
                    spanElements[targetIndex].classList.add("active");
                } else {
                    spanElements[targetIndex].classList.remove("active");
                }
            }
        });
        
    }


    
    window.addEventListener('scroll', addClassOnScroll);

    return () => {
      window.removeEventListener('scroll', addClassOnScroll);
    };
  }, []);
    // 
  const { heading, tabInfo } = info;
    // if (info.tabInfo) {
        return (
            <>
                <div className="ipduwrapper">
                    <div className="ipdudtlwrap">
                        <div className="ipduheading">
                            <div className="container">
                                <div className="ipduwrapper-title">
                                    <h2>
                                        <span>Connect.</span>
                                        <span>Measure.</span>
                                        <span>Control.</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            { info.map((tabInfo , index)=> {
                                return (
                                <div className='ipdudtl' ref={triggerBlkRef} key={index}>
                                    <Tabs
                                            defaultActiveKey={tabInfo.tabHeading}
                                            id="uncontrolled-tab-example"
                                            className="idpu-1">
                                            {tabInfo.tabInfo.map((tab, index) => {
                                                const { tabHeading, heading, description, image } = tab;
                                                return (
                                                    <Tab eventKey={tabHeading} key={index} title={tabHeading}>
                                                        <div className='ipdubox'>
                                                            <div className='row'>
                                                                <div className={`col-lg-${image ? '6' : '12'}`}>
                                                                    <div className='ipduboxdtl'>
                                                                        <div className='ipduttl'>
                                                                            {heading && <h4>{heading}</h4>}
                                                                            {description && <p>{description}</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {image && <div className='col-lg-6'>
                                                                    <div className='idpuimg'>
                                                                        <Image src={image.sourceUrl} width={634} height={482} alt='ipduimg1' />
                                                                    </div>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                )
                                            })}
                                    </Tabs>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
        // }
    return ''
}

export default IpducontrolSec;