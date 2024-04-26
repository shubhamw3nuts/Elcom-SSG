import ElectromecSec from "../ElectromecSec"
import InnerBanner from "../InnerBanner"
import OtherNewsSec from "../OtherNewsSec"
import SeoData from "../SeoData"

const NewsLandingPage = ({ data, latestPost, allNews, allNewsPageInfo, categories,pageTitle,seodata }) => {
    const {
        bannerHeading,
        latestHeading, latestSectionHeading,
        otherNewsFilterByText, otherNewsHeading, otherNewsLoadMoreButtonText, otherNewsSectionHeading, otherNewsSortByText
    } = data;
    const allCategories = categories.newsCategories.nodes;
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle}/>
            <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />
            {allNews ?
                <div className="newslandingwrap">
                    <ElectromecSec sectionHeading={latestSectionHeading} heading={latestHeading} latestPost={latestPost} whichPage="news"/>
                    <OtherNewsSec sectionHeading={otherNewsSectionHeading} heading={otherNewsHeading} posts={allNews} allpostsPageInfo={allNewsPageInfo} categories={allCategories} />
                </div>
                :
                "No News Found"
            }
        </>
    )
}

export default NewsLandingPage