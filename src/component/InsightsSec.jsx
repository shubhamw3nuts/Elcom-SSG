import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SplitText from './layouts/SplitText'
import DefaultBlogBox from "./layouts/DefaultBlogBox";
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Link from 'next/link';


const InsightsSec = ({ sectionHeading, heading, readMoreText, blogPosts, newsPosts, eventsPosts, blogTabTitle, newsTabTitle, eventsTabTitle,blogButton,newsButton,eventButton }) => {

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });

    const [addClass, setAddClass] = useState(false);
    const [buttonInsights,setButtonInsights] = useState(blogButton ? blogButton : (newsButton ? newsButton : (eventButton ? eventButton : {} ) )); 

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

    const handleTabSelect = (key) => {
        if(key == 'BLOGS'){
            setButtonInsights(blogButton);
        }else if(key == 'NEWS'){
            setButtonInsights(newsButton);
        }else if(key == 'EVENTS'){
            setButtonInsights(eventButton);
        }
    }

    if (blogPosts.length > 0 || newsPosts.length > 0 || eventsPosts.length > 0) {
        return (
            <div className={`insightwrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                <div className="container">
                    <div className="lineEl"></div>
                    <div className="insightdtl">
                        {sectionHeading && <h6 className="small-text">{sectionHeading}</h6>}
                        <div className="insightbox">
                            {heading && <h3><SplitText copy={heading} role="heading" /></h3>}
                            {buttonInsights && <div className="btnbox desktopscreen"><Link className="elcom-btn primary-black-btn" href={buttonInsights.url} target={buttonInsights.target}>{buttonInsights.title}</Link></div>}
                        </div>
                        <Tabs
                            defaultActiveKey="BLOGS"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            onSelect={handleTabSelect}
                        >
                            {(blogPosts.length > 0) &&
                                <Tab eventKey="BLOGS" title={blogTabTitle ? blogTabTitle : ''}>
                                    <div className="dbbbox">
                                        <div className="row">
                                            {blogPosts.map((blog, index) => {
                                                const { title, slug, featuredImage, date, categories } = blog;
                                                return <DefaultBlogBox key={index} title={title} slug={slug} featuredImage={featuredImage} date={date} categories={categories} />
                                            })}
                                        </div>
                                    </div>
                                </Tab>
                            }
                            {newsPosts.length > 0 &&
                                <Tab eventKey="NEWS" title={newsTabTitle ? newsTabTitle :  ''}>
                                    <div className="dbbbox">
                                        <div className="row">
                                            {newsPosts.map((news, index) => {
                                                const { title, slug, featuredImage, date, newsCategories } = news;
                                                return <DefaultBlogBox key={index} title={title} slug={slug} featuredImage={featuredImage} date={date} categories={newsCategories} />
                                            })}
                                        </div>
                                    </div>
                                </Tab>
                            }
                            {eventsPosts.length > 0 &&
                                <Tab eventKey="EVENTS" title={eventsTabTitle ? eventsTabTitle : ''}>
                                    <div className="dbbbox">
                                        <div className="row">
                                            {eventsPosts.map((event, index) => {
                                                const { title, slug, featuredImage, date, eventsPostTypeOptions } = event;
                                                const categories = eventsPostTypeOptions?.eventType ? { nodes: [{ name: eventsPostTypeOptions.eventType }] } : {}
                                                return <DefaultBlogBox key={index} title={title} slug={slug} featuredImage={featuredImage} date={date} categories={categories} />
                                            })}
                                        </div>
                                    </div>
                                </Tab>
                            }
                        </Tabs>
                        {buttonInsights && <div className="btnbox mobilescreen"><a className="elcom-btn primary-black-btn" href={buttonInsights.url} target={buttonInsights.target}>{buttonInsights.title}</a></div>}
                    </div>
                </div>
            </div>
        )
    }
    return ''
}

export default InsightsSec;