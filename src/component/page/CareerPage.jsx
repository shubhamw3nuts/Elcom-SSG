import CareerintroSec from "@/component/CareerintroSec";
import CareerpathSec from "@/component/CareerpathSec";
import InnerBanner from "@/component/InnerBanner";
import InnersliderSec from "@/component/InnersliderSec";
import JoblistSec from "@/component/JoblistSec";
import Purpose from "@/component/PurposeSec";
import LineList from "@/component/layouts/LineList";
import { useApolloClient } from "@apollo/client";
import SeoData from "../SeoData";

const CareerPage = ({ data, careerPosts, departmentCategories, locationCategories ,pageTitle,seodata}) => {
    const {
        bannerHeading, benefitsHeading, benefitsInfo, benefitsSectionHeading, introDescription, introHeading,
        introImage, introSectionHeading, introVideoUrl,introButtonText, pathImagesInfo, pathInfo, pathSectionHeading,
        formHeading,firstNameHeading,lastNameHeading,emailHeading,phoneHeading,resumeHeading,coverLetterHeading,checkboxText,privacyPolicyInfo,submitButtonText
    } = data;

    const applicationFormOptions = {formHeading,firstNameHeading,lastNameHeading,emailHeading,phoneHeading,resumeHeading,coverLetterHeading,checkboxText,privacyPolicyInfo,submitButtonText};
    const client = useApolloClient();
    const cachedData = client.cache.extract(); 

    const scrollToPositions = () => {
        const section = document.getElementById("jobProfile");
        const headerHeight = document.querySelector('#header').clientHeight;
        const offset = (section.offsetTop - headerHeight);
        window.scrollTo({
            top: offset,
            behavior: 'smooth', // Optional: Use smooth scrolling
        });
    }
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle}/>
            <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />
            <div className="careerWrapper">
            <CareerintroSec
                sectionHeading={introSectionHeading}
                heading={introHeading}
                description={introDescription}
                image={introImage}
                vidoeUrl={introVideoUrl}
                scrollToPositions={scrollToPositions}
                introButtonText={introButtonText}
            />
            <CareerpathSec sectionHeading={pathSectionHeading} />
            {pathInfo &&
                pathInfo.map((path, index) => {
                    return <Purpose key={index} info={path} />
                })
            }
            {pathImagesInfo &&
                <InnersliderSec imagesInfo={pathImagesInfo} />
            }
            <LineList sectionHeading={benefitsSectionHeading} heading={benefitsHeading} info={benefitsInfo} />
            {careerPosts.nodes.length > 0 && <JoblistSec careerPosts={careerPosts} departmentCategories={departmentCategories} locationCategories={locationCategories} applicationFormOptions={applicationFormOptions}/>}
            </div>
        </>
    )
}

export default CareerPage