import Image from 'next/image';
import Link from "next/link";
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import CareerpathSec from './CareerpathSec';
import SplitText from '@/component/layouts/SplitText';

const CapebilitySec = ({ sectionHeading, heading, description, info, buttonInfo, image }) => {

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
    if (sectionHeading || heading || description ) {
        return (
            <>
                <div className="capebilitywrap">
                    <div className='capdetail'>
                        <CareerpathSec sectionHeading={sectionHeading} />
                        <div className='container'>
                            <div className='capcontact'>
                                <div className='row'>
                                    <div className={`col-lg-${image ? '5' : '12'}`}>
                                        <div className='capleftdtl'>
                                            <div className='capheading'>
                                                <h2><SplitText copy={heading} role={heading} /></h2>
                                                {description && <p className='fadeInUp'>{description}</p>}
                                            </div>
                                            {info && <div className='captext fadeInUp'>
                                                <ul>
                                                    {info.map((data, index) => {
                                                        const { heading, description } = data;
                                                        if (heading || description) {
                                                            return <li key={index}>
                                                                {heading && <h6>{heading}</h6>}
                                                                {description && <span>{description}</span>}
                                                            </li>
                                                        }
                                                    })}
                                                </ul>
                                            </div>}
                                            {buttonInfo && <div className='btnbox'>
                                                <Link href={buttonInfo.url} target={buttonInfo.target} className='elcom-btn primary-btn'>{buttonInfo.title}</Link>
                                            </div>}
                                        </div>
                                    </div>
                                    {image && <div className='col-lg-7'>
                                        <div className='capimgsec'>
                                            <Image src={image.sourceUrl} alt='pduimage' width={747} height={720} />
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default CapebilitySec;