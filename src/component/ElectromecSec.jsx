import Image from 'next/image';
import Link from "next/link";
import SectiontitleFull from './layouts/SectiontitleFull';
import { formatDate } from '@/utils/utils';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);

const ElectromecSec = ({ sectionHeading, heading, latestPost, whichPage }) => {
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
    if (latestPost) {
        return (
            <>
                <SectiontitleFull sectionHeading={sectionHeading} heading={heading} />
                {latestPost.map((post, index) => {
                    const { title, uri,slug, featuredImage, date, newsCategories, categories, excerpt } = post;
                    let commaSeparatedNames = '';
                    if (whichPage == 'blog'){
                        if (categories?.nodes.length > 0) {
                            const categoryNames = categories?.nodes.map(category => category.name);
                            commaSeparatedNames = categoryNames.join(', ');
                        }
                    }else{
                        if (newsCategories?.nodes.length > 0) {
                            const categoryNames = newsCategories?.nodes.map(category => category.name);
                            commaSeparatedNames = categoryNames.join(', ');
                        }
                    }
                    const limit = 160;
                    const truncatedContent = excerpt.length > limit ? excerpt.substring(0, limit) + '...' : excerpt;
                    return (
                        <div className="latestBsec" key={index}>
                            <div className="container">
                                <div className="lbwrap">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="lbgrp fadeInUp">
                                                <div className="lbleft">
                                                    <div className='lblabel '>
                                                        {commaSeparatedNames && <h6 className="small-text">{commaSeparatedNames}</h6>}
                                                        {date && <span>{formatDate(date)}</span>}
                                                    </div>
                                                    {title && <h5 className=''>{title}</h5>}
                                                    {excerpt && <div dangerouslySetInnerHTML={{ __html: truncatedContent }} className="custom_html"></div>}
                                                    <div className="btnbox">
                                                        <Link href={`${uri}`} className="elcom-btn primary-black-btn">Read More</Link>
                                                    </div>
                                                </div>
                                                {featuredImage?.node?.sourceUrl && <div className='lbimg flex-shrink-0'>
                                                    <Image src={featuredImage?.node?.sourceUrl} width="539" height="386" alt='fuseimg' />
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
    return ''
}

export default ElectromecSec;