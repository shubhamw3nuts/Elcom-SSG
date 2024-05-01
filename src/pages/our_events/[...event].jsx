import Image from "next/image";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { GET_ALL_EVENTS_SLUG, GET_EVENT_DETAIL_PAGE } from '@/queries/graphql_queries';
import client from '@/apollo_client/client';
import { FullDateWithYear, processVideoURL } from '@/utils/utils';
import FlexiblecompoSec from '@/component/FlexiblecompoSec';
import SplitText from '@/component/layouts/SplitText'
import SeoData from '@/component/SeoData';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const EventDetail = ({ eventData,params }) => {
    // console.log("params events: ",params)
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


    useEffect(() => {
        gsap.set(".fadeInUp", { y: "30%", opacity: 0, });
        ScrollTrigger.batch(".fadeInUp", {
            onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.3, stagger: 0.2, y: 0 }),
        });
        gsap.set(".fadeInUp-btn", { y: "30%", opacity: 0, });
        ScrollTrigger.batch(".fadeInUp-btn", {
            onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.6, stagger: 0.2, y: 0 }),
        });
    }, [])

    if (eventData) {
        const {
            title, featuredImage, excerpt, date, content, seoData
        } = eventData.event;

        const {
            eventType, eventInfo
        } = eventData.event.eventsPostTypeOptions;

        return (
            <>
                <SeoData pageTitle={title} seodata={seoData} />
                <div className="eventdetailWrap">
                    <div className="container">
                        {featuredImage && <div className={`edimg ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                            <Image src={featuredImage.node.sourceUrl} alt="edimg" width={1310} height={355} />
                        </div>}
                        <div className='dswsec'>
                            <div className="pdsec">
                                {eventType && <div className="pdlabel">
                                    <h6 className="label-text">{eventType}</h6>
                                    {/* <span>30/05/2023</span> */}
                                </div>}
                                <div className="row">
                                    <div className="col-lg-6">
                                        {title && <div className="pdtitle">
                                            <h3>{title}</h3>
                                        </div>}
                                        {date && <div className="pddate">
                                            <h6>{FullDateWithYear(date)} </h6>
                                            {/* <span>By Admin</span> */}
                                        </div>}
                                    </div>
                                    {excerpt && <div className="col-lg-6">
                                        <div className="pddetail">
                                            {/* <p dangerouslySetInnerHTML={{ __html: excerpt }}></p> */}
                                            <div className='pText fadeInUp custom_html' dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {eventInfo &&
                        <>
                            {eventInfo.map((event, index) => {
                                const { fieldGroupName } = event;
                                if (fieldGroupName == "Event_Eventsposttypeoptions_EventInfo_HeadingWithDescription") {
                                    const { headingDescriptionInfo } = event;
                                    if (headingDescriptionInfo) {
                                        return (
                                            <div className='managementblog' key={index}>
                                                <div className='container'>
                                                    {headingDescriptionInfo.map((info, index) => {
                                                        const { heading, description } = info;
                                                        if (heading || description) {
                                                            return <div className='mgtblog' key={index}>
                                                                <div className='row'>
                                                                    {heading && <div className='col-lg-5'>
                                                                        <div className='blogheading'>
                                                                            <h4><SplitText copy={heading} role="heading" /></h4>
                                                                        </div>
                                                                    </div>}
                                                                    {description && <div className='col-lg-5 offset-lg-1'>
                                                                        <div className='blogdiscription fadeInUp'>
                                                                            {/* <p dangerouslySetInnerHTML={{ __html: description }}></p> */}
                                                                            <div className='pText custom_html' dangerouslySetInnerHTML={{ __html: description }}></div>
                                                                        </div>
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    }
                                } else if (fieldGroupName == "Event_Eventsposttypeoptions_EventInfo_ShortDescription") {
                                    const { description } = event;
                                    if (description) {
                                        return (
                                            <div className='elcomdetail' key={index}>
                                                <div className='container'>
                                                    <div className='elecombrief'>
                                                        {/* <p dangerouslySetInnerHTML={{ __html: description }}></p> */}
                                                        <div className='pText custom_html' dangerouslySetInnerHTML={{ __html: description }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                } else if (fieldGroupName == "Event_Eventsposttypeoptions_EventInfo_ImageVideoSection") {
                                    const { selectImage, videoUrl } = event;
                                    if (selectImage) {
                                        return <FlexiblecompoSec key={index} imageURL={selectImage.sourceUrl} videoUrl={videoUrl} />
                                    }
                                }
                            })}
                        </>
                    }
                </div>
            </>
        )
    }
}

export default EventDetail

// export async function getServerSideProps(context) {
//     const { query } = context;
//     const slug = query.event[0];

//     const { data: eventDetailData, loading, networkStatus } = await client.query({
//         query: GET_EVENT_DETAIL_PAGE,
//         variables: { id: slug },
//     });

//     return {
//         props: {
//             eventData: eventDetailData,
//             headerClass: 'header-v2',
//         }
//     }
// }

/*
export async function getStaticPaths() {
    const { data: slugs } = await client.query({
        query: GET_ALL_EVENTS_SLUG,
    });
    const slugsdata = await slugs?.events?.nodes;
    const paths = slugsdata.map((data) => ({
        params: { event : [data.slug.toString()] },
    }));
    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { params } = context;
    const slug = params.event[0];
    const { data: eventDetailData, loading, networkStatus } = await client.query({
        query: GET_EVENT_DETAIL_PAGE,
        variables: { id: slug },
    });

    return {
        props: {
            eventData: eventDetailData,
            headerClass: 'header-v2',
            params:params
        },
        revalidate: 20,
    }
}
*/