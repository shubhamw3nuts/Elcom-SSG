import Image from "next/image"
import Link from 'next/link';
import EsoperationBox from "./layouts/EsoperationBox";
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import SplitText from '@/component/layouts/SplitText'

const OperationSec = ({ sectionHeading, heading, info }) => {
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

    return (
        <>
            <div className={`operationWrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                <div className="eesoSec">
                    <div className="container">
                        <div className="lineEl"></div>
                        <div className="esoWrap">
                            <div className="esoContent">
                                {sectionHeading && <h6 className="label-text">{sectionHeading}</h6>}
                                {heading &&
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="esoTtl">
                                                <h3><SplitText copy={heading} role="heading" /></h3>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                                {info.map((infrastructure, index) => {
                                    const { heading, description, imagesInfo } = infrastructure;
                                    return <EsoperationBox
                                        key={index}
                                        heading={heading}
                                        description={description}
                                        imagesInfo={imagesInfo}
                                    />
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OperationSec;