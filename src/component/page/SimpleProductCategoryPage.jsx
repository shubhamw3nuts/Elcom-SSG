import Advantages from '@/component/AdvantagesSec';
import BrackerBox from '@/component/BrackerBox';
import CareerpathSec from '@/component/CareerpathSec';
import CategoryblogSec from '@/component/CategoryblogSec';
import PowerStrip from '@/component/PowerStrip';
import UsappSec from '@/component/UsappSec';
import CatDetail from '@/component/layouts/CatDetail';
import ComponentType from '@/component/layouts/ComponentType';
import ElectroType from '@/component/layouts/ElectroType';
import FutureBlog from '@/component/layouts/FutureBlog';
import PduSection from '@/component/layouts/PduSection';
import SectionTitle from '@/component/layouts/SectionTitle';
import SliderWithText from '../SliderWithText';
import CertificationSlider from '../layouts/CertificationSlider';

const SimpleProductCategoryPage = ({ categoryData, products, relatedBlogs, themeGeneralSettings, certifications }) => {

    const { name, description, image, children, ancestors } = categoryData;
    let ancestorsLength = 0;
    let categoryPageClass = 'maincategory';
    if (ancestors) {
        ancestorsLength = ancestors.nodes.length;
        /* IF ancestorsLength  is
            1  then page is subcategory,
            2 then page is  sub-subcategory
            3 then page is sub-sub-subcategory
            */
        if (ancestorsLength == 1) {
            categoryPageClass = 'subcategory';
        } else if (ancestorsLength >= 2) {
            categoryPageClass = 'subsubcate';
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
        certificationSectionHeading, certificationHeading, certificationDescription, certificationButtonInfo, certificationImagesInfo, certificationSelectCertifications,
        insightsSectionHeading, insightsHeading, selectBlogs, sliderInfo
    } = categoryData.categoryOptions; // acf fields

    const { productCatBannerButtonInfo, categoryKeyProductButtonInfo, categoryCustomizePduButtonInfo, categoryInsightsButtonInfo } = themeGeneralSettings;

    return (
        <div className={categoryPageClass}>

            <CatDetail name={name} description={description} image={image} buttonOne={productCatBannerButtonInfo}  ancestors={ancestors} videoUrl={videoUrl} />
            {(children.nodes.length > 0 || products.nodes.length > 0) && <CareerpathSec sectionHeading={typesOfSectionHeading} />}
            <ElectroType heading={typesOfHeading} categories={children} products={products} />
            <FutureBlog sectionHeading={featuresSectionHeading} heading={featuresHeading} info={featuresFeaturesInfo} />

            {(ancestorsLength > 1) && // sub-sub category and greater
                <>
                    <SliderWithText sliderInfo={sliderInfo} />
                    <UsappSec sectionHeading={usesSectionHeading} heading={usesHeading} description={usesDesription} image={usesImage} usesInfo={usesInfo} />
                    <SectionTitle sectionHeading={whyChooseSectionHeading} heading={whyChooseHeading} description={whyChooseDescription} />
                </>
            }

            {(ancestorsLength < 2) && // main category or sub category NOTE If you change this condition then please also check relatedBlogs_cb function on functions.php file of backend
                <>
                    <ComponentType sectionHeading={benefitsSectionHeading} heading={benefitsHeading} info={benefitsInfo} productSectionHeading={keyProductSectionHeading} productHeading={keyProductHeading} productButtonInfo={categoryKeyProductButtonInfo} products={relatedBlogs?.products} sliderInfo={sliderInfo} />
                    <PduSection sectionHeading={customizeSectionHeading} heading={customizeHeading} buttonInfo={categoryCustomizePduButtonInfo} info={customizeInfo} />
                </>
            }

            {(relatedBlogs?.blog_posts.length > 0) && <CategoryblogSec sectionHeading={insightsSectionHeading} heading={insightsHeading} buttonInfo={categoryInsightsButtonInfo} blogs={relatedBlogs.blog_posts} dataFromCustomAPI={true} />}

            {(productCtaSelectSectionLayout == 'full') &&
                <>
                    <PowerStrip
                        key="1"
                        backgroundColor={productCtaSelectBackgroundColor}
                        title={productCtaTitle}
                        heading={productCtaHeading}
                        description={productCtaDescription}
                        image={productCtaImage}
                        buttonInfo={productCtaButtonInfo}
                    />
                </>
            }
            {
                (productCtaSelectSectionLayout != 'full') &&
                <BrackerBox
                    layout={productCtaSelectSectionLayout}
                    productCtaInfo={productCtaInfo}
                />
            }
            <Advantages sectionHeading={advantageSectionHeading} heading={advantageHeading} info={advantagesInfo} />
            {(productCtaSelectSectionLayout2 == 'full') &&
                <>
                    <PowerStrip
                        key="2"
                        backgroundColor={productCtaSelectBackgroundColor2}
                        title={productCtaTitle2}
                        heading={productCtaHeading2}
                        description={productCtaDescription2}
                        image={productCtaImage2}
                        buttonInfo={productCtaButtonInfo2}
                    />
                </>
            }
            {
                (productCtaSelectSectionLayout2 != 'full') &&
                <BrackerBox
                    layout={productCtaSelectSectionLayout2}
                    productCtaInfo={productCtaInfo2}
                />
            }
            {certificationSelectCertifications &&
                <>
                    <SectionTitle sectionHeading={certificationSectionHeading} heading={certificationHeading} buttonInfo={certificationButtonInfo} description={certificationDescription} />
                    <CertificationSlider logosInfo={certificationSelectCertifications} selectedCertifications={true} />
                </>
            }
        </div>
    )
}

export default SimpleProductCategoryPage