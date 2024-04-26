import ElectromecSec from "@/component/ElectromecSec";
import ExploreSec from "@/component/ExploreSec";
import InnerBanner from "@/component/InnerBanner";
import OtherblogSec from "@/component/OtheblogSec";
import ToppickSec from "@/component/ToppickSec";
import SeoData from "../SeoData";

const BlogLandingPage = ({ data, latestPost, allPosts, allpostsPageInfo, categories,pageTitle,seodata}) => {
    const {
        bannerHeading,
        latestSectionHeading, latestHeading,
        toppicksSectionHeading, toppicksHeading, selectLatestBlogs,
        otherBlogsSectionHeading, otherBlogsHeading, otherBlogsFilterByText, otherBlogsLoadMoreText,
        exploreHeading, exploreDescription, exploreButtonInfo, exploreImage
    } = data;

    const loadMoreHandler = (endCursor) => {
    }

    const allCategories = categories.categories.nodes;
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle}/>
            <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />
            {allPosts ?
                <div className="BloglandingWrap">
                    <ElectromecSec sectionHeading={latestSectionHeading} heading={latestHeading} latestPost={latestPost} whichPage="blog" />
                    <ToppickSec sectionHeading={toppicksSectionHeading} heading={toppicksHeading} posts={selectLatestBlogs} />
                    <OtherblogSec sectionHeading={otherBlogsSectionHeading} heading={otherBlogsHeading} filterText={otherBlogsFilterByText} loadMoreButtonText={otherBlogsLoadMoreText} posts={allPosts} allpostsPageInfo={allpostsPageInfo} loadMoreHandler={loadMoreHandler} categories={allCategories} />
                    <ExploreSec sectionHeading={exploreHeading} heading={exploreDescription} image={exploreImage} buttonInfo={exploreButtonInfo} />
                </div>
                :
                "No Blogs Found"
            }
        </>
    )
}

export default BlogLandingPage