import CategoryblogSec from '@/component/CategoryblogSec';
import CatDetail from '@/component/layouts/CatDetail';
import FutureBlog from '@/component/layouts/FutureBlog';
import SectionTitle from '@/component/layouts/SectionTitle';
import SectionTitlewhite from '@/component/layouts/SectionTitlewhite';
import PduadoptSec from '../PduadoptSec';
import CapebilitySec from '../CapebilitySec';
import SectiontitleImg from '../SectiontitleImg';
import LineList from '../layouts/LineList';
import IpducontrolSec from '../IpducontrolSec';
import ProductFilters from '../ProductFilters';

const PDUProductCategoryPage = ({ categoryData, productData,slug,relatedBlogs,themeGeneralSettings }) => {
    const { name, description, image, children, ancestors } = categoryData;
    let ancestorsLength = 0;
    let categoryPageClass = '';
    if (ancestors) {
        ancestorsLength = ancestors.nodes.length;
        /* IF ancestorsLength  is
            1  then page is subcategory PDU,
            2  then page is  sub-subcategory PDU
            3  then page is sub-sub-subcategory PDU
            */
        if (ancestorsLength == 1) {
            categoryPageClass = 'pdusubcatwrap';
        } else if (ancestorsLength >= 2) {
            categoryPageClass = 'pdusubsubcatwrap';
        }
    }
    const {
        videoUrl,
        typesOfSectionHeading, typesOfHeading,
        featuresSectionHeading, featuresHeading, featuresFeaturesInfo,
        benefitsSectionHeading, benefitsHeading, benefitsInfo,
        usesSectionHeading, usesHeading, usesDesription, usesImage, usesInfo,
        whyChooseSectionHeading, whyChooseHeading, whyChooseDescription,
        keyProductSectionHeading, keyProductHeading, selectProduct,
        customizeSectionHeading, customizeHeading, customizeInfo,
        productCtaSelectSectionLayout, productCtaSelectBackgroundColor, productCtaTitle, productCtaHeading, productCtaDescription, productCtaImage, productCtaButtonInfo, productCtaInfo,
        advantageSectionHeading, advantageHeading, advantagesInfo,
        productCtaSelectSectionLayout2, productCtaSelectBackgroundColor2, productCtaInfo2, productCtaTitle2, productCtaHeading2, productCtaDescription2, productCtaImage2, productCtaButtonInfo2,
        certificationSectionHeading, certificationHeading, certificationDescription, certificationButtonInfo, certificationImagesInfo,
        insightsSectionHeading, insightsHeading, selectBlogs,
        pduTypesOfSectionHeading, pduTypesOfHeading, pduTypesOfDescription, pduTypesOfLearnMoreButtonText, pduTypesOfBuildYourPduButton,
        pduCustomizeSectionHeading, pduCustomizeHeading, pduCustomizeDescription, pduCustomizeInfo, pduCustomizeImage,
        pduPerformanceSectionHeading,pduPerformanceFeaturesInfo,
        pduCertificationSectionHeading, pduCertificationHeading, pduCertificationDescription,pduSelectCertifications
    } = categoryData.categoryOptions; // acf fields

    const {productCatBannerButtonInfo,categoryInsightsButtonInfo,categoryCustomizePduButtonInfo} = themeGeneralSettings;
    
    return (
        <>
            <div className={`pducatwrap ${categoryPageClass}`}>
                <CatDetail name={name} description={description} image={image} buttonOne={productCatBannerButtonInfo} ancestors={ancestors} videoUrl={videoUrl}/>
                {children.nodes.length > 0 &&
                    <>
                        <SectionTitle sectionHeading={pduTypesOfSectionHeading} heading={pduTypesOfHeading} description={pduTypesOfDescription} />
                        {children.nodes.map((category, index) => {
                            return <PduadoptSec key={index} categoryData={category} buttonOne={pduTypesOfLearnMoreButtonText} buttonTwo={pduTypesOfBuildYourPduButton} />
                        })}
                    </>
                }
                {ancestorsLength >= 2 && <ProductFilters pageData={productData} fromPDUPage={true} slug={slug}/>}
                <CapebilitySec sectionHeading={pduCustomizeSectionHeading} heading={pduCustomizeHeading} description={pduCustomizeDescription} info={pduCustomizeInfo} buttonInfo={categoryCustomizePduButtonInfo} image={pduCustomizeImage} />
                {pduPerformanceFeaturesInfo &&
                    <div className='ipduwrap'>
                        <SectionTitlewhite sectionHeading={pduPerformanceSectionHeading} />
                        {/* {pduPerformanceFeaturesInfo.map((performance, index) => {
                            return <IpducontrolSec key={index} info={pduPerformanceFeaturesInfo} />
                            return <IpducontrolSec key={index} info={performance} />
                        })} */}
                        <IpducontrolSec info={pduPerformanceFeaturesInfo} />
                    </div>
                }
                <SectiontitleImg sectionHeading={pduCertificationSectionHeading} heading={pduCertificationHeading} description={pduCertificationDescription} info={pduSelectCertifications} />
                <FutureBlog sectionHeading={featuresSectionHeading} heading={featuresHeading} info={featuresFeaturesInfo} />
                <LineList sectionHeading={benefitsSectionHeading} heading={benefitsHeading} info={benefitsInfo} />
            </div>
            {(relatedBlogs?.blog_posts.length > 0 ) &&
            <div className="pdubox">
                <CategoryblogSec sectionHeading={insightsSectionHeading} heading={insightsHeading} buttonInfo={categoryInsightsButtonInfo} blogs={relatedBlogs?.blog_posts} dataFromCustomAPI={true} />
            </div>
            }
        </>
    )
}

export default PDUProductCategoryPage