import { useState , useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from "next/image";
import React from "react";
import SectionTitle from "./layouts/SectionTitle";

const AboutSec =({sectionHeading,heading,description,buttonInfo,aboutImage}) => {
    
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
    
    return (
        <>
            <div className="manufacturWrap">
                <div className="mafaWrapper">
                    <SectionTitle sectionHeading={sectionHeading} heading={heading} description={description} buttonInfo={buttonInfo} />
                    <div className="container">
                        {aboutImage && 
                        <div className={`mafaImg product ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                            <Image src={aboutImage.sourceUrl} width={1312} height={600} alt="mafaImg"></Image>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSec;