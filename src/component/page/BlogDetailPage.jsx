import PowerdisSec from "@/component/PowerdisSec";
import TitlecsrDetail from '@/component/layouts/TitlecsrDetail';
import SustainBlog from '@/component/layouts/SustainBlog';
import FlexiblecompoSec from '../FlexiblecompoSec';
import SeoData from '../SeoData';
import { useEffect, useRef } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const BlogDetailPage = ({ data,pageTitle,seodata }) => {
    const {
        title, featuredImage, excerpt, content, categories, author, blogPostOptions, date
    } = data;
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
          const paragraphs = containerRef.current.querySelectorAll('p');
          const h1 = containerRef.current.querySelectorAll('h1');
          const h2 = containerRef.current.querySelectorAll('h2');
          const h3 = containerRef.current.querySelectorAll('h3');
          const h4 = containerRef.current.querySelectorAll('h4');
          const h5 = containerRef.current.querySelectorAll('h5');
          const h6 = containerRef.current.querySelectorAll('h6');
          paragraphs.forEach((p) => p.classList.add('fadeInUp'));
          h1.forEach((h1) => h1.classList.add('fadeInUp'));
          h2.forEach((h2) => h2.classList.add('fadeInUp'));
          h3.forEach((h3) => h3.classList.add('fadeInUp'));
          h4.forEach((h4) => h4.classList.add('fadeInUp'));
          h5.forEach((h5) => h5.classList.add('fadeInUp'));
          h6.forEach((h6) => h6.classList.add('fadeInUp'));
        }
        gsap.set(".fadeInUp", {y: "30%", opacity: 0,});
        ScrollTrigger.batch(".fadeInUp", {
          onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.3, stagger: 0.2, y:0}),
        });
        gsap.set(".fadeInUp-btn", {y: "30%", opacity: 0,});
        ScrollTrigger.batch(".fadeInUp-btn", {
          onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.6, stagger: 0.2, y:0}),
        });
      }, []);
     return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle}/>
            <div className="blogdetailwrap">
                <PowerdisSec title={title} categories={categories} author={author} excerpt={excerpt} content={content} featuredImage={featuredImage} date={date} />
                {blogPostOptions?.blogData &&
                    <>
                        {blogPostOptions?.blogData.map((blog, index) => {
                            const { fieldGroupName } = blog;
                            if (fieldGroupName == 'Post_Blogpostoptions_BlogData_BlogInfo') {
                                const { heading, info } = blog;
                                if (info) {
                                    return (
                                        <div className='dcmWrap' key={index}>
                                            {heading &&
                                                <div className='container'>
                                                    <div className='dcmTitle'>
                                                        <div className='row'>
                                                            <div className='col-lg-6'>
                                                                <div className='dcmtext'>
                                                                    <h4>{heading}</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {info.map((data, index) => {
                                                if (data.heading || data.description) {
                                                    return <TitlecsrDetail heading={data.heading} description={data.description} key={index} />
                                                }
                                            })}
                                        </div>
                                    )
                                }
                            } else if (fieldGroupName == "Post_Blogpostoptions_BlogData_ShortDescription") {
                                const { description } = blog;
                                if (description) {
                                    return (
                                        <div className='elcomdetail' key={index}>
                                            <div className='container'>
                                                <div className='elecombrief'>
                                                    <div dangerouslySetInnerHTML={{ __html: description }} className="custom_html" ref={containerRef}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            } else if (fieldGroupName == "Post_Blogpostoptions_BlogData_RelatedBlogs") {
                                const { sectionHeading, heading, buttonInfo, selectBlogs } = blog;
                                return <SustainBlog key={index} sectionHeading={sectionHeading} heading={heading} buttonInfo={buttonInfo} blogs={selectBlogs} />
                            } else if (fieldGroupName == "Post_Blogpostoptions_BlogData_ImageVideoSection") {
                                const { selectImage, videoUrl } = blog;
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

export default BlogDetailPage;
