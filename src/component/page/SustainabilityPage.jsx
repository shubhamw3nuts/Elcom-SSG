import AchiveSec from "@/component/AchiveSec";
import InnerBanner from "@/component/InnerBanner";
import SustaincountSec from "@/component/SustaincountSec";
import SustainplanSec from "@/component/SustainplanSec";
import ZcSec from "@/component/ZcSec";
import SectionTitle from "@/component/layouts/SectionTitle";
import SustainBlog from "@/component/layouts/SustainBlog";
import SeoData from "../SeoData";

const SustainaBilityPage = ({ data, pageTitle, seodata }) => {
    const {
        introSectionHeading, introHeading, introDescription,
        counterBackgroundImage, counterInfo,
        aboutSectionHeading, aboutHeading, aboutContent, aboutInfo,
        achievementssectionHeading, achievementsHeading, achievementsContent, achievementsImageInfo,
        sustainabilitySectionHeading, sustainabilityContent, sustainabilityName, sustainabilityPost,
        insightsSectionHeading, insightsHeading, insightsButtonInfo, selectRelatedBlogs
    } = data;
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle} />
            <InnerBanner heading={pageTitle} />
            <div className="sustainabilityWrapper">
                <SectionTitle sectionHeading={introSectionHeading} heading={introHeading} description={introDescription} buttonInfo='' />
                <SustaincountSec backgroundImage={counterBackgroundImage} counterInfo={counterInfo} />
                <ZcSec sectionHeading={aboutSectionHeading} heading={aboutHeading} description={aboutContent} aboutInfo={aboutInfo} />
                <AchiveSec sectionHeading={achievementssectionHeading} heading={achievementsHeading} description={achievementsContent} imageInfo={achievementsImageInfo} />
                <SustainplanSec sectionHeading={sustainabilitySectionHeading} content={sustainabilityContent} name={sustainabilityName} post={sustainabilityPost} />
                <SustainBlog sectionHeading={insightsSectionHeading} heading={insightsHeading} buttonInfo={insightsButtonInfo} blogs={selectRelatedBlogs} />
            </div>
        </>
    )
}

export default SustainaBilityPage;