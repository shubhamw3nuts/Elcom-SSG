import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import SplitText from '@/component/layouts/SplitText';
import CareerpathSec from "./CareerpathSec";

const SectiontitleImg = ({ sectionHeading, heading, description, info }) => {
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
            <div className="excellencewrap">
                <CareerpathSec sectionHeading={sectionHeading} />
                <div className="container">
                    <div className="excellencegrp">
                        <div className="row">
                            {heading &&
                                <div className="col-lg-6">
                                    <div className="excellenceheading">
                                        <h3><SplitText copy={heading} role={heading} /></h3>
                                    </div>
                                </div>}
                            <div className='col-lg-6'>
                                <div className='excellencecontact'>
                                    {description && <div className='excellencetext'>
                                        <p className="fadeInUp">{description}</p>
                                    </div>}

                                    {info && <div className='excellenceimg'>
                                        {info.map((data, index) => {
                                            let image = '';
                                            if (data?.certificationsTaxonomyFields?.image?.sourceUrl) {
                                                image = data?.certificationsTaxonomyFields?.image?.sourceUrl;
                                            }
                                            if(image){
                                                return <i key={index}><Image src={image} width={120} height={90} alt='capimg' /></i>
                                            }
                                            return ''
                                        })}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectiontitleImg;