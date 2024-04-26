import Link from "next/link";
import DefaultBlogBox from "./DefaultBlogBox";
import SectiontitleSwitch from "./SectiontitleSwitch";

const SustainBlog = ({ sectionHeading, heading, buttonInfo, blogs }) => {
    if (blogs && blogs.length > 0) {
        return (
            <>
                <div className="sbwrap">
                    <SectiontitleSwitch sectionHeading={sectionHeading} heading={heading} buttonInfo={buttonInfo} />
                    <div className="container">
                        <div className="sbwrapper">
                            <div className="row">
                                {blogs.map((blog, index) => {
                                    const { title, slug, featuredImage, date, categories } = blog;
                                    return <DefaultBlogBox key={index} title={title} slug={slug} featuredImage={featuredImage} date={date} categories={categories} />
                                })}

                            </div>
                            {buttonInfo &&
                            <div className="btnbox mobilescreen">
                                <Link className="elcom-btn primary-black-btn" href={buttonInfo.url} target={buttonInfo.target}>{buttonInfo.title}</Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return '';
}

export default SustainBlog;