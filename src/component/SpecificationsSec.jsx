import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import CareerpathSec from "./CareerpathSec";
import Image from "next/image";
import SplitText from '@/component/layouts/SplitText'
import { removeHTMLTags } from '@/utils/utils';

const SpecificationsSec = ({ characteristics, specificationSectionTitle }) => {
    const [actieveSpecification, setActiveSpecification] = useState([]);
    const activeSpecificationsHandler = (index) => {
        let arr = [...actieveSpecification];
        if (arr.includes(index)) {
            arr = arr.filter(item => item !== index)
        } else {
            arr.push(index);
        }
        setActiveSpecification(arr);
    }

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

    if (characteristics) {
        return (
            <div className={`paraBrief ${addClass ? 'visible' : ''}`} ref={inViewRef} id='specification_id'>
                <CareerpathSec sectionHeading={specificationSectionTitle || "SPECIFICATION"} />
                <div className='container'>
                    {characteristics.map((char, index) => {
                        const { icon, title, specifications, columnOneHeading, columnTwoHeading } = char;
                        if (title) {
                            return <div className={`paradetail ${actieveSpecification.includes(index) ? 'active' : ''}`} key={index}>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='progrp' onClick={() => activeSpecificationsHandler(index)}>
                                            {icon?.sourceUrl &&
                                                <div className='paraimg'>
                                                    <Image src={icon.sourceUrl} width={96} height={96} alt='starIcon' />
                                                </div>
                                            }
                                            {title && <div className='paratitle'>
                                                <h4><SplitText copy={removeHTMLTags(title)} role="title" /></h4>
                                            </div>}
                                        </div>
                                    </div>
                                    {(specifications) &&
                                        <div className='col-lg-6'>
                                            <div className='paraspecification'>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-6 col-md-6'>
                                                        <div className='tablettl'>
                                                            <h6>{columnOneHeading || "Parameters"}</h6>
                                                        </div>
                                                        <div className='tablettlwrap'>
                                                            <ul>
                                                                {specifications.map((specifiation, index) => {
                                                                    if (specifiation.parameter) {
                                                                        return <li key={index}>{specifiation.parameter}</li>
                                                                    }
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6 col-6 col-md-6'>
                                                        <div className='tablettl'>
                                                            <h6>{columnTwoHeading || "Specification"}</h6>
                                                        </div>
                                                        <div className='tablettlwrap'>
                                                            <ul>
                                                                {specifications.map((specifiation, index) => {
                                                                    if (specifiation.specification) {
                                                                        return <li key={index}>{specifiation.specification}</li>
                                                                    }
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default SpecificationsSec