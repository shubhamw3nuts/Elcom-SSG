import Image from 'next/image';
import Link from "next/link";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    return `${day}${suffix} ${month} ${year}`;
}

const NeweventSec = (props) => {
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

    const { eventId, title, featuredImage, excerpt, eventsPostTypeOptions,uri } = props.eventData;
    return (
        <>
            <div className="neweventwrap">
                <div className="container">
                    <div className="edsec">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className='edgrp fadeInUp'>
                                    <div className="edleft">
                                        {eventsPostTypeOptions && <h6 className="small-text">{eventsPostTypeOptions.eventType}</h6>}
                                        <h4>{title}</h4>
                                        {
                                            eventsPostTypeOptions && (
                                                eventsPostTypeOptions.eventStartDate == eventsPostTypeOptions.eventEndDate ?
                                                    <h6>{eventsPostTypeOptions.eventStartDate && formatDate(eventsPostTypeOptions.eventStartDate)}</h6>
                                                    :
                                                    <h6>{eventsPostTypeOptions.eventStartDate && formatDate(eventsPostTypeOptions.eventStartDate)} -   {eventsPostTypeOptions.eventEndDate && formatDate(eventsPostTypeOptions.eventEndDate)}</h6>
                                            )
                                        }
                                        {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} className="custom_html"></div>}
                                        {eventsPostTypeOptions?.joinNowLink && <div className="btnbox">
                                            <Link className="elcom-btn tertiary-btn" href={eventsPostTypeOptions?.joinNowLink?.url} target={eventsPostTypeOptions?.joinNowLink?.target}>{eventsPostTypeOptions?.joinNowLink?.title ? eventsPostTypeOptions?.joinNowLink?.title : 'Join'}</Link>
                                        </div>}
                                    </div>
                                    {featuredImage &&
                                        <div className='edimg flex-shrink-0'>
                                            <Image src={featuredImage.node.sourceUrl} width={577} height={354} alt='esgimg' />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NeweventSec;