import Link from "next/link";
import DefaultBlogBox from "./layouts/DefaultBlogBox";
import SectiontitleSwitch from "./layouts/SectiontitleSwitch"

const CategoryblogSec = ({ sectionHeading, heading, buttonInfo, blogs, dataFromCustomAPI }) => {
    if (blogs) {
        return (
            <>
                <div className="categoryblog">
                    <SectiontitleSwitch sectionHeading={sectionHeading} heading={heading} buttonInfo={buttonInfo} />
                    <div className="categorybox">
                        <div className="container">
                            <div className="categoryinsight">
                                <div className="row">
                                    {blogs.map((blog, index) => {
                                        const { title, uri, slug, featuredImage, date, categories } = blog;
                                        return <DefaultBlogBox key={index} title={title} slug={uri} featuredImage={featuredImage} date={date} categories={categories} dataFromCustomAPI={dataFromCustomAPI} />
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
                </div>
            </>
        )
    }
    return '';
}

export default CategoryblogSec