import CareerpathSec from '@/component/CareerpathSec';
import FutureBlog from '@/component/layouts/FutureBlog';
import LineList from '@/component/layouts/LineList';
import DownloadSec from '@/component/DownloadSec';
import InnovationSuccess from '@/component/layouts/InnovationSuccess';
import CategoryblogSec from '@/component/CategoryblogSec';
import ErsseriesSec from '@/component/ErsseriesSec';
import ClickableElements from '@/component/ClickableElements';
import Link from "next/link";
import SpecificationsSec from "../SpecificationsSec";
import { useEffect, useState } from "react";

const SimpleProductDetailPage = ({ productDetails, res }) => {
    const data = productDetails.product
    const productDetailBannerButtonInfo = productDetails?.themeGeneralSettings?.theme_settings?.productDetailBannerButtonInfo
    const keyProductSectionButton = productDetails?.themeGeneralSettings?.theme_settings?.keyProductSectionButton
    const relatedBlogsButton = productDetails?.themeGeneralSettings?.theme_settings?.relatedBlogsButton
    const stickyBarButtonInfo = productDetails?.themeGeneralSettings?.theme_settings?.stickyBarButtonInfo
    const { products, blog_posts, is_pdu_category_product } = res;
    const {
        title, content, galleryImages, featuredImage, productCategories, productDetail, certifications, databaseId
    } = data;

    const {
        productInfo, certificationsSecHeading,
        specificationSectionTitle, characteristics,
        featuresSectionHeading, featuresHeading, featuresInfo,
        benefitsSectionHeading, benefitsHeading, benefitsInfo,
        downloadSectionTitle, downloadInfo,
        keyProductSectionHeading, keyProductHeading, keyProductButtonInfo,
        insightsSectionHeading, insightsHeading, insightsButtonInfo
    } = productDetail
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = e => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
    }, [])


    return (
        <>
            <div className='productdetailWrap'>

                <div className={`getintouch ${scrolled ? 'active' : ''}`} >
                    <div className='container'>
                        <div className='getnavwrap'>
                            <div className='getmain'>
                                <ul>
                                    <li>{title}</li>
                                </ul>
                            </div>
                            <div className='getmiddle'>
                                <ul>
                                    {(featuresInfo || benefitsInfo) && <li><ClickableElements targetSection="featandbenefi_id" textProps="Features and Benefits" /></li>}
                                    {(characteristics) && <li><ClickableElements targetSection="specification_id" textProps="Specifications" /></li>}
                                    {(downloadInfo) && <li><ClickableElements targetSection="download_id" textProps="Downloads" /></li>}
                                    {(products.length > 0) && <li><ClickableElements targetSection="relatprod_id" textProps="Related Products" /></li>}
                                </ul>
                            </div>
                            {stickyBarButtonInfo &&
                                <div className='btnbox'>
                                    <Link className='elcom-btn primary-btn' href={`${stickyBarButtonInfo.url}`} target={stickyBarButtonInfo.target}>{stickyBarButtonInfo.title}</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>


                <div className='futureline'>
                    <ErsseriesSec title={title} content={content} galleryImages={galleryImages} featuredImage={featuredImage} categories={productCategories} productInfo={productInfo} certifications={certifications} certificationsSecHeading={certificationsSecHeading} databaseId={databaseId} buttonInfo={productDetailBannerButtonInfo}/>
                    {/* <FutureBlog />
                        <LineList /> */}
                </div>
                <SpecificationsSec characteristics={characteristics} specificationSectionTitle={specificationSectionTitle} />
                <div className='futureline'>
                    <div id="featandbenefi_id">
                        {featuresInfo && <FutureBlog sectionHeading={featuresSectionHeading || "FEATURES"} heading={featuresHeading || "Tailored precision and compliance"} info={featuresInfo} />}
                        {benefitsInfo && <LineList sectionHeading={benefitsSectionHeading || 'BENEFITS'} heading={benefitsHeading || "Empowering efficiency and reliability "} info={benefitsInfo} />}
                    </div>
                </div>
                {(downloadInfo) &&
                    <div className='downloadGrp' id="download_id">
                        <CareerpathSec sectionHeading={downloadSectionTitle || "DOWNLOADS"} />
                        <div className='container'>
                            <div className='downloaddtl'>
                                <div className='row'>
                                    {downloadInfo.map((download, index) => {
                                        return <DownloadSec key={index} donwloadInfo={download} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {(products.length > 0) && <InnovationSuccess idprop="relatprod_id" products={products} sectionHeading={keyProductSectionHeading || "Similar products"} heading={keyProductHeading || "The team that drives innovation and success"} buttonInfo={keyProductSectionButton} />}
                {(blog_posts.length > 0) && <CategoryblogSec blogs={blog_posts} sectionHeading={insightsSectionHeading || 'insights'} heading={insightsHeading || 'Related blogs'} buttonInfo={relatedBlogsButton} dataFromCustomAPI={true} />}
            </div>
        </>
    )
}

export default SimpleProductDetailPage